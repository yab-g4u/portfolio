import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 })
    }

    // Send to FormSubmit.co (free form backend service)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("message", message)
    formData.append("_subject", `Portfolio Contact from ${name}`)
    formData.append("_captcha", "false")

    const res = await fetch("https://formsubmit.co/g4uforlife@gmail.com", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
