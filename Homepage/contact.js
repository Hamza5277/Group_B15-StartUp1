document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const feedback = document.getElementById("contactFeedback");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        if (message.length < 5) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a message.";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, message })
            });

            const data = await response.json();

            if (!response.ok) {
                feedback.style.color = "red";
                feedback.textContent = "There was a problem sending your message.";
                return;
            }

            feedback.style.color = "#2d5016";
            feedback.textContent = data.message;
            form.reset();
        } catch (error) {
            feedback.style.color = "red";
            feedback.textContent = "Unable to connect to the server.";
        }
    });
});