import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

function esc(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function list(value: unknown): string {
  return Array.isArray(value) ? value.map(esc).join(", ") : esc(value);
}

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      projectType,
      currentSituation,
      businessName,
      businessDesc,
      problemSolving,
      features,
      budget,
      timeline,
      contactName,
      contactEmail,
      contactMethod,
      locale = "es",
    } = body;

    // Basic validation
    if (!contactName || !contactEmail || !contactMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.projectInquiry.create({
      data: {
        projectType: JSON.stringify(projectType),
        currentSituation,
        businessName,
        businessDesc,
        problemSolving,
        features: JSON.stringify(features),
        budget,
        timeline,
        contactName,
        contactEmail,
        contactMethod,
        locale,
      },
    });

    // Send email notification
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const replyTo =
          typeof contactEmail === "string" && EMAIL_RE.test(contactEmail.trim())
            ? contactEmail.trim()
            : undefined;
        const subjectName = String(businessName ?? contactName)
          .replace(/[\r\n]+/g, " ")
          .slice(0, 120);

        const { error } = await resend.emails.send({
          from: "Phantasia <noreply@phantasia.cl>",
          to: [process.env.CONTACT_EMAIL ?? "hola@phantasia.cl"],
          replyTo,
          subject: `Nueva solicitud de proyecto — ${subjectName}`,
          html: `
            <h2>Nueva solicitud de proyecto</h2>
            <p><strong>Nombre:</strong> ${esc(contactName)}</p>
            <p><strong>Email:</strong> ${esc(contactEmail)}</p>
            <p><strong>Empresa:</strong> ${esc(businessName)}</p>
            <p><strong>Tipo:</strong> ${list(projectType)}</p>
            <p><strong>Presupuesto:</strong> ${esc(budget)}</p>
            <p><strong>Plazo:</strong> ${esc(timeline)}</p>
            <p><strong>Contacto preferido:</strong> ${esc(contactMethod)}</p>
            <hr/>
            <p style="white-space:pre-wrap"><strong>Descripción:</strong> ${esc(businessDesc)}</p>
            <p style="white-space:pre-wrap"><strong>Problema a resolver:</strong> ${esc(problemSolving)}</p>
            <p><strong>Funcionalidades:</strong> ${list(features)}</p>
          `,
        });

        // Resend returns errors instead of throwing — log them so they show in Vercel logs
        if (error) console.error("Resend error:", error);
      } catch (err) {
        // Email failure should not block the response
        console.error("Resend exception:", err);
      }
    } else {
      console.warn("RESEND_API_KEY not set — inquiry saved but no email sent");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
