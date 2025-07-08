
        document.addEventListener('DOMContentLoaded', () => {

            // Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('py-2');
                    header.classList.remove('py-4');
                } else {
                    header.classList.add('py-4');
                    header.classList.remove('py-2');
                }
            });

            // Hero Section Animations
            anime({
                targets: '.animate-title',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: 200,
                duration: 800,
                easing: 'easeOutExpo'
            });

            anime({
                targets: '.animate-subtitle',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: 400,
                duration: 800,
                easing: 'easeOutExpo'
            });

            anime({
                targets: '.animate-buttons a',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(200, {start: 600}),
                duration: 800,
                easing: 'easeOutExpo'
            });

            // Scroll Animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeIn');
                        
                        // Animate skill bars when they become visible
                        if (entry.target.id === 'skills') {
                            const skillBars = document.querySelectorAll('.skill-bar-fill');
                            skillBars.forEach(bar => {
                                const width = bar.getAttribute('data-width');
                                anime({
                                    targets: bar,
                                    width: width,
                                    duration: 1500,
                                    easing: 'easeInOutQuad'
                                });
                            });
                        }
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('section').forEach(section => {
                section.classList.add('opacity-0'); // Prepare for fade-in
                observer.observe(section);
            });

            // Add a style for the fade-in animation
            const style = document.createElement('style');
            style.innerHTML = `
                .opacity-0 { opacity: 0; }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
            
            // Smooth scrolling for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu on click
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            });
        });