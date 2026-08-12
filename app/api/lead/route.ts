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
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
      source: "socialpulse-landing",
      createdAt: new Date().toISOString(),
    };

    if (!db) {
      return NextResponse.json({ error: "Missing Firebase configuration" }, { status: 500 });
    }

    const notificationEmail = process.env.LEADS_TO_EMAIL;
    const senderEmail = process.env.LEADS_FROM_EMAIL;

    if (!resend || !notificationEmail || !senderEmail) {
      return NextResponse.json({ error: "Missing Resend configuration" }, { status: 500 });
    }

    const docRef = await db.collection("leads").add(lead);

    const { error: emailError } = await resend.emails.send({
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
        <p><strong>Message:</strong> ${lead.message || "Not provided"}</p>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json({ error: "Lead saved, but email notification failed" }, { status: 500 });
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