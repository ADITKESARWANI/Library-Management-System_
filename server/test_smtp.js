import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    auth: {
        user: "cyberpaws432@gmail.com",
        pass: "dmtz kmdm azzl ifbz"
    }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});
