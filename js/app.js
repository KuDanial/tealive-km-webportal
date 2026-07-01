/* ========================================================
   TEALIVE KM PORTAL CORE SCRIPT (ICT608)
   ======================================================== */

// Global State
let currentUser = null;
let activeTab = 'home';
let notifications = [
    { id: 1, title: 'New SOP Published', message: 'HQ published Premium Cocoa Latte Recipe ratio adjustment.', time: 'Just Now', unread: true },
    { id: 2, title: 'System Notification', message: 'POS terminal version 5.12 update required.', time: '2 hours ago', unread: true }
];

// --------------------------------------------------------
// MOCK DATA STORES
// --------------------------------------------------------

const users = {
    "tearista": { 
        name: "Ikhmal", 
        role: "Tearista", 
        roleBadge: "badge-tearista", 
        avatar: "IK", 
        scope: "Machang Outlet #402",
        avatarImg: "" 
    },
    "outlet_manager": { 
        name: "Rogayah", 
        role: "Outlet Manager", 
        roleBadge: "badge-outlet_manager", 
        avatar: "RO", 
        scope: "Machang Outlet #402",
        avatarImg: "images/rogayahprofile.png" 
    },
    "area_manager": { 
        name: "Amier Zhafran", 
        role: "Area Manager", 
        roleBadge: "badge-area_manager", 
        avatar: "AZ", 
        scope: "Kelantan Region (8 Outlets)",
        avatarImg: "images/amierprofile.png" 
    },
    "hq_management": { 
        name: "Tengku Danial", 
        role: "HQ Management", 
        roleBadge: "badge-hq_management", 
        avatar: "TD", 
        scope: "Global Corporate Hub",
        avatarImg: "images/tengkuprofile.png" 
    }
};

const initialSops = [
    {
        id: "sop-1",
        title: "Premium Cocoa Latte Recipe",
        category: "beverage_recipes",
        author: "HQ Beverage Team",
        date: "2026-06-20",
        content: `
            <h4>1. Ingredient Ratios</h4>
            <ul>
                <li><strong>Cocoa Powder (Premium Grade):</strong> 15g (accurately weighed)</li>
                <li><strong>Hot Purified Water:</strong> 40ml (for paste creation)</li>
                <li><strong>Chilled Fresh Milk:</strong> 150ml (chilled at 4°C)</li>
                <li><strong>Golden Fructose Syrup:</strong> 15ml (Standard Sweetness) / 10ml (Less Sweetness)</li>
                <li><strong>Ice Cubes:</strong> 120g (Standard Cold)</li>
            </ul>
            <h4>2. Preparation Sequence</h4>
            <ol>
                <li>In a mixing shaker glass, combine cocoa powder and hot purified water. Whisk vigorously using the mini electric frother for 10 seconds until a smooth chocolate paste forms.</li>
                <li>Incorporate the fructose syrup into the warm cocoa paste and stir well.</li>
                <li>Measure out 150ml of chilled fresh milk. For warm beverages, steam to 65°C. For iced beverages, pour milk directly into the serving cup over 120g of ice cubes.</li>
                <li>Slowly pour the mixed cocoa paste over the iced milk to create the signature Tealive layered aesthetic.</li>
                <li>Serve immediately with a wide straw.</li>
            </ol>
            <h4>3. Critical Controls</h4>
            <p>Ensure the cocoa paste contains no clumps. Clumping leads to inconsistent taste distribution and negative customer reviews. Clean the whisk after each cycle.</p>
        `
    },
    {
        id: "sop-2",
        title: "Signature Brown Sugar Pearl Milk Tea Standard",
        category: "beverage_recipes",
        author: "HQ Quality Control",
        date: "2026-05-15",
        content: `
            <h4>1. Raw Ingredients</h4>
            <ul>
                <li><strong>Tealive Signature Black Tea Base:</strong> 120ml</li>
                <li><strong>Non-Dairy Creamer Powder:</strong> 2 scoops (20g)</li>
                <li><strong>Brown Sugar Syrup (Loob Special):</strong> 20ml</li>
                <li><strong>Fresh Warm Tapioca Pearls:</strong> 1 scoop (45g)</li>
            </ul>
            <h4>2. Preparation Steps</h4>
            <ol>
                <li>Warm black tea base should be brewed fresh every 4 hours. Keep at 60°C in the insulated dispenser.</li>
                <li>Pour 120ml of black tea base into shaker, add 2 scoops of non-dairy creamer powder, and shake vigorously for 8 seconds until dissolved.</li>
                <li>Coat the inside of the serving cup with 20ml of Brown Sugar Syrup, rotating the cup to form a marble pattern on the inner walls.</li>
                <li>Place 1 scoop of warm tapioca pearls at the bottom of the cup.</li>
                <li>Add ice to shaker, shake milk tea base briefly, and strain into the prepared cup.</li>
            </ol>
            <h4>3. Quality Parameters</h4>
            <p>Tapioca pearls must not be kept for more than 4 hours. Discard any pearls that have become mushy or hard. The marble pattern of brown sugar syrup is key to our brand representation.</p>
        `
    },
    {
        id: "sop-3",
        title: "POS Terminal Opening & Cash Reconciliation",
        category: "pos_workflows",
        author: "Finance & Retail IT",
        date: "2026-06-01",
        content: `
            <h4>1. Morning Opening Protocol</h4>
            <p>Ensure POS Terminal is turned on at least 15 minutes before opening. Verify network connection status on the top-right corner of the dashboard screen.</p>
            <ul>
                <li>Open the cash drawer and count the opening float. The float must equal exactly <strong>RM 200.00</strong>.</li>
                <li>Report any discrepancies to the Outlet Manager immediately before processing customers.</li>
                <li>Log in to the system using your Tier 5 personal matric number credential.</li>
            </ul>
            <h4>2. Mid-Day Cash Drop</h4>
            <p>To ensure security at storefront, perform a cash drop whenever cash drawer exceeds RM 1,000.00. Lock excess cash in the store drop-safe.</p>
            <h4>3. Closing Reconciliation</h4>
            <ol>
                <li>At closing, trigger the "End of Day (EOD)" report on the POS system.</li>
                <li>Perform physical cash count and reconcile with EOD system totals.</li>
                <li>Print the Z-Report, sign it, and place it inside the cash deposit envelope along with reconciled cash.</li>
            </ol>
        `
    },
    {
        id: "sop-4",
        title: "Tearista Hygiene & Food Safety Code",
        category: "hr_policies",
        author: "Audit & Safety Dept",
        date: "2026-04-10",
        content: `
            <h4>1. Hand Washing Requirements</h4>
            <p>Tearistas must wash hands using antibacterial soap for a minimum of 20 seconds at the dedicated hand-wash sink under the following conditions:</p>
            <ul>
                <li>Immediately before starting a work shift.</li>
                <li>Before preparing food or drinks.</li>
                <li>After using the restroom, cleaning tables, or handling garbage.</li>
                <li>After sneezing, coughing, or touching hair/face.</li>
            </ul>
            <h4>2. Personal Attire & Grooming</h4>
            <ul>
                <li>Always wear clean Tealive uniform, including apron, name tag, and cap.</li>
                <li>Hair longer than shoulder-length must be tied back securely.</li>
                <li>Fingernails must be short, clean, and free of nail polish. Jewelry is restricted to plain wedding bands.</li>
            </ul>
        `
    }
];

