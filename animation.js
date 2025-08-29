// Sélectionne le canvas et configure son contexte de dessin
        const canvas = document.getElementById('animationCanvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Classe pour les particules de feux d'artifice
        class FireworkParticle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = {
                    x: (Math.random() - 0.5) * 6,
                    y: (Math.random() - 0.5) * 6
                };
                this.alpha = 1;
                this.decay = Math.random() * 0.03 + 0.01;
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
                ctx.fill();
                ctx.restore();
            }
        }

        let particles = [];
        let time = 0;
        let heartRate = 1; // Fréquence de création des points du cœur

        // Fonction pour obtenir des coordonnées en forme de cœur
        function getHeartPoint(t) {
            return {
                x: 16 * Math.sin(t) * Math.sin(t) * Math.sin(t),
                y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
            };
        }

        // Fonction principale d'animation
        function animate() {
            // Effet de traînée
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // Ajoute un nouveau point au cœur
            if (time % heartRate === 0) {
                const t = Math.random() * (Math.PI * 2);
                const point = getHeartPoint(t);
                const scale = Math.min(width, height) / 35;
                const x = point.x * scale + width / 2;
                const y = point.y * scale + height / 2;

                // Génère les particules pour l'explosion
                const numParticles = 100;
                for (let i = 0; i < numParticles; i++) {
                    // Couleurs aléatoires dans les tons violets
                    const color = {
                        r: 128 + Math.random() * 127,
                        g: Math.random() * 50,
                        b: 128 + Math.random() * 127
                    };
                    particles.push(new FireworkParticle(x, y, color));
                }
            }

            // Met à jour et dessine toutes les particules
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();

                // Supprime les particules qui ont disparu
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }

            time++;
            requestAnimationFrame(animate);
        }

        // Lance l'animation
        animate();

        // Gère le redimensionnement de la fenêtre pour un affichage réactif
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });