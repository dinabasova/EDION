import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("RESEND_API_KEY is missing. Emails will NOT be sent.");
}

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!to) return;

  if (!resend) {
    console.error("Resend client is not initialized. Check RESEND_API_KEY.");
    return;
  }

  try {
    const from = process.env.EMAIL_FROM || "Edionaz <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    console.log("Resend email sent:", result);
  } catch (error) {
    console.error("Email sending error:", error);
  }
}
