document.addEventListener("DOMContentLoaded", () => {
    // Snowflake animation
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
    const previousWidth = canvas.width;
    const previousHeight = canvas.height;

    // Update canvas size to match the new window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust snowflakes' positions proportionally
    if (previousWidth > 0 && previousHeight > 0) {
        snowflakes.forEach(snowflake => {
            snowflake.x = (snowflake.x / previousWidth) * canvas.width;
            snowflake.y = (snowflake.y / previousHeight) * canvas.height;
        });
    }
};

    animate();

    // Calendar functionality
    const today = new Date();
    const currentDay = today.getDate();

    // Select all days
    const days = document.querySelectorAll(".day");

    // Create a style element to inject into the page
    const style = document.createElement('style');
    style.innerHTML = `
        .responsive {
            max-width: 100%;
            height: auto;
        }
        .locked {
            pointer-events: none;
            opacity: 0.5;
        }
        .open img {
            display: block;
            margin: 0 auto;
        }
    `;
    document.head.appendChild(style);

    days.forEach(day => {
        const dayNumber = parseInt(day.dataset.day, 10);

        // Lock future days
        if (dayNumber > currentDay) {
            day.classList.add("locked");
        }

        // Add click event
        day.addEventListener("click", () => {
            if (!day.classList.contains("locked")) {
                day.classList.add("open");
                day.innerHTML = `<img src="https://thenielsendenmark.github.io/ChristmasCalendar/images/${dayNumber}.jpg" alt="Surprise!" class="responsive">`;
            }
        });
    });
});
