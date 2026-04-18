import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

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
        await resend.emails.send({
          from: "Phantasia <noreply@phantasia.cl>",
          to: ["hola@phantasia.cl"],
          subject: `Nueva solicitud de proyecto — ${businessName}`,
          html: `
            <h2>Nueva solicitud de proyecto</h2>
            <p><strong>Nombre:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${contactEmail}</p>
            <p><strong>Empresa:</strong> ${businessName}</p>
            <p><strong>Tipo:</strong> ${projectType?.join(", ")}</p>
            <p><strong>Presupuesto:</strong> ${budget}</p>
            <p><strong>Plazo:</strong> ${timeline}</p>
            <p><strong>Contacto preferido:</strong> ${contactMethod}</p>
            <hr/>
            <p><strong>Descripción:</strong> ${businessDesc}</p>
            <p><strong>Problema a resolver:</strong> ${problemSolving}</p>
            <p><strong>Funcionalidades:</strong> ${features?.join(", ")}</p>
          `,
        });
      } catch {
        // Email failure should not block the response
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
