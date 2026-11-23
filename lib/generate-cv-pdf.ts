import { jsPDF } from "jspdf"
import fs from "fs"
import path from "path"

export function generateExactPDF() {
  // Create document in portrait A4
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter",
  })

  const margin = 36
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin * 2
  let y = 42

  // Name
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.setTextColor(20, 20, 20)
  doc.text("Yeabsera Sisay", margin, y)

  // Header Right Contact Info
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(60, 60, 60)
  doc.text("g4uforlife@gmail.com  |  +251 90 263 6127", pageWidth - margin, y - 8, { align: "right" })
  doc.text("linkedin.com/in/yeabsera-sisay  |  github.com/yab-g4u", pageWidth - margin, y + 3, { align: "right" })
  doc.text("yeabsera-sisay.vercel.app", pageWidth - margin, y + 14, { align: "right" })

  y += 14
  // Subtitle
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.setTextColor(40, 40, 40)
  doc.text("AI Engineer — Agentic AI, Computer Vision & AI Systems", margin, y)

  y += 18

  // Helper for Section Titles
  function addSectionHeader(title: string) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(30, 30, 30)
    doc.text(title.toUpperCase(), margin, y)
    y += 4
    doc.setDrawColor(180, 180, 180)
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)
    y += 10
  }

  // SUMMARY
  addSectionHeader("Summary")
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(45, 45, 45)
  const summaryText =
    "AI Engineer focused on agentic AI, computer vision, and applied AI systems. I build intelligent software that combines models, agents, retrieval, and realtime interfaces with full-stack infrastructure to solve real-world problems. My work spans multi-agent systems, voice AI, computer vision, developer infrastructure, healthcare, agriculture, and financial technology — with a consistent focus on shipping complete, working systems rather than isolated experiments."
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(splitSummary, margin, y)
  y += splitSummary.length * 10.5 + 8

  // EXPERIENCE
  addSectionHeader("Experience")

  // Exp 1: GDG
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("AI/ML Technical Lead", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" — GDG on Campus AASTU", margin + doc.getTextWidth("AI/ML Technical Lead"), y)
  doc.text("2025 – Present", pageWidth - margin, y, { align: "right" })
  y += 10

  doc.setFontSize(8.2)
  const gdgBullets = [
    "• Lead AI/ML technical direction for the campus developer community, guiding members through practical agentic AI, computer vision, and ML project development.",
    "• Mentor student developers on building and shipping working AI systems, from model selection through deployment.",
  ]
  gdgBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 4

  // Exp 2: Lyne Creatives
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Software Lead", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" — Lyne Creatives", margin + doc.getTextWidth("Software Lead"), y)
  doc.text("Aug 2025 – Aug 2026", pageWidth - margin, y, { align: "right" })
  y += 10

  doc.setFontSize(8.2)
  const lyneBullets = [
    "• Led development of a collaborative workspace platform for an architectural firm, enabling internal teams to manage projects and communicate directly with clients.",
    "• Architected the platform's project-collaboration and client-communication modules end-to-end as software lead.",
  ]
  lyneBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 4

  // Exp 3: iCog Labs
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("AI Research Intern, Applied Machine Learning", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" — iCog Labs", margin + doc.getTextWidth("AI Research Intern, Applied Machine Learning"), y)
  doc.text("Jul 2024 – Oct 2025", pageWidth - margin, y, { align: "right" })
  y += 10

  doc.setFontSize(8.2)
  const icogBullets = [
    "• Conducted applied machine learning research and experimentation as part of iCog Labs' quantum computing research team.",
    "• Built and evaluated ML models and data pipelines supporting the team's ongoing research work.",
  ]
  icogBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 8

  // SELECTED PROJECTS
  addSectionHeader("Selected Projects")

  // MedScope
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("MedScope", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" Multi-Agent Epidemic Coordination System", margin + doc.getTextWidth("MedScope"), y)
  doc.setFontSize(8)
  doc.setTextColor(30, 80, 180)
  doc.text("github.com/yab-g4u/medscop", pageWidth - margin, y, { align: "right" })
  doc.setTextColor(45, 45, 45)
  y += 10

  doc.setFontSize(8.2)
  const medBullets = [
    "• Designed a multi-agent AI system coordinating epidemic response across policy analysis, logistics, and government-response workflows.",
    "• Built agent orchestration and sentiment-analysis components for real-time decision support; integrated blockchain for verifiable data coordination.",
  ]
  medBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  doc.setFont("helvetica", "bold")
  doc.setFontSize(7.8)
  doc.text("African Blockchain Championship — 2nd Place", margin + 8, y)
  y += 10

  // Omniq
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Omniq", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" Voice AI Infrastructure for People Without Smartphones", margin + doc.getTextWidth("Omniq"), y)
  doc.setFontSize(8)
  doc.setTextColor(30, 80, 180)
  doc.text("github.com/yab-g4u/omniq", pageWidth - margin, y, { align: "right" })
  doc.setTextColor(45, 45, 45)
  y += 10

  doc.setFontSize(8.2)
  const omniqBullets = [
    "• Built realtime conversational voice AI reachable over 2G/PSTN and IVR, extending AI access to feature-phone users.",
    "• Engineered multilingual voice interaction flows with structured extraction, targeting a feature-phone channel largely unaddressed elsewhere.",
  ]
  omniqBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 3

  // Surf
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Surf", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" Local-First Hybrid Search Engine", margin + doc.getTextWidth("Surf"), y)
  y += 10

  doc.setFontSize(8.2)
  const surfBullets = [
    "• Built a local-first hybrid search engine combining BM25 and sentence-transformer embeddings via reciprocal rank fusion, using SQLite/FTS5 and vector search with no hosted LLM APIs.",
    "• Indexed and searched imported data spanning Reddit, Telegram, Devpost, X, and LinkedIn.",
  ]
  surfBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 3

  // ShieldGuard
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("ShieldGuard", margin, y)
  doc.setFont("helvetica", "normal")
  doc.text(" AI-Powered Telecom Trust Orchestration", margin + doc.getTextWidth("ShieldGuard"), y)
  y += 10

  doc.setFontSize(8.2)
  const shieldBullets = [
    "• Designed an AI-driven trust-orchestration system applying telecom signals (Open Gateway/CAMARA) to mobile money and fintech identity onboarding across Sub-Saharan African infrastructure.",
  ]
  shieldBullets.forEach((b) => {
    const splitB = doc.splitTextToSize(b, contentWidth)
    doc.text(splitB, margin + 4, y)
    y += splitB.length * 9.5 + 1.5
  })
  y += 7

  // ADDITIONAL PROJECTS
  addSectionHeader("Additional Projects")
  doc.setFontSize(8)
  const addProjects = [
    "• Suno — Computer vision system using movement tracking to support children's speech-development activities.",
    "• CandidateFlow — AI recruitment tool that extracts and structures candidate data into recruiter-ready profiles.",
    "• Atlas — AI-powered portfolio generation and deployment platform. (github.com/yab-g4u/attlas)",
    "• IndieCrop — AI agricultural intelligence platform with blockchain-backed farm verification.",
    "• IDA — AI healthcare assistant with medicine info, pharmacy discovery, and blockchain marketplace infrastructure. (github.com/yab-g4u/IDA)",
    "• DataPilot — Explainable ML platform with SHAP-based explanations and FastAPI inference. (github.com/yab-g4u/DataPilot)",
  ]
  addProjects.forEach((p) => {
    const splitP = doc.splitTextToSize(p, contentWidth)
    doc.text(splitP, margin + 4, y)
    y += splitP.length * 9 + 1.2
  })
  y += 6

  // TECHNICAL SKILLS
  addSectionHeader("Technical Skills")
  doc.setFontSize(8)
  const skills = [
    { cat: "AI & Agentic Systems", items: "Agentic AI, Multi-Agent Systems, LLM Applications, RAG, LangChain, CrewAI, AI Agents, Embeddings" },
    { cat: "Computer Vision & ML", items: "Computer Vision, OpenCV, Machine Learning, Scikit-learn, SHAP, NLP" },
    { cat: "AI Infrastructure", items: "FastAPI, Python, FAISS, Sentence-Transformers, SQLite, PostgreSQL, FTS5, BM25, Vector Search, RRF" },
    { cat: "Software Engineering", items: "TypeScript, JavaScript, React, Next.js, Node.js, Django, REST APIs" },
    { cat: "Databases & Cloud", items: "PostgreSQL, SQLite, Supabase, Firebase" },
  ]
  skills.forEach((s) => {
    doc.setFont("helvetica", "bold")
    doc.text(s.cat, margin + 4, y)
    doc.setFont("helvetica", "normal")
    const catW = 120
    const itemsSplit = doc.splitTextToSize(s.items, contentWidth - catW)
    doc.text(itemsSplit, margin + 4 + catW, y)
    y += itemsSplit.length * 8.8 + 1
  })
  y += 6

  // ACHIEVEMENTS & EDUCATION
  addSectionHeader("Achievements & Education")
  doc.setFontSize(8)

  // 2-column layout for Achievements and Education
  const colW = contentWidth / 2
  let achY = y
  doc.setFont("helvetica", "bold")
  doc.text("Achievements", margin + 4, achY)
  achY += 9
  doc.setFont("helvetica", "normal")
  doc.text("• African Blockchain Championship — MedScope (2nd Place)", margin + 4, achY)
  achY += 9
  doc.text("• UniHack (Winner)", margin + 4, achY)
  achY += 9
  doc.text("• Hospitality Hackathon (Finalist)", margin + 4, achY)

  let eduY = y
  doc.setFont("helvetica", "bold")
  doc.text("Education", margin + colW + 10, eduY)
  eduY += 9
  doc.setFont("helvetica", "normal")
  doc.text("Addis Ababa Science and Technology University (AASTU)", margin + colW + 10, eduY)
  eduY += 9
  doc.setTextColor(90, 90, 90)
  doc.text("Expected June 2027", margin + colW + 10, eduY)
  doc.setTextColor(45, 45, 45)

  return doc
}

if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("generate-pdf")) {
  const doc = generateExactPDF()
  const outputDir = path.join(process.cwd(), "public", "cv")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const outputPath = path.join(outputDir, "YEABSERA-SISAY.pdf")
  const arrayBuffer = doc.output("arraybuffer")
  fs.writeFileSync(outputPath, Buffer.from(arrayBuffer))
  console.log("Generated clean PDF at:", outputPath)
}
