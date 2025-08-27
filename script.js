
        // Smooth scrolling para los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animación de entrada para las tarjetas de servicio
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar animación a las tarjetas de servicio
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Funcionalidad del carrusel de galería
        let currentSlide = 0;
        const totalSlides = 6;

        function moveGallery(direction) {
            currentSlide += direction;
            
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            }
            
            updateGallery();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateGallery();
        }

        function updateGallery() {
            const track = document.getElementById('galleryTrack');
            const indicators = document.querySelectorAll('.gallery-indicator');
            
            // Mover el carrusel
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.remove('bg-gray-300');
                    indicator.classList.add('bg-blue-600');
                } else {
                    indicator.classList.remove('bg-blue-600');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }

        // Auto-play del carrusel (opcional)
        setInterval(() => {
            moveGallery(1);
        }, 5000); // Cambia cada 5 segundos

        // Pausar auto-play cuando el usuario interactúa
        document.querySelectorAll('.gallery-btn, .gallery-indicator').forEach(element => {
            element.addEventListener('click', () => {
                clearInterval();
            });
        });
