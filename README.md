# 🍵 Tealive Knowledge Management & Customer Portal

A dual-access enterprise web prototype built for the **ICT608: Enterprise Knowledge Management Systems** course assignment at **UiTM**. This application acts as a public beverage menu for customers while offering a restricted, role-based **Knowledge Management (KM) Portal** to streamline operational routines, tacit knowledge sharing, and training for Tealive frontline Tearistas, Managers, and HQ Administrators.

---

### 🛡️ Project Badges

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-008f7a?style=for-the-badge)](#)
[![Academic: UiTM](https://img.shields.io/badge/UiTM-Kelantan--Branch-4d1c8c?style=for-the-badge)](#)

---

## 🚀 Key Features

### 1. 🍽️ Public Customer Storefront
* **Interactive Menu Grid:** Clean, responsive grid layout featuring Signature and Tealive Bang Bang series with calorie counts and prices.
* **IP Protection:** Beverage recipe formulations are locked and secured from public access.
* **Social Connections:** Built-in links pointing to team social media channels.

### 2. 🔐 Restricted Staff KM Portal (SECURE Access)
* **Digital SOP & Recipe Repository:** Complete standard operating procedures for all 10 customer beverages, device calibration, and safety policies. Allows HQ Admin to publish new recipes in real-time.
* **Socialization Forum:** Threaded discussion forum to facilitate the socialization of tacit knowledge, experience, and tips among tearistas and supervisors.
* **Mentor Chat Directory:** Real-time expert directory featuring automated, instant replies from specialists to resolve store-level queries.
* **LMS Video Guides:** Visual video routines for POS cashiers, opening protocols, and checklist audits with dynamic progress tracking.
* **Manager Analytics Dashboard:** Peak transactions line-graphs and drink popularity sales metrics, automatically hidden from frontline staff via Role-Based Access Control (RBAC).

---

## 🛠️ Technology Stack

* **Structure:** Semantic HTML5
* **Styling:** Custom Vanilla CSS3 with premium Glassmorphism and responsive design tokens.
* **Interactions & Logic:** Pure ES6+ JavaScript (Separated cleanly into public, login, and dashboard modules).
* **Assets:** Custom official brand logos, UiTM outline symbols, and product banners.

---

## 📁 Project Structure

```bash
portalweb/
├── index.html          # Public Customer Homepage
├── login.html          # Dedicated Staff Login Portal
├── dashboard.html      # Restricted Staff Workspace Dashboard
├── README.md           # Project Documentation & Badges
├── css/
│   └── style.css       # Unified Glassmorphic Style Rules
├── js/
│   ├── public.js       # Customer Menu Rendering & Toggles
│   ├── login.js        # Authorization & Session Handlers
│   └── dashboard.js    # KM System Features & Mock Database
└── images/             # Brand Logos, Expert Profiles & Drink Media
```

---

## ⚙️ How to Run Locally

To preview and interact with the portal, run a simple local web server in the project directory:

### Option A: Python HTTP Server (Recommended)
1. Open terminal in the `portalweb` folder.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to **`http://localhost:8000`**.

### Option B: VS Code Live Server
1. Open the project in VS Code.
2. Click **Go Live** on the bottom status bar.

---

## 🔑 Test Credentials & Access Codes

Use the default passcode **`1234`** to log in as any staff role:

| Profile Name | Assigned Role | Access Level | Scope / Workspace |
| :--- | :--- | :--- | :--- |
| **Ikhmal** | Tearista | Frontline Staff | Machang Outlet #402 |
| **Rogayah** | Outlet Manager | Managerial Tier | Machang Outlet #402 |
| **Amier Zhafran** | Area Manager | Regional Auditor | Kelantan Region (8 Outlets) |
| **Tengku Danial** | HQ Management | Administrator / Director | Global Corporate Hub |

---

## 👥 Contributors (UiTM Assignment Group)

* **Tengku Ahmad Danial Bin Tengku Noor Ashraf** - *HQ Admin / Director*
  * [GitHub](https://github.com/KuDanial) &bull; [LinkedIn](https://www.linkedin.com/in/tengkuahmaddanial/) &bull; [YouTube](https://www.youtube.com/@tengkuahmaddanial)
* **Ikhmal** - *Tearista*
* **Nur Fasihah** - *Senior Tearista*

---
*Developed for academic evaluation under course code ICT608 (Semester March - August 2026).*
