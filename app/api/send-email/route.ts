import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_F2XJctir_HfqpLgEusi5nsc3RN43EZYpj")

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["g4uforlife@gmail.com"],
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background: #000; color: #fff;">
          <h2 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">NEW SIGNAL RECEIVED</h2>
          <div style="margin: 20px 0;">
            <p><strong>[SENDER_ID]:</strong> ${name}</p>
            <p><strong>[TRANSMISSION_ADDRESS]:</strong> ${email}</p>
          </div>
          <div style="border: 2px solid #fff; padding: 20px; margin-top: 20px;">
            <p><strong>[MESSAGE_PAYLOAD]:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
