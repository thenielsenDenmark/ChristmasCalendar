document.addEventListener("DOMContentLoaded", () => {
    // Snowflake animation
    const NUMBER_OF_SNOWFLAKES = 300;
    const MAX_SNOWFLAKE_SIZE = 5;
    const MAX_SNOWFLAKE_SPEED = 2;
    const SNOWFLAKE_COLOUR = '#ddd';
    const snowflakes = [];

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = '0px';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas); // Canvas is added here

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
    }

    const updateSnowflake = snowflake => {
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.sway;
        if (snowflake.y > canvas.height) {
            Object.assign(snowflake, createSnowflake());
        }
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            updateSnowflake(snowflake);
            drawSnowflake(snowflake);
        });
        requestAnimationFrame(animate);
    }

    for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
        snowflakes.push(createSnowflake());
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        canvas.style.top = `${window.scrollY}px`;
    });

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
