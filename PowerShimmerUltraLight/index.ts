import { IInputs, IOutputs } from "./generated/ManifestTypes";

/** Normalize color to #RRGGBB for use in CSS. Accepts hex with/without # or leaves valid hex unchanged. */
function normalizeColor(value: string | null | undefined, fallback: string): string {
    if (value == null || typeof value !== "string") return fallback;
    const trimmed = value.trim();
    if (trimmed.startsWith("#") && /^#[0-9A-Fa-f]{3,8}$/.test(trimmed)) return trimmed;
    if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return "#" + trimmed;
    if (/^[0-9A-Fa-f]{3}$/.test(trimmed)) return "#" + trimmed.split("").map(c => c + c).join("");
    return fallback;
}

export class PowerShimmerUltraLight implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private shimmerElement: HTMLDivElement;
    private innerElement: HTMLDivElement;
    private resizeObserver: ResizeObserver | null = null;
    private resizeCallback: (() => void) | null = null;

    constructor() {
        // Intentional empty constructor
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;
        this.container.style.position = "relative";
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        //this.container.style.minHeight = "1px";
        this.container.style.boxSizing = "border-box";
        this.container.style.border = "none";
        this.container.style.outline = "none";
        this.container.style.boxShadow = "none";

        // 1. Create the outer container
        this.shimmerElement = document.createElement("div");
        this.shimmerElement.classList.add("shimmer-container");
        this.shimmerElement.style.border = "none";
        this.shimmerElement.style.outline = "none";
        this.shimmerElement.style.boxShadow = "none";

        // 2. Create the inner animating element
        this.innerElement = document.createElement("div");
        this.innerElement.classList.add("shimmer-element");
        
        // Assemble
        this.shimmerElement.appendChild(this.innerElement);
        this.container.appendChild(this.shimmerElement);

        // Initial render
        this.updateView(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const bgRaw = context.parameters.BackgroundColor?.raw;
        const highlightRaw = context.parameters.HighlightColor?.raw;
        const speed = Math.max(0, context.parameters.AnimationSpeed?.raw ?? 1.5);
        const shape = context.parameters.ShapeType?.raw;
        const cornerRadius =  Math.max(0, context.parameters.CornerRadius?.raw ?? 8);

        const validBg = normalizeColor(bgRaw, "#F3F2F1");
        const validHighlight = normalizeColor(highlightRaw, "#E1E1E1");

        const isCircle = String(shape) === "1";

        if (!this.innerElement || !this.shimmerElement) return;

        // Apply gradient (colors) with !important so they always take effect
        const gradient = `linear-gradient(90deg, ${validBg} 25%, ${validHighlight} 50%, ${validBg} 75%)`;
        this.innerElement.style.setProperty("background-image", gradient, "important");
        this.innerElement.style.setProperty("animation-duration", `${speed}s`, "important");

        // Base background so the chosen color is visible even before animation
        this.shimmerElement.style.setProperty("background-color", validBg, "important");

        if (isCircle) {
            this.innerElement.className = "shimmer-element shimmer-circle";
            this.innerElement.style.removeProperty("width");
            this.innerElement.style.removeProperty("height");
            this.innerElement.style.removeProperty("border-radius");
            this.updateCircleSize();
            this.observeResize(() => this.updateCircleSize());
            this.shimmerElement.style.width = "";
            this.shimmerElement.style.height = "";
        } else {
            this.unobserveResize();
            const isRounded = String(shape) === "2";
            this.innerElement.className = isRounded
                ? "shimmer-element shimmer-rectangle shimmer-rectangle-rounded"
                : "shimmer-element shimmer-rectangle";
            this.innerElement.style.removeProperty("min-width");
            this.innerElement.style.removeProperty("min-height");
            this.innerElement.style.setProperty("width", "100%", "important");
            this.innerElement.style.setProperty("height", "100%", "important");

            // Apply configurable corner radius for rounded rectangle, 0 for sharp rectangle
            const radiusForRounded = isRounded ? `${cornerRadius}px` : "0px";
            this.innerElement.style.setProperty("border-radius", radiusForRounded, "important");

            this.updateRectangleSize();
            this.observeResize(() => this.updateRectangleSize());
            // In case container isn't laid out yet (e.g. test harness), re-measure after paint
            requestAnimationFrame(() => this.updateRectangleSize());
        }
    }

    private updateRectangleSize(): void {
        if (!this.container || !this.shimmerElement) return;
        const root = this.container.closest(".control-container") as HTMLElement | null;
        const el = root || this.container;
        const w = el.offsetWidth || el.clientWidth || 100;
        const h = el.offsetHeight || el.clientHeight || 40;
        if (root) {
            this.container.style.width = `${w}px`;
            this.container.style.height = `${h}px`;
        }
        this.shimmerElement.style.setProperty("width", `${w}px`, "important");
        this.shimmerElement.style.setProperty("height", `${h}px`, "important");
    }

    private updateCircleSize(): void {
        if (!this.container || !this.innerElement) return;
        const root = this.container.closest(".control-container") as HTMLElement | null;
        const el = root || this.container;
        const w = el.offsetWidth || el.clientWidth || 100;
        const h = el.offsetHeight || el.clientHeight || 100;
        const size = Math.min(w, h);
        if (root) {
            this.container.style.width = `${w}px`;
            this.container.style.height = `${h}px`;
        }
        this.innerElement.style.setProperty("width", `${size}px`, "important");
        this.innerElement.style.setProperty("height", `${size}px`, "important");
        this.innerElement.style.setProperty("min-width", `${size}px`, "important");
        this.innerElement.style.setProperty("min-height", `${size}px`, "important");
    }

    private observeResize(callback: () => void): void {
        this.unobserveResize();
        this.resizeCallback = callback;
        if (!this.container || typeof ResizeObserver === "undefined") return;
        this.resizeObserver = new ResizeObserver(() => this.resizeCallback?.());
        const root = this.container.closest(".control-container") || this.container;
        this.resizeObserver.observe(root);
    }

    private unobserveResize(): void {
        if (this.resizeObserver && this.container) {
            this.resizeObserver.unobserve(this.container);
            this.resizeObserver = null;
        }
        this.resizeCallback = null;
    }

    public getOutputs(): IOutputs { return {}; }

    public destroy(): void {
        this.unobserveResize();
    }
}