document.addEventListener("DOMContentLoaded", () => {
    const NUMBER_OF_SNOWFLAKES = 900;
    const MAX_SNOWFLAKE_SIZE = 5;
    const MAX_SNOWFLAKE_SPEED = 1;
    const SNOWFLAKE_COLOUR = '#ddd';
    const snowflakes = [];

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const createSnowflake = () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
        color: SNOWFLAKE_COLOUR,
        speed: Math.random() * MAX_SNOWFLAKE_SPEED + 1,
        sway: Math.random() - 0.5
    });

    const drawSnowflake = snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = snowflake.color;
        ctx.fill();
        ctx.closePath();
    };

    const updateSnowflake = snowflake => {
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.sway;
        if (snowflake.y > canvas.height || snowflake.x < 0 || snowflake.x > canvas.width) {
            Object.assign(snowflake, createSnowflake());
            snowflake.y = 0; // Reset to the top
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            updateSnowflake(snowflake);
            drawSnowflake(snowflake);
        });
        requestAnimationFrame(animate);
    };

    const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Reinitialize snowflakes when the canvas size changes
        snowflakes.length = 0; // Clear existing snowflakes
        for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
            snowflakes.push(createSnowflake());
        }
    };

    updateCanvasSize(); // Set the initial size
    window.addEventListener('resize', updateCanvasSize);

    window.addEventListener('scroll', () => {
        canvas.style.top = `${window.scrollY}px`;
    });

    animate();
});
