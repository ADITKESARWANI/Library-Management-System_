export const sendEmail = async ({ email, subject, message }) => {
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL,
            to: [email],
            subject: subject,
            html: message,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Resend email error:", data);
        throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data.id);

    return data;
};
