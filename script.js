// ═══ BOOT SEQUENCE ═══
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const terminal = document.getElementById('terminal');

    // Boot duration: wait for all boot lines to animate, then fade out
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        terminal.classList.remove('hidden');
        terminal.classList.add('visible');

        // Remove boot screen from DOM after transition
        setTimeout(() => {
            bootScreen.remove();
        }, 800);

        // Initialize scroll animations after terminal is visible
        initScrollReveal();
    }, 3200);
});

// ═══ SCROLL REVEAL ═══
function initScrollReveal() {
    const sections = document.querySelectorAll('.fade-section');

    // Immediately show sections that are already in viewport
    const checkVisibility = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.88) {
                section.classList.add('visible');
            }
        });
    };

    // Stagger the initial visible sections
    let delay = 0;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            setTimeout(() => {
                section.classList.add('visible');
            }, delay);
            delay += 200;
        }
    });

    // Observe for scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    } else {
        // Fallback: show all
        sections.forEach(s => s.classList.add('visible'));
    }

    // Also listen to scroll for older browsers
    window.addEventListener('scroll', checkVisibility, { passive: true });
}

// ═══ SCROLL TO CONTACTS (legacy support) ═══
function scrollToContacts() {
    const contacts = document.getElementById('contacts');
    if (contacts) {
        contacts.scrollIntoView({ behavior: 'smooth' });
    }
}
