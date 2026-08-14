import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase-admin";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  role?: string;
  checkSize?: string;
  stageInterest?: string;
  message?: string;
  requestType?: string;
  locale?: "en" | "es";
};

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const locale = body.locale === "es" ? "es" : "en";

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const lead = {
      firstName,
      lastName,
      email,
      phone,
      organization: body.organization?.trim() ?? "",
      role: body.role?.trim() ?? "",
      checkSize: body.checkSize?.trim() ?? "",
      stageInterest: body.stageInterest?.trim() ?? "",
      message: body.message?.trim() ?? "",
      requestType: body.requestType?.trim() ?? "General request",
      locale,
      source: "socialpulse-landing",
      createdAt: new Date().toISOString(),
    };

    if (!db) {
      return NextResponse.json(
        { error: "Missing Firebase configuration" },
        { status: 500 },
      );
    }

    const notificationEmail = process.env.LEADS_TO_EMAIL;
    const senderEmail = process.env.LEADS_FROM_EMAIL;

    if (!resend || !notificationEmail || !senderEmail) {
      return NextResponse.json(
        { error: "Missing Resend configuration" },
        { status: 500 },
      );
    }

    const docRef = await db.collection("leads").add(lead);

    const safeFirstName = lead.firstName
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

    const emailCopy = locale === "es"
      ? {
          title: "Gracias por contactar con nosotros.",
          greeting: `Hola ${safeFirstName},`,
          received: "Gracias por ponerte en contacto con SocialPulse. Hemos recibido tu mensaje y una persona de nuestro equipo te responderá muy pronto.",
          closing: "Nos alegra contar contigo mientras construimos una forma más clara de comprender qué mueve realmente a las audiencias.",
          team: "El equipo de SocialPulse",
          tagline: "Comprende qué mueve a las audiencias.",
          link: "Visitar socialpulse.es →",
          subject: "Gracias por contactar con SocialPulse",
          homepage: "https://www.socialpulse.es/es",
        }
      : {
          title: "Thanks for reaching out.",
          greeting: `Hi ${safeFirstName},`,
          received: "Thanks for getting in touch with SocialPulse. We’ve received your message, and a member of our team will get back to you shortly.",
          closing: "We’re glad to have you with us as we build a clearer way to understand what truly moves audiences.",
          team: "The SocialPulse team",
          tagline: "Understand what moves audiences.",
          link: "Visit socialpulse.es →",
          subject: "Thanks for reaching out to SocialPulse",
          homepage: "https://www.socialpulse.es",
        };

    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html lang="${locale}">
        <body style="margin:0; padding:0; background:#050912; font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050912;">
            <tr>
              <td align="center" style="padding:40px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; overflow:hidden; border:1px solid rgba(255,255,255,0.10); border-radius:16px; background:#091426;">
                  <tr>
                    <td style="height:4px; background:#9A33FF; background-image:linear-gradient(90deg,#246BFF,#9A33FF,#F2398A,#14C7E5);"></td>
                  </tr>

                  <tr>
                    <td style="padding:36px 38px;">
                      <a
                        href="${emailCopy.homepage}"
                        target="_blank"
                        style="display:inline-block; margin:0 0 28px; text-decoration:none;"
                      >
                        <img
                          src="https://www.socialpulse.es/logos/logo_banner_fondo_oscuro.png"
                          alt="SocialPulse"
                          width="160"
                          style="display:block; width:160px; max-width:100%; height:auto; border:0;"
                        />
                      </a>

                      <h1 style="margin:0 0 20px; color:#F5F7FA; font-size:28px; line-height:1.25;">
                        ${emailCopy.title}
                      </h1>

                      <p style="margin:0 0 16px; color:#AAB4C2; font-size:16px; line-height:1.7;">
                        ${emailCopy.greeting}
                      </p>

                      <p style="margin:0 0 16px; color:#AAB4C2; font-size:16px; line-height:1.7;">
                        ${emailCopy.received}
                      </p>

                      <p style="margin:0; color:#AAB4C2; font-size:16px; line-height:1.7;">
                        ${emailCopy.closing}
                      </p>

                      <div style="margin:30px 0; height:1px; background:rgba(255,255,255,0.10);"></div>

                      <p style="margin:0 0 5px; color:#F5F7FA; font-size:15px; font-weight:600;">
                        ${emailCopy.team}
                      </p>

                      <p style="margin:0; color:#6E9BFF; font-size:14px;">
                        ${emailCopy.tagline}
                      </p>
                      <p style="margin:10px 0 0; font-size:14px;">
                      <a
                        href="${emailCopy.homepage}"
                        target="_blank"
                        style="color:#6E9BFF; text-decoration:none;"
                      >
                        ${emailCopy.link}
                      </a>
                    </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const [
      { error: notificationEmailError },
      { error: confirmationEmailError },
    ] = await Promise.all([
      resend.emails.send({
        from: senderEmail,
        to: notificationEmail,
        subject: `New ${lead.requestType} request from ${lead.firstName} ${lead.lastName}`,
        html: `
          <h2>New SocialPulse lead</h2>
          <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Organization:</strong> ${lead.organization || "Not provided"}</p>
          <p><strong>Role:</strong> ${lead.role || "Not provided"}</p>
          <p><strong>Request type:</strong> ${lead.requestType}</p>
          <p><strong>Language:</strong> ${lead.locale}</p>
          <p><strong>Message:</strong> ${lead.message || "Not provided"}</p>
        `,
      }),
      resend.emails.send({
        from: senderEmail,
        to: lead.email,
        subject: emailCopy.subject,
        html: confirmationEmailHtml,
      }),
    ]);

    if (notificationEmailError) {
      console.error("Resend notification email error:", notificationEmailError);
      return NextResponse.json(
        { error: "Lead saved, but email notification failed" },
        { status: 500 },
      );
    }

    if (confirmationEmailError) {
      console.error("Resend confirmation email error:", confirmationEmailError);
    }

    return NextResponse.json({
      success: true,
      leadId: docRef.id,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
