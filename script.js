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
});