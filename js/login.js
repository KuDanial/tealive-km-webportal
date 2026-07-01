/* ========================================================
   TEALIVE STAFF PORTAL LOGIN SCRIPT
   ======================================================= */

const users = {
    "tearista": { name: "Ikhmal", role: "Tearista", roleBadge: "badge-tearista", avatar: "IK", scope: "Machang Outlet #402", avatarImg: "" },
    "outlet_manager": { name: "Rogayah", role: "Outlet Manager", roleBadge: "badge-outlet_manager", avatar: "RO", scope: "Machang Outlet #402", avatarImg: "images/rogayahprofile.png" },
    "area_manager": { name: "Amier Zhafran", role: "Area Manager", roleBadge: "badge-area_manager", avatar: "AZ", scope: "Kelantan Region (8 Outlets)", avatarImg: "images/amierprofile.png" },
    "hq_management": { name: "Tengku Danial", role: "HQ Management", roleBadge: "badge-hq_management", avatar: "TD", scope: "Global Corporate Hub", avatarImg: "images/tengkuprofile.png" }
};

document.addEventListener("DOMContentLoaded", () => {
    initLoginPage();
});

function initLoginPage() {
    // Theme sync
    initThemeSync();

    // Form submission
    document.getElementById("login-form").addEventListener("submit", (e) => {
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

        // Save session state to localStorage
        localStorage.setItem("tealive_role", selectedRole);
        localStorage.setItem("tealive_user_name", users[selectedRole].name);
        
        // Redirect to staff dashboard
        window.location.href = "dashboard.html";
    });

    // Back to customer homepage
    document.getElementById("back-to-public-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

function initThemeSync() {
    const loginLogo = document.getElementById("login-logo");
    const loginUitmLogo = document.getElementById("login-uitm-logo");
    
    let activeTheme = localStorage.getItem("theme") || "light";

    if (activeTheme === "dark") {
        document.body.classList.add("dark-mode");
        loginLogo.src = "images/logo-tealive-whitetransparent.png";
        loginUitmLogo.src = "images/LOGO_UiTM_OUTLINE_3(WHITE).png";
    } else {
        document.body.classList.remove("dark-mode");
        loginLogo.src = "images/logo-tealive.png";
        loginUitmLogo.src = "images/logo-UiTM.png";
    }
}
