async function loadOnesNavbar() {
    const placeholder = document.getElementById('ones-nav-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('ones-nav.html');
        const navHTML = await response.text();
        placeholder.innerHTML = navHTML;
        
        // NOW that the HTML is on the page, we run your logic
        initOnesNavLogic();
    } catch (err) {
        console.error("Navbar failed to load. Check if you are using Live Server.", err);
    }
}

function initOnesNavLogic() {
    // All your original logic goes here, exactly as you had it
    const onesMobileToggle = document.getElementById('ones-mobile-toggle');
    const onesNavMenu = document.getElementById('ones-nav-menu');
    const onesDropdownTrigger = document.querySelector('.ones-dropdown-trigger');
    const onesDropdownParent = document.querySelector('.ones-dropdown');

    if (!onesMobileToggle || !onesNavMenu) return;

    // Mobile Menu Toggle
    onesMobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        onesNavMenu.classList.toggle('ones-active');

        const onesBars = onesMobileToggle.querySelectorAll('.ones-bar');
        if (onesNavMenu.classList.contains('ones-active')) {
            onesBars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            onesBars[1].style.opacity = '0';
            onesBars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            onesBars[0].style.transform = 'none';
            onesBars[1].style.opacity = '1';
            onesBars[2].style.transform = 'none';
        }
    });

    // Mobile Dropdown Expansion
    onesDropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            onesDropdownParent.classList.toggle('ones-active');
            
            const onesIcon = onesDropdownTrigger.querySelector('i');
            onesIcon.style.transform = onesDropdownParent.classList.contains('ones-active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        e.stopPropagation();
        onesDropdownParent.classList.toggle('ones-is-open');
    });

    // Global Close Click
    document.addEventListener('click', (e) => {
        if (!onesNavMenu.contains(e.target) && !onesMobileToggle.contains(e.target)) {
            onesNavMenu.classList.remove('ones-active');
            onesDropdownParent.classList.remove('ones-is-open');
            
            const onesBars = onesMobileToggle.querySelectorAll('.ones-bar');
            onesBars[0].style.transform = 'none';
            onesBars[1].style.opacity = '1';
            onesBars[2].style.transform = 'none';
        }
    });
}

// Start the loading process
loadOnesNavbar();