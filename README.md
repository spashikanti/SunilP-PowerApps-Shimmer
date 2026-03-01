# SunilP-PowerApps-Shimmer 

Modern Skeleton Loading States for Canvas and Model-Driven Apps (PowerApps-Shimmer-UI-PCF-Component)

# 🚀 PowerShimmerUltraLight
**The Zero-Dependency, High-Performance Skeleton Loader for Power Apps**

Part of the **SunilP.PowerApps-PCF** suite. This component replaces heavy Creator Kit dependencies with a native, ultra-lightweight CSS animation.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Power Platform](https://img.shields.io/badge/Platform-Power%20Platform-blue)
![PCF](https://img.shields.io/badge/Type-PCF%20Control-orange)

## 🧐 Why this instead of the Microsoft Creator Kit?
While Microsoft provides a Shimmer control within the **Power CAT Creator Kit**, many enterprise environments and independent developers face significant friction using it. This project solves these specific "Real-World" pain points:

| Feature | Microsoft Creator Kit Shimmer | **Ultra-Light Shimmer (This Repo)** |
| :--- | :--- | :--- |
| **Dependencies** | Requires the entire Creator Kit (~20MB+). | **Zero Dependencies.** Single PCF import. |
| **Setup** | Complex Power Fx Table definitions. | **Plug & Play.** Drag, drop, and resize. |
| **Performance** | Heavy Fluent UI wrapper overhead. | **Native CSS.** Ultra-low memory footprint. |
| **Customization** | Locked to Fluent UI design system. | **Full Branding.** Custom hex colors & speeds. |



## 🛠️ Key Technical Features
* **SVG-Powered:** Uses optimized SVGs to prevent pixelation on high-res displays.
* **Variable Pulse Logic:** Easily adjust the `ShimmerSpeed` to match your app's "feel."
* **Shape Variants:**
    * `Rectangular`: For headers, body text, and cards.
    * `Circular`: For profile avatars and action buttons.
* **Dynamic Theming:** Bind the background and highlight colors to your App's global theme variables.

## 🚀 Installation & Usage
1.  **Download:** Grab the latest managed solution `PowerShimmerUltraLight.zip` from the [Releases](../../releases) section.
2.  **Import:** Import the `.zip` file into your Power Platform environment.
3.  **Implement:**
    * Place the Shimmer over your Data Gallery or Form.
    * Set Shimmer `Visible` property to `!varDataLoaded`.
    * Set Gallery/Form `Visible` property to `varDataLoaded`.

## 🤝 Community & Contribution
As a **Power Platform Community Moderator** and **Super User**, I built this to solve a specific performance and deployment bottleneck identified in the community forums. 

If you have ideas for new animation patterns (e.g., "wave" vs "pulse"), feel free to open a Pull Request!

---
**Created by [Sunil Kumar Pashikanti](https://sunilpashikanti.com)** *Principal Architect | Power Platform Super User*
