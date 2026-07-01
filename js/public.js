/* ========================================================
   TEALIVE PUBLIC CUSTOMER HOME PORTAL SCRIPT
   ======================================================== */

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
    { id: "cm-10", name: "Bang Bang Hojicha Mousse", category: "bangbang", image: "images/bangbanghojichamoussedrinks.jpg", desc: "Aromatic roasted hojicha layer capped with cheese mousse, brown sugar, and pearls.", price: "RM 12.50", cals: "300 kcal" },
    { id: "cm-11", name: "Bang Bang Ketum Pistachio Matcha Tea Iced Blend", category: "bangbang", image: "images/bangbangketumpistachiotea.png", desc: "Ketum is a tropical evergreen tree of the Rubiaceae family native to Southeast Asia.", price: "RM 67.50", cals: "0 kcal" }
];

document.addEventListener("DOMContentLoaded", () => {
    initPublicPage();
});

function initPublicPage() {
    // Render initial menu
    renderPublicMenu("signature");

    // Category Tabs Events
    const tabBtns = document.querySelectorAll(".menu-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderPublicMenu(btn.getAttribute("data-menu-category"));
        });
    });

    // Theme Toggle Events
    initThemeToggle();

    // Link: Go to login.html
    document.getElementById("go-to-login-btn").addEventListener("click", () => {
        window.location.href = "login.html";
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

function initThemeToggle() {
    const publicThemeBtn = document.getElementById("public-theme-toggle");
    const publicSunIcon = publicThemeBtn.querySelector(".theme-icon-sun");
    const publicMoonIcon = publicThemeBtn.querySelector(".theme-icon-moon");

    const publicLogo = document.getElementById("public-logo");
    const publicUitmLogo = document.getElementById("public-uitm-logo");
    const aboutLogo = document.getElementById("about-logo");
    const aboutUitmLogo = document.getElementById("about-uitm-logo");

    let activeTheme = localStorage.getItem("theme") || "light";

    function updateThemeUI(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            publicSunIcon.classList.remove("hidden");
            publicMoonIcon.classList.add("hidden");
            
            // Dark Images
            publicLogo.src = "images/logo-tealive-whitetransparent.png";
            publicUitmLogo.src = "images/LOGO_UiTM_OUTLINE_3(WHITE).png";
            aboutLogo.src = "images/logo-tealive-whitetransparent.png";
            aboutUitmLogo.src = "images/LOGO_UiTM_OUTLINE_3(WHITE).png";
        } else {
            document.body.classList.remove("dark-mode");
            publicSunIcon.classList.add("hidden");
            publicMoonIcon.classList.remove("hidden");
            
            // Light Images
            publicLogo.src = "images/logo-tealive.png";
            publicUitmLogo.src = "images/logo-UiTM.png";
            aboutLogo.src = "images/logo-tealive.png";
            aboutUitmLogo.src = "images/logo-UiTM.png";
        }
    }

    updateThemeUI(activeTheme);

    publicThemeBtn.addEventListener("click", () => {
        activeTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem("theme", activeTheme);
        updateThemeUI(activeTheme);
    });
}
