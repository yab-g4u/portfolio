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
      console.error("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Log API key format (first/last chars only for security)
    console.log("[v0] API Key format check:", {
      length: apiKey.length,
      startsWithRe: apiKey.startsWith("re_"),
      firstChars: apiKey.substring(0, 5),
      lastChars: apiKey.substring(apiKey.length - 4),
    })

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["g4uforlife@gmail.com"],
      replyTo: email,
      subject: `[PORTFOLIO] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000; font-family: 'Courier New', monospace;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="border: 2px solid #fff; background: #000; color: #fff;">
              
              <!-- Header -->
              <div style="border-bottom: 2px solid #fff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 4px; color: #fff;">
                  SIGNAL RECEIVED
                </h1>
              </div>
              
              <!-- Metadata -->
              <div style="padding: 20px; border-bottom: 1px solid #333;">
                <table style="width: 100%; color: #fff;">
                  <tr>
                    <td style="padding: 8px 0; color: #888; font-size: 12px; letter-spacing: 2px;">
                      [SENDER_ID]
                    </td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #888; font-size: 12px; letter-spacing: 2px;">
                      [TRANSMISSION_ADDRESS]
                    </td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px;">
                      <a href="mailto:${email}" style="color: #fff; text-decoration: underline;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #888; font-size: 12px; letter-spacing: 2px;">
                      [TIMESTAMP]
                    </td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px;">
                      ${new Date().toISOString()}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #888; font-size: 12px; letter-spacing: 2px;">
                      [SOURCE]
                    </td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px;">
                      yeabsera-sisay.vercel.app
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Message -->
              <div style="padding: 20px;">
                <div style="color: #888; font-size: 12px; letter-spacing: 2px; margin-bottom: 12px;">
                  [MESSAGE_PAYLOAD]
                </div>
                <div style="border: 1px solid #444; padding: 20px; background: #0a0a0a;">
                  <p style="margin: 0; color: #fff; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="border-top: 1px solid #333; padding: 20px; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 11px; letter-spacing: 1px;">
                  YEABSERA SISAY // NEURAL ARCHITECT & FULLSTACK ENGINEER
                </p>
              </div>
              
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NEW SIGNAL RECEIVED
==================

[SENDER_ID]: ${name}
[TRANSMISSION_ADDRESS]: ${email}
[TIMESTAMP]: ${new Date().toISOString()}
[SOURCE]: yeabsera-sisay.vercel.app

[MESSAGE_PAYLOAD]:
${message}

--
YEABSERA SISAY // NEURAL ARCHITECT & FULLSTACK ENGINEER
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 400 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
