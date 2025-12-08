document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const feedback = document.getElementById("contactFeedback");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        if (message.length < 5) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a message.";
            return;
        }

        feedback.style.color = "#2d5016";
        feedback.textContent = "Thank you for your message. We will get back to you soon.";

        form.reset();
    });

});
