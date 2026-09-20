export const sendEmail = async ({ email, subject, message }) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: {
                name: "Bookworm Library",
                email: process.env.BREVO_FROM_EMAIL,
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: subject,
            htmlContent: message,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Brevo email error:", data);
        throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data.messageId);

    return data;
};
