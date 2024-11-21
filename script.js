document.addEventListener("DOMContentLoaded", () => {
    let NUMBER_OF_SNOWFLAKES = 900;
    let MAX_SNOWFLAKE_SIZE = 5;
    let MAX_SNOWFLAKE_SPEED = 1;
    const SNOWFLAKE_COLOUR = '#ddd';
    const snowflakes = [];

    // Define article links for each day
    const articleLinks = {
        1: "https://medium.com/",
        2: "https://google.com/",
    };

    // Function to adjust snowflake settings based on viewport size
    const adjustSnowflakeSettings = () => {
        const width = window.innerWidth;

        if (width < 480) { // Mobile
            NUMBER_OF_SNOWFLAKES = 300;
            MAX_SNOWFLAKE_SIZE = 3;
            MAX_SNOWFLAKE_SPEED = 0.5;
        } else if (width < 768) { // Tablet
            NUMBER_OF_SNOWFLAKES = 600;
            MAX_SNOWFLAKE_SIZE = 4;
            MAX_SNOWFLAKE_SPEED = 0.7;
        } else { // Desktop
            NUMBER_OF_SNOWFLAKES = 900;
            MAX_SNOWFLAKE_SIZE = 5;
            MAX_SNOWFLAKE_SPEED = 1;
        }
    };

    // Create and configure the canvas
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Snowflake creation
    const createSnowflake = () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * MAX_SNOWFLAKE_SIZE + 1,
        color: SNOWFLAKE_COLOUR,
        speed: Math.random() * MAX_SNOWFLAKE_SPEED + 0.5,
        sway: Math.random() - 0.5,
    });

    // Snowflake drawing
    const drawSnowflake = snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = snowflake.color;
        ctx.fill();
        ctx.closePath();
    };

    // Update snowflake position
    const updateSnowflake = snowflake => {
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.sway;
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    };

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            updateSnowflake(snowflake);
            drawSnowflake(snowflake);
        });
        requestAnimationFrame(animate);
    };

    // Adjust canvas size and recreate snowflakes dynamically
    const updateCanvasSize = () => {
        adjustSnowflakeSettings(); // Adjust settings based on screen size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        snowflakes.length = 0;
        for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
            snowflakes.push(createSnowflake());
        }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    animate();

    // Calendar functionality
    const today = new Date().getDate();
    const days = document.querySelectorAll(".day");

    days.forEach(day => {
        const dayNumber = parseInt(day.dataset.day, 10);
        if (dayNumber > today) {
            day.classList.add("locked");
        }
        day.addEventListener("click", () => {
            if (!day.classList.contains("locked")) {
                day.classList.add("open");
                
                // Create a hyperlink element
                const link = document.createElement('a');
                link.href = articleLinks[dayNumber] || "#";
                link.target = "_blank";
                link.style.display = "block";
                link.style.width = "100%";
                link.style.height = "100%";

                // Create an image element
                const img = document.createElement('img');
                img.src = `images/${dayNumber}.jpg`;
                img.alt = `Surprise for Day ${dayNumber}`;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";

                // Append the image to the link
                link.appendChild(img);

                // Replace the content of the day block with the link
                day.innerHTML = '';
                day.appendChild(link);
            }
        });
    });
});
