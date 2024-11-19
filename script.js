document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const currentDay = today.getDate();

    // Select all days
    const days = document.querySelectorAll(".day");

    // Create a style element to inject into the page
    const style = document.createElement('style');
    style.innerHTML = `
        .responsive {
            max-width: 200%;
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
