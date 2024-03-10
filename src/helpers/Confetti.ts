type confettiParticles = {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
}

export function useConfetti() {

    // confetti.js
    const container = document.getElementById('success')
    // Get the canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!;
    if (container) {
        container.appendChild(canvas)
    }
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create an array to store confetti particles
    const confettiParticles = <confettiParticles[]>[];

    // Generate random confetti particles
    function createConfetti() {
        const particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5, // Random size between 5 and 15
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            speedX: Math.random() * 2 - 1, // Random horizontal speed
            speedY: Math.random() * 3 + 1, // Random vertical speed
        };
        confettiParticles.push(particle);
    }

    // Draw confetti particles
    function confetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of confettiParticles) {
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            particle.x += particle.speedX;
            particle.y += particle.speedY;
        }
        requestAnimationFrame(confetti);
    }

    // Generate confetti particles
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }

    // Start the animation

    return { confetti }

}