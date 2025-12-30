import { onAuthStateChange, logout, getUserData } from "./auth.js";

// Global logic to update navigation based on auth state
export function initNavigation() {
    onAuthStateChange(async (user) => {
        const navActions = document.querySelector('.nav-actions');

        if (!navActions) return;

        // Always hide Dashboard Link in nav menu
        const dashboardLink = document.querySelector('.nav-menu a[href="dashboard.html"]');
        if (dashboardLink) dashboardLink.style.display = 'none';

        if (user) {

            // Get user data
            let userName = user.email.split('@')[0]; // Fallback name
            try {
                const userData = await getUserData(user.uid);
                if (userData && userData.name) {
                    userName = userData.name.split(' ')[0]; // First name only
                }
            } catch (e) {
                console.error("Error fetching user name:", e);
            }

            const initial = userName.charAt(0).toUpperCase();

            // Render Logged In State (User Profile)
            navActions.innerHTML = `
                <div class="user-menu" id="userMenu">
                    <div class="user-profile">
                        <div class="user-avatar">${initial}</div>
                        <span class="user-name">${userName}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="dashboard.html" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            <span>Profile Saya</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <button id="btnGlobalLogout" class="dropdown-item logout-btn">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            `;

            // Setup Dropdown Toggle
            const userMenu = document.getElementById('userMenu');
            const userDropdown = document.getElementById('userDropdown');

            if (userMenu && userDropdown) {
                userMenu.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userMenu.classList.toggle('active');
                    userDropdown.classList.toggle('show');
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!userMenu.contains(e.target)) {
                        userMenu.classList.remove('active');
                        userDropdown.classList.remove('show');
                    }
                });
            }

            // Setup Logout Handler
            const logoutBtn = document.getElementById('btnGlobalLogout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    try {
                        await logout();
                        window.location.href = 'index.html';
                    } catch (error) {
                        alert('Logout error: ' + error.message);
                    }
                });
            }

        } else {
            // Hide Dashboard Link
            if (dashboardLink) dashboardLink.style.display = 'none';

            // Render Logged Out State
            navActions.innerHTML = `
                <a href="login.html" class="nav-link" id="nav-login">Login</a>
                <a href="register.html" class="btn-register" id="nav-register">Register</a>
            `;
        }
    });
}
