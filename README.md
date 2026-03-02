# 💎 PowerShimmer Ultra-Light
> **A high-performance, zero-dependency skeleton loader for professional Power Apps.**

![PowerShimmer Demo](./SunilP-PowerApps-Shimmer.gif)

## 🧐 Why this instead of the Microsoft Creator Kit?
While Microsoft provides a Shimmer in the **Power CAT Creator Kit**, it introduces significant friction for many environments:

- **Heavy Dependencies:** Requires importing the entire Creator Kit (~20MB+ solution overhead).
- **Setup Friction:** Requires complex Power Fx Table definitions just to render a simple box.
- **Performance:** Built on heavy wrappers. **PowerShimmer Ultra-Light** uses native CSS GPU-accelerated animations.

---

## 📊 Comparison: Why go Ultra-Light?

| Feature | Microsoft Creator Kit | **PowerShimmer Ultra-Light** |
| :--- | :--- | :--- |
| **Weight** | ~20MB Environment Bloat | **Featherweight (< 50KB)** |
| **Setup** | Complex Table Logic | **Drag, Drop & Resize** |
| **Performance** | Fluent UI Overhead | **Native CSS3 Animations** |
| **Dependencies** | Requires Full Kit | **Stand-alone PCF** |

---

## ✨ Key Features
- **🚀 Ultra-Lightweight:** Native CSS. No bulky JavaScript libraries.
- **🎨 Full Branding:** Custom hex colors for Background and Highlights
- **📐 Shape Variants:** Support for **Rectangle** (Cards/Tables) and **Circle** (Profile Avatars).
- **⚡ No Pixelation:** Optimized rendering for high-resolution displays.

---

## 🚀 Quick Start (Installation & Usage)

### 1. Locate the Solution
- Download the `PowerShimmerSolution.zip` located in the `/SolutionPackage` folder of this repository. 
- *Note: This is an **unmanaged** solution, allowing you to inspect or extend the code directly in your environment.*

### 2. Import to Power Platform
- Go to [make.powerapps.com](https://make.powerapps.com) > **Solutions**.
- Click **Import Solution** and select the `.zip` file.
- **⚠️ Troubleshooting Warnings:** You may see a message regarding "Critical Violations" or "Solution Checker." This is a standard warning for custom code components (PCF). It is safe to click **Next** and proceed with the import.
- Once complete, click **Publish all customizations**.

### 3. Enable in your Canvas App
- In the App Editor, click the **+ (Insert)** icon > **Get more components**.
- Select the **Code** tab, find **PowerShimmerUltraLight**, and click **Import**.
- The component will now appear under the **Code components** section of your Insert pane.



### 4. Implementation Pattern
Place the Shimmer over your Gallery or Table and set:
- **Visible:** `varIsLoading`
- **ShapeType:** `0` (Rectangle) or `1` (Circle)

**The "Super User" Loading Logic:**
```powerapps
// OnSelect of your Navigation or Refresh Button
Set(varIsLoading, true); 
Refresh('YourDataSource'); 
Set(varIsLoading, false);
