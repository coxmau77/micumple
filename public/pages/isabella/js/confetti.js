class ConfettiParticle {
    constructor(x, y, isBurst = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || (isBurst ? canvas.height / 2 : -50);
        
        // Size
        this.width = Math.random() * 8 + 5;
        this.height = Math.random() * 15 + 10;
        
        // Color (HSL)
        const hue = Math.floor(Math.random() * 360);
        this.color = `hsl(${hue}, 100%, 50%)`;
        
        // Physics
        this.speedY = Math.random() * 2 + 1; // Fall speed
        this.speedX = Math.random() * 2 - 1; // Drift
        
        // For burst effect
        if (isBurst) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 5;
            this.speedX = Math.cos(angle) * velocity;
            this.speedY = Math.sin(angle) * velocity;
        }

        // Oscillation and rotation
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.2 - 0.1;
        this.oscillationSpeed = Math.random() * 0.05 + 0.01;
        this.oscillationAmplitude = Math.random() * 2 + 0.5;
        this.time = Math.random() * 100;
    }

    update() {
        this.time += this.oscillationSpeed;
        
        // Add oscillation to X speed
        this.x += this.speedX + Math.sin(this.time) * this.oscillationAmplitude;
        this.y += this.speedY;
        
        // Gravity effect for burst particles
        if (this.speedY < 3) {
             this.speedY += 0.05;
        }

        // Add friction for burst particles to slow down horizontal movement
        this.speedX *= 0.99;

        this.angle += this.rotationSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        
        // 3D-ish rotation effect by scaling width
        const scaleX = Math.abs(Math.sin(this.time));
        ctx.scale(scaleX, 1);
        
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

const canvas = document.createElement('canvas');
canvas.id = 'confetti-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let particles = [];
let isAnimating = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial sizing

// Continuous spawning
function spawnContinuous() {
    if (Math.random() < 0.1) { // 10% chance per frame to spawn a new particle
        particles.push(new ConfettiParticle(null, -50, false));
    }
}

function animate() {
    if (!isAnimating) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    spawnContinuous();

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        
        // Remove off-screen particles
        if (p.y > canvas.height + 50 || p.x < -50 || p.x > canvas.width + 50) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

// Burst trigger
document.addEventListener('DOMContentLoaded', () => {
    const triggerElements = document.querySelectorAll('.btn-trigger');
    triggerElements.forEach(element => {
        element.addEventListener('click', (e) => {
            // Get element position for burst origin
            const rect = element.getBoundingClientRect();
            const burstX = rect.left + rect.width / 2;
            const burstY = rect.top + rect.height / 2;

            createBurst(burstX, burstY);
        });
    });
});

function createBurst(x, y) {
    const burstCount = 100;
    for (let i = 0; i < burstCount; i++) {
        particles.push(new ConfettiParticle(x, y, true));
    }
}

// Start animation
animate();