let sops = [...initialSops];

const initialThreads = [
    {
        id: "thread-1",
        category: "recipes",
        title: "How to maintain foam thickness for Cocoa Latte?",
        authorName: "Ikhmal",
        authorAvatar: "IK",
        authorRole: "Tearista",
        date: "Today, 10:15 AM",
        content: "Does anyone have tips for frothing the coco latte milk consistently in high volumes? Sometimes it gets flat too quickly, leading to poor visual layering.",
        replies: [
            {
                authorName: "Rogayah",
                authorAvatar: "RO",
                authorRole: "Outlet Manager",
                date: "Today, 10:30 AM",
                content: "Keep the fresh milk chilled at exactly 4°C before steaming. When frothing, ensure the steam wand tip is placed just below the surface for 3-5 seconds to incorporate air, then lower it. Steaming should stop at exactly 65°C. Lower temperatures yield flat foam, while higher temperatures scald the milk proteins, destroying foam stability."
            },
            {
                authorName: "Ikhmal",
                authorAvatar: "IK",
                authorRole: "Tearista",
                date: "Today, 11:02 AM",
                content: "Thank you, Rogayah! Tried this during the lunch rush today and the layering held up beautifully! This tip should definitely be added to our local store wiki."
            }
        ]
    },
    {
        id: "thread-2",
        category: "pos",
        title: "POS system freezing during custom discount entries",
        authorName: "Amier Zhafran",
        authorAvatar: "AZ",
        authorRole: "Area Manager",
        date: "Yesterday, 4:45 PM",
        content: "We noticed some terminals in Kelantan branches freeze when combining the 'Staff Discount' voucher with custom promotions. Is anyone else facing this?",
        replies: [
            {
                authorName: "Tengku Danial",
                authorAvatar: "TD",
                authorRole: "HQ Management",
                date: "Yesterday, 5:12 PM",
                content: "This is a known bug in POS app v5.11. The v5.12 patch released today fixes this discount stacking loops error. Please instruct all your outlets to apply the update immediately before opening tomorrow."
            }
        ]
    }
];

let threads = [...initialThreads];

const experts = [
    { name: "Tengku Danial", avatar: "TD", avatarImg: "images/tengkuprofile.png", role: "HQ Admin / Director", tag: "Enterprise Strategy", skill: "F&B Branding, Business Expansion, Strategy", online: true, replyPrompt: "Thanks for reaching out! Maintaining operational standards across 1,000+ branches is our main priority. Have you checked the latest SOP mappings?" },
    { name: "Nur Fasihah", avatar: "NF", avatarImg: "images/fasihahprofile.png", role: "Senior Tearista", tag: "Beverage Trainer", skill: "Latte Art, Steaming, Recipe Customization", online: true, replyPrompt: "Hi there! Remember, the key to a perfect drink is the water calibration and milk temp (65°C). Let me know if you need help with frothing techniques!" },
    { name: "Amier Zhafran", avatar: "AZ", avatarImg: "images/amierprofile.png", role: "Area Manager", tag: "Tech Support Mentor", skill: "POS Workflows, Data Auditing, Tech Support", online: true, replyPrompt: "Hello! If you are encountering POS errors, please check the system connection status. Also ensure cash drops are recorded hourly." },
    { name: "Rogayah", avatar: "RO", avatarImg: "images/rogayahprofile.png", role: "Outlet Manager", tag: "Operations Expert", skill: "Workplace Safety, SOP Compliance, Steaming", online: true, replyPrompt: "Hi. For hygiene audits or safety compliance templates, check the HR & Safety Policies category in the SOP page." },
    { name: "Bryan Loo", avatar: "BL", avatarImg: "images/bryanprofile.png", role: "Founder & CEO", tag: "Enterprise Strategy", skill: "F&B Branding, Business Expansion, Strategy", online: true, replyPrompt: "Thanks for reaching out! Maintaining operational standards across 1,000+ branches is our main priority. Have you checked the latest SOP mappings?" }
];

let activeChatExpert = null;

const courses = [
    {
        id: "course-1",
        title: "POS Terminal Basics",
        category: "POS & Workflows",
        completedPercent: 100,
        videoDuration: "04:32",
        items: [
            { id: "c1-i1", text: "Understand Home Screen & Categories", checked: true },
            { id: "c1-i2", text: "Process Member Card Loyalty Scan", checked: true },
            { id: "c1-i3", text: "Handle Void/Cancellation Requests", checked: true },
            { id: "c1-i4", text: "Process Cash & QR Card Payments", checked: true }
        ]
    },
    {
        id: "course-2",
        title: "Opening & Closing SOPs",
        category: "General Operations",
        completedPercent: 25,
        videoDuration: "06:15",
        items: [
            { id: "c2-i1", text: "Equipment Sterilization Protocols", checked: true },
            { id: "c2-i2", text: "Base Tea Brewing Calibration", checked: false },
            { id: "c2-i3", text: "Check Ingredient Inventory Stock", checked: false },
            { id: "c2-i4", text: "Night Reconcile Drawer Cash", checked: false }
        ]
    },
    {
        id: "course-3",
        title: "Tearista Customer Excellence",
        category: "Service Quality",
        completedPercent: 50,
        videoDuration: "03:50",
        items: [
            { id: "c3-i1", text: "Greet Customers with Tealive Smile", checked: true },
            { id: "c3-i2", text: "Confirm custom Ice/Sugar percentages", checked: true },
            { id: "c3-i3", text: "Read back order details before confirmation", checked: false },
            { id: "c3-i4", text: "Handle Customer Complaints gracefully", checked: false }
        ]
    }
];

let activeCourse = null;
let videoTimer = null;
let videoProgress = 0; // seconds

// Customer Public Menu Data
const customerMenu = [
    { id: "cm-1", name: "Signature Brown Sugar Pearl Milk Tea", category: "signature", image: "images/signaturebrownsugarpearlmilktea.jpg", desc: "Our signature milk tea sweetened with rich brown sugar and topped with freshly prepared warm tapioca pearls.", price: "RM 10.50", cals: "280 kcal" },
    { id: "cm-2", name: "Signature Original Roasted Milk Tea", category: "signature", image: "images/signatureoriginalroastedmilktea.jpg", desc: "A robust and aromatic roasted milk tea brewed to perfection. Rich and smooth.", price: "RM 9.50", cals: "240 kcal" },
    { id: "cm-3", name: "Roasted Milk Tea Grass Jelly", category: "signature", image: "images/roastedmilkteagrassjelly.jpg", desc: "Roasted milk tea served with cooling grass jelly cubes. A perfect refreshing treat.", price: "RM 10.50", cals: "220 kcal" },
    { id: "cm-4", name: "Original Pearl Milk Tea", category: "signature", image: "images/originalpearlmilktea.jpg", desc: "The classic milk tea that started it all, filled with signature chewy tapioca pearls.", price: "RM 9.50", cals: "260 kcal" },
    { id: "cm-5", name: "Bang Bang Fresh Milk", category: "bangbang", image: "images/bangbangmilkdrinks.jpg", desc: "Creamy fresh milk combined with rich brown sugar syrup and warm pearls.", price: "RM 11.50", cals: "310 kcal" },
    { id: "cm-6", name: "Bang Bang Black Tea", category: "bangbang", image: "images/bangbangmilkteadrinks.jpg", desc: "Fragrant black tea layered with signature brown sugar and tapioca pearls.", price: "RM 10.50", cals: "270 kcal" },
    { id: "cm-7", name: "Bang Bang Chocolate", category: "bangbang", image: "images/bangbangchocolatedrinks.jpg", desc: "Indulgent premium chocolate paste swirled with fresh milk and brown sugar pearls.", price: "RM 11.50", cals: "340 kcal" },
    { id: "cm-8", name: "Bang Bang Coffee", category: "bangbang", image: "images/bangbangcoffeedrinks.jpg", desc: "A bold espresso shot paired with fresh milk, brown sugar, and warm tapioca pearls.", price: "RM 11.50", cals: "290 kcal" },
    { id: "cm-9", name: "Bang Bang Matcha Mousse", category: "bangbang", image: "images/bangbangmatchamoussedrinks.jpg", desc: "Earthy Japanese matcha topped with creamy cheese mousse, brown sugar, and pearls.", price: "RM 12.50", cals: "320 kcal" },
    { id: "cm-10", name: "Bang Bang Hojicha Mousse", category: "bangbang", image: "images/bangbanghojichamoussedrinks.jpg", desc: "Aromatic roasted hojicha layer capped with cheese mousse, brown sugar, and pearls.", price: "RM 12.50", cals: "300 kcal" }
];

// --------------------------------------------------------
// CORE WORKSPACE INITIALIZATION
// --------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Clock
    updateClock();
    setInterval(updateClock, 1000);

    // Theme Toggle Initialization
    initThemeToggle();

    // Customer Menu Navigation & Render
    renderPublicMenu("signature");
    initCustomerPageActions();

    // Event Listeners: Login
    document.getElementById("login-form").addEventListener("submit", handleLogin);

    // Event Listeners: Logout
    document.getElementById("logout-button").addEventListener("click", handleLogout);
    document.querySelector(".logout-btn-trigger").addEventListener("click", handleLogout);

    // Tab Navigation Buttons
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            switchTab(targetTab);
        });
    });

    // Home view Quick Action Links
    document.addEventListener("click", (e) => {
        const quickLink = e.target.closest(".quick-tab-link");
        if (quickLink) {
            const linkTab = quickLink.getAttribute("data-link-tab");
            switchTab(linkTab);
        }
    });

    // Notifications Dropdown
    document.getElementById("notification-bell-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("notification-dropdown").classList.toggle("hidden");
    });
    
    document.getElementById("mark-all-read").addEventListener("click", () => {
        notifications = [];
        updateNotificationsUI();
        showToast("Success", "All notifications cleared.", "success");
    });

    document.addEventListener("click", () => {
        document.getElementById("notification-dropdown").classList.add("hidden");
    });

    document.getElementById("notification-dropdown").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Global Search
    document.getElementById("global-search").addEventListener("input", handleGlobalSearch);

    // Category Tabs: SOPs
    const sopCategoryBtns = document.querySelectorAll(".category-btn");
    sopCategoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sopCategoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSopList(btn.getAttribute("data-category"));
        });
    });

    document.getElementById("sop-search-input").addEventListener("input", (e) => {
        const activeCategory = document.querySelector(".category-btn.active").getAttribute("data-category");
        renderSopList(activeCategory, e.target.value);
    });

    // Modals Handlers: SOP
    document.getElementById("add-sop-btn").addEventListener("click", () => openModal("add-sop-modal"));
    document.getElementById("close-sop-modal").addEventListener("click", () => closeModal("add-sop-modal"));
    document.getElementById("cancel-sop-modal").addEventListener("click", () => closeModal("add-sop-modal"));
    document.getElementById("add-sop-form").addEventListener("submit", handleAddSop);

    // Modals Handlers: Forum
    document.getElementById("new-thread-btn").addEventListener("click", () => openModal("add-thread-modal"));
    document.getElementById("close-thread-modal").addEventListener("click", () => closeModal("add-thread-modal"));
    document.getElementById("cancel-thread-modal").addEventListener("click", () => closeModal("add-thread-modal"));
    document.getElementById("add-thread-form").addEventListener("submit", handleCreateThread);

    // Forum category buttons
    const forumCatBtns = document.querySelectorAll(".forum-cat-btn");
    forumCatBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            forumCatBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderThreadList(btn.getAttribute("data-forum-cat"));
        });
    });

    // Reply Box Form
    document.getElementById("reply-form").addEventListener("submit", handleAddReply);

    // Expert Search
    document.getElementById("expert-search").addEventListener("input", (e) => {
        renderExperts(e.target.value);
    });

    // Chat Box Form
    document.getElementById("chat-form").addEventListener("submit", handleSendChatMessage);
    document.getElementById("chat-close-btn").addEventListener("click", closeChatPanel);

    // Video Player controls
    document.getElementById("video-placeholder-overlay").addEventListener("click", startVideoSimulation);
    document.getElementById("video-pause-btn").addEventListener("click", pauseVideoSimulation);

    // Initial render
    renderNotifications();
}

