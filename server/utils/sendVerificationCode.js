import { 
    generateVerificationOtpEmailTemplate, 
    generateForgotPasswordOtpEmailTemplate,
    generateDeleteAccountOtpEmailTemplate 
} from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res, type = "register") {
    try {
        let message;
        let subject;

        if (type === "forgotPassword") {
            message = generateForgotPasswordOtpEmailTemplate(verificationCode);
            subject = "Password Reset Code (Bookworm Library)";
        } else if (type === "deleteAccount") {
            message = generateDeleteAccountOtpEmailTemplate(verificationCode);
            subject = "Account Deletion Code (Bookworm Library)";
        } else {
            message = generateVerificationOtpEmailTemplate(verificationCode);
            subject = "Verification Code (Bookworm Library Management System)";
        }

        await sendEmail({
            email,
            subject,
            message,
        });

        res.status(200).json({
            success: true,
            message: "Verification Code sent successfully",
        });
    } catch (error) {
        console.error("Verification email error:", error);

        return res.status(500).json({
            success: false,
            message: "Verification Code failed to send.",
        });
    }
}
