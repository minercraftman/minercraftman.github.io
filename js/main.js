document.addEventListener('DOMContentLoaded', function() {
    // Font Resizer Logic
    const themeKey = 'preferredTheme';
    
    function setTheme(size) {
        // Remove existing theme classes
        document.body.classList.remove('theme-12px', 'theme-14px', 'theme-16px', 'theme-18px', 'theme-20px');
        
        // Add new theme class (default if not provided)
        if (!size) size = '14px';
        document.body.classList.add('theme-' + size);
        
        // Save to localStorage
        localStorage.setItem(themeKey, size);
        
        // Update active state in dropdown
        document.querySelectorAll('#DropdownDiv a').forEach(btn => {
            if (btn.innerText === size) {
                btn.classList.add('selectedLB');
            } else {
                btn.classList.remove('selectedLB');
            }
        });
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem(themeKey);
    setTheme(savedTheme || '14px');

    // Bind Click Events
    document.querySelectorAll('#DropdownDiv a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            setTheme(this.innerText);
        });
    });

    // Dynamic Date Logic
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        dateElement.innerText = (now.getMonth() + 1) + '/' + now.getFullYear();
    }
});
