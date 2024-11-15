import nodemailer from "nodemailer";
import User from "../models/user";
import bcrypt from "bcryptjs";

type SendEmail = {
  to: string | string[];
  emailType: string;
  text?: string;
  userId: string;
};

export const sendEmail = async ({ to, emailType, text, userId }: SendEmail) => {
  try {
    let subject = "";
    let html = "";
    // TODO:: configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      subject = "Verify Email Address";
      html = `<p>verify your email<a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">click here</a> or copy paste the below link the browser ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`;

      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "68f348e64412d6",
        pass: "e02218b0ed188c",
      },
    });
    const mailOptions = {
      from: "subhashnayak131@gmail.com",
      to,
      text,
      subject,
      html,
    };
    const res = await transporter.sendMail(mailOptions);
    console.log("🚀 ~ sendEmail ~ res:", res);
  } catch (e) {
    console.log("Failed to send mail", e);
  }
};
