import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured. Simulating successful message dispatch for preview.")
      return NextResponse.json({
        success: true,
        message: "Simulated dispatch (configure RESEND_API_KEY for live delivery).",
      })
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["yabkal12345@gmail.com"],
      replyTo: email,
      subject: `[PORTFOLIO] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #09090b; font-family: ui-monospace, Menlo, monospace; color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="border: 1px solid #27272a; background: #121215; border-radius: 8px; padding: 24px;">
              <h2 style="margin: 0 0 16px; font-size: 18px; color: #10b981;">New Message Received</h2>
              <table style="width: 100%; font-size: 13px; color: #d4d4d8; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #71717a; width: 100px;">Sender:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #ffffff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a;">Time:</td>
                  <td style="padding: 6px 0;">${new Date().toISOString()}</td>
                </tr>
              </table>
              <div style="border-top: 1px solid #27272a; padding-top: 16px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #71717a; text-transform: uppercase;">Message Content:</p>
                <div style="background: #09090b; border: 1px solid #27272a; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NEW MESSAGE RECEIVED
====================
Sender: ${name}
Email: ${email}
Time: ${new Date().toISOString()}

Message:
${message}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