function updateClock() {
    const timeEl = document.getElementById("system-time");
    if (timeEl) {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

// --------------------------------------------------------
// CUSTOMER HOME MENU LOGIC & RENDER
// --------------------------------------------------------

function initCustomerPageActions() {
    const tabBtns = document.querySelectorAll(".menu-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderPublicMenu(btn.getAttribute("data-menu-category"));
        });
    });

    // Transition Button Click: Go to Staff Login Screen
    document.getElementById("go-to-login-btn").addEventListener("click", () => {
        document.getElementById("customer-screen").classList.add("hidden");
        document.getElementById("login-screen").classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    // Back button in Login Screen
    document.getElementById("back-to-public-btn").addEventListener("click", () => {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("customer-screen").classList.remove("hidden");
        window.scrollTo(0, 0);
    });
}

function renderPublicMenu(category = "signature") {
    const container = document.getElementById("public-menu-container");
    container.innerHTML = "";

    const filtered = customerMenu.filter(item => item.category === category);

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="drink-card card glass">
                <div class="drink-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="drink-card-img" onerror="this.src='images/originalpearlmilktea.jpg'">
                    <div class="recipe-locked-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span>Recipe Protected</span>
                    </div>
                </div>
                <div class="drink-info">
                    <h3>${item.name}</h3>
                    <p class="drink-desc">${item.desc}</p>
                    <div class="drink-footer-meta">
                        <span class="drink-price">${item.price}</span>
                        <span class="drink-calories">${item.cals}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// --------------------------------------------------------
// LIGHT / DARK MODE TOGGLE LOGIC
// --------------------------------------------------------

function initThemeToggle() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    const publicThemeBtn = document.getElementById("public-theme-toggle");
    
    const themeIconSun = document.getElementById("theme-icon-sun");
    const themeIconMoon = document.getElementById("theme-icon-moon");
    const publicSunIcon = publicThemeBtn.querySelector(".theme-icon-sun");
    const publicMoonIcon = publicThemeBtn.querySelector(".theme-icon-moon");

    const loginLogo = document.getElementById("login-logo");
    const loginUitmLogo = document.getElementById("login-uitm-logo");
    const sidebarLogo = document.getElementById("sidebar-logo");
    
    const publicLogo = document.getElementById("public-logo");
    const publicUitmLogo = document.getElementById("public-uitm-logo");
    const aboutLogo = document.getElementById("about-logo");
    const aboutUitmLogo = document.getElementById("about-uitm-logo");

    // Default to Light Mode ("White Mode")
    let activeTheme = localStorage.getItem("theme") || "light";

    function updateThemeUI(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeIconSun.classList.remove("hidden");
            themeIconMoon.classList.add("hidden");
            publicSunIcon.classList.remove("hidden");
            publicMoonIcon.classList.add("hidden");
            
            // Apply Dark-compatible Logos
            const darkTealive = "images/logo-tealive-whitetransparent.png";
            const darkUitm = "images/LOGO_UiTM_OUTLINE_3(WHITE).png";
            
            loginLogo.src = darkTealive;
            loginUitmLogo.src = darkUitm;
            sidebarLogo.src = darkTealive;
            
            publicLogo.src = darkTealive;
            publicUitmLogo.src = darkUitm;
            aboutLogo.src = darkTealive;
            aboutUitmLogo.src = darkUitm;
        } else {
            document.body.classList.remove("dark-mode");
            themeIconSun.classList.add("hidden");
            themeIconMoon.classList.remove("hidden");
            publicSunIcon.classList.add("hidden");
            publicMoonIcon.classList.remove("hidden");
            
            // Apply Light-compatible Logos
            const lightTealive = "images/logo-tealive.png";
            const lightUitm = "images/logo-UiTM.png";
            
            loginLogo.src = lightTealive;
            loginUitmLogo.src = lightUitm;
            sidebarLogo.src = lightTealive;
            
            publicLogo.src = lightTealive;
            publicUitmLogo.src = lightUitm;
            aboutLogo.src = lightTealive;
            aboutUitmLogo.src = lightUitm;
        }
    }

    updateThemeUI(activeTheme);

    const toggleFunction = () => {
        activeTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem("theme", activeTheme);
        updateThemeUI(activeTheme);
        showToast("Theme Switched", `Switched to ${activeTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`, "info");
    };

    themeBtn.addEventListener("click", toggleFunction);
    publicThemeBtn.addEventListener("click", toggleFunction);
}

// --------------------------------------------------------
// USER SIGN-IN / SIGN-OUT FLOW
// --------------------------------------------------------

function handleLogin(e) {
    e.preventDefault();
    const roleSelect = document.getElementById("role-select");
    const selectedRole = roleSelect.value;
    const passcode = document.getElementById("passcode-input").value;

    if (!selectedRole) {
        alert("Please select a profile role.");
        return;
    }

    if (passcode !== "1234") {
        alert("Incorrect access code. Try '1234'.");
        return;
    }

    currentUser = users[selectedRole];
    
    // Apply user details to UI
    document.getElementById("sidebar-user-name").textContent = currentUser.name;
    
    const avatarEl = document.getElementById("sidebar-user-avatar");
    if (currentUser.avatarImg) {
        avatarEl.innerHTML = `<img src="${currentUser.avatarImg}" class="user-avatar-img" alt="${currentUser.name}">`;
    } else {
        avatarEl.innerHTML = currentUser.avatar;
    }
    
    const roleBadge = document.getElementById("sidebar-user-role");
    roleBadge.textContent = currentUser.role;
    roleBadge.className = `user-role-badge ${currentUser.roleBadge}`;

    document.getElementById("welcome-title").textContent = `Welcome back, ${currentUser.name.split(' ')[0]}!`;
    document.getElementById("workspace-scope-text").textContent = currentUser.scope;

    // Apply RBAC (Role-Based Access Control)
    applyRBACRules();

    // Show App
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");

    // Clear login fields
    document.getElementById("passcode-input").value = "";

    // Show Toast
    showToast(`Session Started`, `Logged in as ${currentUser.name} (${currentUser.role})`, "success");

    // Load initial views
    renderDashboardStats();
    renderSopList("all");
    renderThreadList("all");
    renderExperts();
    renderCourseList();
}

function handleLogout() {
    currentUser = null;
    document.getElementById("app-container").classList.add("hidden");
    document.getElementById("customer-screen").classList.remove("hidden"); // Returns to Customer Homepage!
    
    // Clear simulation states
    pauseVideoSimulation();
    closeChatPanel();
}

function applyRBACRules() {
    const lockBadge = document.getElementById("lock-badge-icon");
    const addSopBtn = document.getElementById("add-sop-btn");
    const analyticsLock = document.getElementById("analytics-lock-overlay");
    const analyticsContent = document.getElementById("analytics-dashboard-content-area");

    // Reset view
    lockBadge.classList.add("hidden");
    addSopBtn.classList.add("hidden");
    analyticsLock.classList.add("hidden");
    analyticsContent.style.filter = "none";

    if (currentUser.role === "Tearista") {
        lockBadge.classList.remove("hidden");
        analyticsLock.classList.remove("hidden");
        analyticsContent.style.filter = "blur(4px)";
    } else {
        if (currentUser.role === "HQ Management") {
            addSopBtn.classList.remove("hidden"); // Admin can add SOPs
        }
    }
}

