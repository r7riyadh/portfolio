document.addEventListener("DOMContentLoaded", () => {
    // Scroll Fade-In
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-8");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));

    // Particle Interaction (Following Mouse)
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#10b981" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#10b981", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" }, 
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true 
                },
                "modes": { 
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // Modal logic for "Get In Touch"
    const openBtn = document.getElementById('open-modal');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('contact-modal');
    const backdrop = document.getElementById('modal-backdrop');

    const toggleModal = () => {
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
    };

    if(openBtn) openBtn.addEventListener('click', toggleModal);
    if(closeBtn) closeBtn.addEventListener('click', toggleModal);
    if(backdrop) backdrop.addEventListener('click', toggleModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            toggleModal();
        }
    });

    // NEW Email Copy Functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailAddress = 'r7riyadh@gmail.com';
            
            // The Clipboard API copies the text to the user's device
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Save the original text to revert back later
                const originalText = copyEmailBtn.innerText;
                
                // Update the button text and color to show success
                copyEmailBtn.innerText = 'Email Copied!';
                copyEmailBtn.classList.add('text-emerald-400', 'border-emerald-500');
                
                // Change it back to normal after 2 seconds
                setTimeout(() => {
                    copyEmailBtn.innerText = originalText;
                    copyEmailBtn.classList.remove('text-emerald-400', 'border-emerald-500');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }
});