// --------------------------------------------------------
// TAB NAV FLOW
// --------------------------------------------------------

function switchTab(tabName) {
    // Hide active tab
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.add("hidden"));

    // Show target tab
    const targetEl = document.getElementById(`tab-${tabName}`);
    if (targetEl) {
        targetEl.classList.remove("hidden");
        activeTab = tabName;
    }

    // Toggle active nav styling
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-tab") === tabName) {
            btn.classList.add("active");
        }
    });

    // Special Tab Initialization
    if (tabName === "analytics" && currentUser.role !== "Tearista") {
        // Redraw SVGs to make sure dimensions render correctly
        setTimeout(renderAnalyticsGraphs, 100);
    }
}

// --------------------------------------------------------
// SEARCH SYSTEM
// --------------------------------------------------------

function handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;

    if (query.includes("sop") || query.includes("recipe") || query.includes("brew")) {
        switchTab("sop");
        document.getElementById("sop-search-input").value = query;
        renderSopList("all", query);
    } else if (query.includes("video") || query.includes("pos") || query.includes("learn")) {
        switchTab("lms");
    } else if (query.includes("expert") || query.includes("mentor") || query.includes("danial") || query.includes("farah") || query.includes("fasihah")) {
        switchTab("directory");
        document.getElementById("expert-search").value = query;
        renderExperts(query);
    }
}

// --------------------------------------------------------
// TOAST NOTIFICATIONS / ANNOUNCEMENTS
// --------------------------------------------------------

function showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast glass ${type}`;

    let iconSvg = '';
    if (type === "success") {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
        <div class="toast-icon">${iconSvg}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
        toast.classList.add("removing");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 4000);

    // Append to list of notifications
    const newNoti = {
        id: Date.now(),
        title: title,
        message: message,
        time: 'Just Now',
        unread: true
    };
    notifications.unshift(newNoti);
    updateNotificationsUI();
}

function renderNotifications() {
    updateNotificationsUI();
}

function updateNotificationsUI() {
    const badge = document.getElementById("bell-badge-count");
    const list = document.getElementById("noti-list");
    
    // Badge Count
    const unreadCount = notifications.filter(n => n.unread).length;
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }

    // List rendering
    if (notifications.length === 0) {
        list.innerHTML = `<div class="p-sm text-center color-muted font-xs">No notifications.</div>`;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="noti-item ${n.unread ? 'unread' : ''}">
            <strong>${n.title}</strong>
            <p class="color-muted font-xs">${n.message}</p>
            <span class="noti-item-time">${n.time}</span>
        </div>
    `).join('');
}

// --------------------------------------------------------
// MODALS LOGIC
// --------------------------------------------------------

function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

// --------------------------------------------------------
// DASHBOARD HOME SCREEN LOGIC
// --------------------------------------------------------

function renderDashboardStats() {
    // Render SOP counts
    document.getElementById("stat-sops").textContent = sops.length;
    
    // Render Hot Threads
    const homeForumHighlights = document.getElementById("home-forum-highlights");
    homeForumHighlights.innerHTML = threads.slice(0, 3).map(t => `
        <li onclick="goToThread('${t.id}')">
            <span class="title">${t.title}</span>
            <div class="meta">
                <span>By ${t.authorName}</span>
                <span>${t.replies.length} replies</span>
            </div>
        </li>
    `).join('');

    // LMS progress calculations
    calculateOverallProgress();
}

function goToThread(threadId) {
    switchTab("forum");
    const forumCatBtns = document.querySelectorAll(".forum-cat-btn");
    forumCatBtns.forEach(btn => btn.classList.remove("active"));
    document.querySelector('.forum-cat-btn[data-forum-cat="all"]').classList.add("active");
    renderThreadList("all");
    selectThread(threadId);
}

// --------------------------------------------------------
// DIGITAL SOP CORE LOGIC (CRUD Simulation)
// --------------------------------------------------------

function renderSopList(category = "all", filterText = "") {
    const listContainer = document.getElementById("sop-list-container");
    listContainer.innerHTML = "";

    const filtered = sops.filter(sop => {
        const matchesCategory = category === "all" || sop.category === category;
        const matchesSearch = filterText === "" || 
            sop.title.toLowerCase().includes(filterText.toLowerCase()) || 
            sop.content.toLowerCase().includes(filterText.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `<div class="p-sm text-center color-muted font-xs">No SOP documents found.</div>`;
        return;
    }

    filtered.forEach(sop => {
        const item = document.createElement("div");
        item.className = "sop-item";
        item.innerHTML = `
            <div class="sop-item-title">${sop.title}</div>
            <div class="sop-item-meta">
                <span>${formatCategoryName(sop.category)}</span>
                <span>${sop.date}</span>
            </div>
        `;
        item.addEventListener("click", () => {
            document.querySelectorAll(".sop-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            displaySopDetail(sop);
        });
        listContainer.appendChild(item);
    });
}

function displaySopDetail(sop) {
    document.getElementById("sop-viewer-empty-msg").classList.add("hidden");
    const container = document.getElementById("sop-viewer-content");
    container.classList.remove("hidden");

    document.getElementById("view-sop-category").textContent = formatCategoryName(sop.category);
    document.getElementById("view-sop-title").textContent = sop.title;
    document.getElementById("view-sop-author").textContent = sop.author;
    document.getElementById("view-sop-date").textContent = sop.date;
    document.getElementById("view-sop-body").innerHTML = sop.content;
}

function handleAddSop(e) {
    e.preventDefault();
    const title = document.getElementById("sop-title-input").value;
    const category = document.getElementById("sop-category-select").value;
    const content = document.getElementById("sop-content-input").value;

    const newSop = {
        id: `sop-${Date.now()}`,
        title: title,
        category: category,
        author: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        content: content.replace(/\n/g, '<br>')
    };

    sops.unshift(newSop);
    
    // Reset form and close modal
    document.getElementById("add-sop-form").reset();
    closeModal("add-sop-modal");

    // Re-render
    const activeCategory = document.querySelector(".category-btn.active").getAttribute("data-category");
    renderSopList(activeCategory);
    renderDashboardStats();

    // Notify user
    showToast("SOP Published", `"${title}" has been added to the Digital SOP database.`, "success");
}

function formatCategoryName(cat) {
    const mapping = {
        "beverage_recipes": "Beverage Recipe",
        "drink_preparation": "Drink Preparation",
        "pos_workflows": "POS & Workflow",
        "hr_policies": "HR & Safety Policy"
    };
    return mapping[cat] || cat;
}

// --------------------------------------------------------
// MANAGER ANALYTICS DASHBOARD
// --------------------------------------------------------

function renderAnalyticsGraphs() {
    if (currentUser.role === "Tearista") return;

    // Set header scope label
    const scopeLabel = document.getElementById("analytics-scope");
    const scopeText = currentUser.role === "HQ Management" ? "Global Network performance (1,000+ Outlets)" : 
                      currentUser.role === "Area Manager" ? "Kelantan Region Scope (8 Outlets)" : "Machang Outlet #402 Scope";
    scopeLabel.textContent = scopeText;

    // Load Metrics depending on Role
    let sales = "RM 4,892.50";
    let outlets = "1 Active";
    let sat = "96.8%";
    let activeTearistas = 3;

    if (currentUser.role === "Area Manager") {
        sales = "RM 38,104.00";
        outlets = "8 Active Outlets";
        sat = "94.2%";
        activeTearistas = 24;
    } else if (currentUser.role === "HQ Management") {
        sales = "RM 4.86M (Global)";
        outlets = "1,048 Active Outlets";
        sat = "95.5%";
        activeTearistas = 4120;
    }

    document.getElementById("metric-sales").textContent = sales;
    document.getElementById("metric-outlets").textContent = outlets;
    document.getElementById("metric-satisfaction").textContent = sat;

    // Generate Hourly Transaction Peak Line Graph (SVG)
    const lineContainer = document.getElementById("peak-hours-graph-container");
    lineContainer.innerHTML = `
        <svg class="svg-chart" viewBox="0 0 500 240">
            <!-- Grids -->
            <line x1="50" y1="20" x2="480" y2="20" class="grid-line" />
            <line x1="50" y1="70" x2="480" y2="70" class="grid-line" />
            <line x1="50" y1="120" x2="480" y2="120" class="grid-line" />
            <line x1="50" y1="170" x2="480" y2="170" class="grid-line" />
            <line x1="50" y1="210" x2="480" y2="210" stroke="rgba(0, 0, 0, 0.1)" stroke-width="1.5" />

            <!-- Definitions for Gradients -->
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#7209b7" />
                    <stop offset="100%" stop-color="#4cc9f0" />
                </linearGradient>
            </defs>

            <!-- Line Path -->
            <path d="M 50 170 Q 120 180 160 70 T 260 90 T 360 40 T 480 180" class="chart-line" />

            <!-- Data Dots -->
            <circle cx="50" cy="170" r="4" class="chart-dot" title="8:00 AM" />
            <circle cx="160" cy="70" r="4" class="chart-dot" title="12:00 PM (Peak)" />
            <circle cx="260" cy="90" r="4" class="chart-dot" title="3:00 PM" />
            <circle cx="360" cy="40" r="4" class="chart-dot" title="6:00 PM (Peak)" />
            <circle cx="480" cy="180" r="4" class="chart-dot" title="10:00 PM" />

            <!-- Labels -->
            <text x="50" y="230" fill="#5e5a75" font-size="10" text-anchor="middle">08:00</text>
            <text x="160" y="230" fill="#5e5a75" font-size="10" text-anchor="middle">12:00 (Lunch)</text>
            <text x="260" y="230" fill="#5e5a75" font-size="10" text-anchor="middle">15:00</text>
            <text x="360" y="230" fill="#5e5a75" font-size="10" text-anchor="middle">18:00 (Dinner)</text>
            <text x="480" y="230" fill="#5e5a75" font-size="10" text-anchor="middle">22:00</text>

            <text x="40" y="174" fill="#5e5a75" font-size="9" text-anchor="end">20 Orders</text>
            <text x="40" y="74" fill="#5e5a75" font-size="9" text-anchor="end">80 Orders</text>
        </svg>
    `;

    // Generate Trending Drinks Bar Graph (SVG)
    const barContainer = document.getElementById("trending-drinks-graph-container");
    barContainer.innerHTML = `
        <svg class="svg-chart" viewBox="0 0 500 240">
            <defs>
                <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="#008f7a" />
                    <stop offset="100%" stop-color="#00b4d8" />
                </linearGradient>
            </defs>

            <!-- Base Line -->
            <line x1="40" y1="210" x2="480" y2="210" stroke="rgba(0, 0, 0, 0.1)" stroke-width="1.5" />

            <!-- Bars -->
            <!-- 1. Cocoa Latte (120 cups) -->
            <rect x="70" y="50" width="36" height="160" rx="4" class="chart-bar" />
            <text x="88" y="225" fill="#5e5a75" font-size="9" text-anchor="middle">Cocoa Latte</text>
            <text x="88" y="42" fill="#008f7a" font-size="9" font-weight="700" text-anchor="middle">120</text>

            <!-- 2. Signature Pearl Milk Tea (152 cups) -->
            <rect x="170" y="10" width="36" height="200" rx="4" class="chart-bar" />
            <text x="188" y="225" fill="#5e5a75" font-size="9" text-anchor="middle">Signature Tea</text>
            <text x="188" y="5" fill="#008f7a" font-size="9" font-weight="700" text-anchor="middle">152</text>

            <!-- 3. Mango Smoothie (84 cups) -->
            <rect x="270" y="90" width="36" height="120" rx="4" class="chart-bar" />
            <text x="288" y="225" fill="#5e5a75" font-size="9" text-anchor="middle">Mango Smoothie</text>
            <text x="288" y="82" fill="#008f7a" font-size="9" font-weight="700" text-anchor="middle">84</text>

            <!-- 4. Roasted Milk Tea (110 cups) -->
            <rect x="370" y="60" width="36" height="150" rx="4" class="chart-bar" />
            <text x="388" y="225" fill="#5e5a75" font-size="9" text-anchor="middle">Roasted Tea</text>
            <text x="388" y="52" fill="#008f7a" font-size="9" font-weight="700" text-anchor="middle">110</text>
        </svg>
    `;

    // Render Table Rows based on Role
    const tableBody = document.getElementById("analytics-table-rows");
    tableBody.innerHTML = "";

    let rowsData = [];
    if (currentUser.role === "Outlet Manager") {
        rowsData = [
            { name: "Machang Outlet #402", region: "Kelantan", staff: "3 active", trans: "420", avgPrice: "RM 11.60", total: "RM 4,892.50", status: "Active" }
        ];
    } else if (currentUser.role === "Area Manager" || currentUser.role === "HQ Management") {
        rowsData = [
            { name: "Machang Outlet #402", region: "Kelantan", staff: "3 active", trans: "420", avgPrice: "RM 11.60", total: "RM 4,892.50", status: "Active" },
            { name: "Kota Bharu Store #112", region: "Kelantan", staff: "4 active", trans: "580", avgPrice: "RM 12.10", total: "RM 7,018.00", status: "Active" },
            { name: "Pasir Mas Store #445", region: "Kelantan", staff: "2 active", trans: "310", avgPrice: "RM 10.90", total: "RM 3,379.00", status: "Active" },
            { name: "Gua Musang Store #502", region: "Kelantan", staff: "4 active", trans: "480", avgPrice: "RM 11.80", total: "RM 5,664.00", status: "Active" }
        ];
        if (currentUser.role === "HQ Management") {
            rowsData.push({ name: "Kuala Lumpur Central #001", region: "Klang Valley", staff: "12 active", trans: "1,840", avgPrice: "RM 14.50", total: "RM 26,680.00", status: "Active" });
            rowsData.push({ name: "Penang Gurney #301", region: "Northern", staff: "8 active", trans: "1,210", avgPrice: "RM 13.80", total: "RM 16,698.00", status: "Active" });
        }
    }

    rowsData.forEach(row => {
        tableBody.innerHTML += `
            <tr>
                <td><strong>${row.name}</strong></td>
                <td>${row.region}</td>
                <td>${row.staff}</td>
                <td>${row.trans}</td>
                <td>${row.avgPrice}</td>
                <td style="color:var(--primary-teal); font-weight:700;">${row.total}</td>
                <td><span class="badge badge-teal">${row.status}</span></td>
            </tr>
        `;
    });
}

// --------------------------------------------------------
// SOCIALIZATION: DISCUSSION FORUM
// --------------------------------------------------------

function renderThreadList(category = "all") {
    const container = document.getElementById("thread-list-container");
    container.innerHTML = "";

    const filtered = threads.filter(t => category === "all" || t.category === category);

    if (filtered.length === 0) {
        container.innerHTML = `<div class="p-sm text-center color-muted font-xs">No discussion threads in this category.</div>`;
        return;
    }

    filtered.forEach(t => {
        const item = document.createElement("div");
        item.className = "thread-item";
        item.innerHTML = `
            <div class="thread-title">${t.title}</div>
            <div class="thread-meta">
                <span>By ${t.authorName} (${t.authorRole})</span>
                <span>${t.replies.length} replies</span>
            </div>
        `;
        item.addEventListener("click", () => {
            document.querySelectorAll(".thread-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            selectThread(t.id);
        });
        container.appendChild(item);
    });
}

let activeThreadId = null;

function selectThread(threadId) {
    const thread = threads.find(t => t.id === threadId);
    if (!thread) return;

    activeThreadId = threadId;

    document.getElementById("forum-convo-empty").classList.add("hidden");
    document.getElementById("forum-convo-active").classList.remove("hidden");

    document.getElementById("convo-thread-tag").textContent = thread.category.toUpperCase();
    document.getElementById("convo-thread-date").textContent = thread.date;
    document.getElementById("convo-thread-title").textContent = thread.title;
    
    document.getElementById("convo-thread-author-avatar").textContent = thread.authorAvatar;
    document.getElementById("convo-thread-author-name").textContent = thread.authorName;
    document.getElementById("convo-thread-author-role").textContent = thread.authorRole;
    document.getElementById("convo-thread-content").textContent = thread.content;

    renderReplies(thread.replies);
}

function renderReplies(replies) {
    const list = document.getElementById("convo-replies-list");
    document.getElementById("convo-reply-count").textContent = replies.length;
    list.innerHTML = "";

    if (replies.length === 0) {
        list.innerHTML = `<div class="p-sm text-center color-muted font-xs">No replies yet. Start the conversation!</div>`;
        return;
    }

    replies.forEach(r => {
        const replyAvatar = r.authorAvatar || r.authorName.substring(0,2).toUpperCase();
        
        list.innerHTML += `
            <div class="reply-item">
                <div class="reply-item-header">
                    <div class="author-bar">
                        <div class="avatar-sm" style="background:var(--primary-purple); color:white;">${replyAvatar}</div>
                        <div class="author-details">
                            <span class="author-name">${r.authorName}</span>
                            <span class="author-role">${r.authorRole}</span>
                        </div>
                    </div>
                    <span class="convo-time">${r.date}</span>
                </div>
                <div class="reply-item-body">${r.content}</div>
            </div>
        `;
    });
}

function handleAddReply(e) {
    e.preventDefault();
    if (!activeThreadId) return;

    const textarea = document.getElementById("reply-textarea");
    const content = textarea.value.trim();

    if (!content) return;

    const threadIndex = threads.findIndex(t => t.id === activeThreadId);
    if (threadIndex === -1) return;

    const newReply = {
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: currentUser.role,
        date: "Just Now",
        content: content
    };

    threads[threadIndex].replies.push(newReply);
    textarea.value = "";

    renderReplies(threads[threadIndex].replies);
    renderThreadList(document.querySelector(".forum-cat-btn.active").getAttribute("data-forum-cat"));
    renderDashboardStats();
    showToast("Reply Posted", "Your insights have been shared in the thread.", "success");
}

function handleCreateThread(e) {
    e.preventDefault();
    const title = document.getElementById("thread-title-input").value;
    const category = document.getElementById("thread-category-select").value;
    const content = document.getElementById("thread-content-input").value;

    const newThread = {
        id: `thread-${Date.now()}`,
        category: category,
        title: title,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: currentUser.role,
        date: "Just Now",
        content: content,
        replies: []
    };

    threads.unshift(newThread);
    document.getElementById("add-thread-form").reset();
    closeModal("add-thread-modal");

    const activeCat = document.querySelector(".forum-cat-btn.active").getAttribute("data-forum-cat");
    renderThreadList(activeCat);
    renderDashboardStats();
    showToast("Thread Created", `"${title}" has been posted.`, "success");
}

// --------------------------------------------------------
// EXPERT DIRECTORY & MOCK MENTORSHIP CHAT ENGINE
// --------------------------------------------------------

function renderExperts(filterText = "") {
    const container = document.getElementById("expert-cards-container");
    container.innerHTML = "";

    const filtered = experts.filter(e => {
        return filterText === "" || 
            e.name.toLowerCase().includes(filterText.toLowerCase()) || 
            e.skill.toLowerCase().includes(filterText.toLowerCase()) || 
            e.role.toLowerCase().includes(filterText.toLowerCase());
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="p-sm text-center color-muted font-xs">No matching experts found.</div>`;
        return;
    }

    filtered.forEach(exp => {
        const avatarContent = exp.avatarImg 
            ? `<img src="${exp.avatarImg}" class="expert-avatar-img" alt="${exp.name}">` 
            : exp.avatar;

        const card = document.createElement("div");
        card.className = "expert-card card glass";
        card.innerHTML = `
            <div class="expert-card-top">
                <div class="expert-avatar-wrapper">
                    <div class="expert-avatar-lg">${avatarContent}</div>
                    <span class="avatar-online-dot" style="background-color: ${exp.online ? 'var(--success)' : '#7f8c8d'}"></span>
                </div>
                <h4>${exp.name}</h4>
                <span class="role">${exp.role}</span>
                <span class="skills">${exp.tag}</span>
            </div>
            <button class="btn btn-secondary btn-sm btn-block chat-trigger-btn">Send Message</button>
        `;

        card.querySelector(".chat-trigger-btn").addEventListener("click", () => {
            openMentorshipChat(exp);
        });

        container.appendChild(card);
    });
}

function openMentorshipChat(expert) {
    activeChatExpert = expert;

    document.getElementById("chat-empty-panel").classList.add("hidden");
    const activePanel = document.getElementById("chat-active-panel");
    activePanel.classList.remove("hidden");

    const chatExpertAvatarEl = document.getElementById("chat-expert-avatar");
    if (expert.avatarImg) {
        chatExpertAvatarEl.innerHTML = `<img src="${expert.avatarImg}" class="avatar-sm-img" alt="${expert.name}">`;
    } else {
        chatExpertAvatarEl.textContent = expert.avatar;
    }
    
    document.getElementById("chat-expert-name").textContent = expert.name;
    document.getElementById("chat-expert-tag").textContent = expert.role + " (" + expert.tag + ")";

    // Populate default chat log
    const msgContainer = document.getElementById("chat-messages-container");
    msgContainer.innerHTML = `
        <div class="chat-msg received">
            Hello, I am ${expert.name}. I specialize in **${expert.skill}**. Feel free to ask me any questions about our operations or recipes!
        </div>
    `;
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function closeChatPanel() {
    activeChatExpert = null;
    document.getElementById("chat-active-panel").classList.add("hidden");
    document.getElementById("chat-empty-panel").classList.remove("hidden");
}

function handleSendChatMessage(e) {
    e.preventDefault();
    if (!activeChatExpert) return;

    const input = document.getElementById("chat-input");
    const userMsg = input.value.trim();

    if (!userMsg) return;

    const msgContainer = document.getElementById("chat-messages-container");
    
    // Append Sent Msg
    const sentEl = document.createElement("div");
    sentEl.className = "chat-msg sent";
    sentEl.textContent = userMsg;
    msgContainer.appendChild(sentEl);
    
    input.value = "";
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Simulate Expert Response (Tacit knowledge exchange)
    setTimeout(() => {
        if (!activeChatExpert) return;
        const responseEl = document.createElement("div");
        responseEl.className = "chat-msg received";
        responseEl.textContent = activeChatExpert.replyPrompt;
        msgContainer.appendChild(responseEl);
        msgContainer.scrollTop = msgContainer.scrollHeight;
        
        // Trigger small toast
        showToast("New Chat Response", `Reply from ${activeChatExpert.name}`, "info");
    }, 1200);
}

// --------------------------------------------------------
// LMS VIDEO GUIDES & ROUTINES CALIBRATION
// --------------------------------------------------------

function renderCourseList() {
    const container = document.getElementById("course-list-container");
    container.innerHTML = "";

    courses.forEach(c => {
        const item = document.createElement("div");
        item.className = "course-item";
        item.innerHTML = `
            <div class="course-item-title">${c.title}</div>
            <div class="course-item-meta">${c.category} &bull; ${c.videoDuration}</div>
            <div class="course-item-progress-track">
                <div class="course-item-progress-fill" style="width: ${c.completedPercent}%"></div>
            </div>
        `;
        item.addEventListener("click", () => {
            document.querySelectorAll(".course-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            selectCourse(c);
        });
        container.appendChild(item);
    });
}

function selectCourse(course) {
    activeCourse = course;

    // Reset video overlay
    pauseVideoSimulation();
    document.getElementById("video-placeholder-overlay").classList.remove("hidden");
    document.getElementById("video-playing-state").classList.add("hidden");

    document.getElementById("player-empty-msg").classList.add("hidden");
    document.getElementById("player-active-area").classList.remove("hidden");

    document.getElementById("player-title").textContent = course.title;
    document.getElementById("player-course-progress").textContent = `Progress: ${course.completedPercent}% Completed`;
    document.getElementById("video-duration-tag").textContent = course.videoDuration;

    // Populate checklist items
    const checklist = document.getElementById("training-checklist-items");
    checklist.innerHTML = "";

    course.items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''}>
            <label for="${item.id}">${item.text}</label>
        `;
        li.querySelector("input").addEventListener("change", (e) => {
            handleChecklistChange(course.id, item.id, e.target.checked);
        });
        checklist.appendChild(li);
    });
}

function handleChecklistChange(courseId, itemId, isChecked) {
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return;

    const itemIndex = courses[courseIndex].items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    courses[courseIndex].items[itemIndex].checked = isChecked;

    // Recalculate course percentage
    const checkedCount = courses[courseIndex].items.filter(i => i.checked).length;
    const totalCount = courses[courseIndex].items.length;
    const newPercent = Math.round((checkedCount / totalCount) * 100);
    
    courses[courseIndex].completedPercent = newPercent;

    document.getElementById("player-course-progress").textContent = `Progress: ${newPercent}% Completed`;
    
    renderCourseList();
    calculateOverallProgress();

    if (newPercent === 100) {
        showToast("Module Complete!", `You have finished all checks for "${courses[courseIndex].title}".`, "success");
    }
}

function calculateOverallProgress() {
    const totalCompleted = courses.reduce((acc, curr) => acc + curr.completedPercent, 0);
    const overall = Math.round(totalCompleted / courses.length);

    document.getElementById("home-lms-progress").style.width = `${overall}%`;
    document.getElementById("home-lms-percentage").textContent = `${overall}%`;
}

function startVideoSimulation() {
    document.getElementById("video-placeholder-overlay").classList.add("hidden");
    document.getElementById("video-playing-state").classList.remove("hidden");

    const totalSeconds = parseDuration(activeCourse.videoDuration);
    videoProgress = 0;

    document.getElementById("video-elapsed").textContent = formatTime(videoProgress);
    document.getElementById("video-total").textContent = activeCourse.videoDuration;

    videoTimer = setInterval(() => {
        videoProgress++;
        document.getElementById("video-elapsed").textContent = formatTime(videoProgress);
        
        if (videoProgress >= totalSeconds) {
            pauseVideoSimulation();
            showToast("Video Finished", `You have finished watching the training video for "${activeCourse.title}".`, "success");
        }
    }, 1000);
}

function pauseVideoSimulation() {
    if (videoTimer) {
        clearInterval(videoTimer);
        videoTimer = null;
    }
    document.getElementById("video-placeholder-overlay").classList.remove("hidden");
    document.getElementById("video-playing-state").classList.add("hidden");
}

function parseDuration(durationStr) {
    const parts = durationStr.split(':');
    return (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
}

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}
