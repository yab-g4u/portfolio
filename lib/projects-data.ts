import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "omniq",
    number: "01",
    tag: "VOICE AI INFRASTRUCTURE",
    name: "Omniq",
    subtitle: "Voice AI infrastructure for feature-phone users without smartphones.",
    description:
      "Voice AI infrastructure that turns ordinary phone conversations into structured, auditable applications for people without smartphones.",
    problem:
      "Over 3 billion people rely on basic 2G feature phones or lack reliable high-speed internet, locking them out of modern digital applications, government services, and healthcare systems.",
    whatWasBuilt:
      "Built a low-latency telephony pipeline connecting standard cellular voice calls (PSTN/2G) directly to streaming speech-to-text, multilingual AI reasoning, and strict schema validation with auditable evidence grounding.",
    highlights: [
      "2G / PSTN Telephony",
      "Realtime Voice Pipeline",
      "IVR Call Orchestration",
      "Multilingual Speech AI",
      "Structured Extraction",
      "Evidence-Grounded Outputs",
    ],
    architectureSteps: [
      { step: "01", label: "PSTN / 2G Call", desc: "User dials standard toll-free or local phone number via cellular carrier" },
      { step: "02", label: "IVR Stream", desc: "Bi-directional audio stream handled with sub-250ms packet buffering" },
      { step: "03", label: "Streaming ASR", desc: "Speech-to-text decoding supporting regional dialects and noisy audio" },
      { step: "04", label: "AI Extraction", desc: "Schema-constrained extraction with deterministic JSON parsing" },
      { step: "05", label: "Evidence Audit", desc: "Every extracted field is mapped directly to source audio timestamps" },
      { step: "06", label: "Product Action", desc: "Triggers downstream SMS confirmations, database records, and workflows" },
    ],
    technicalDecisions: [
      {
        title: "Streaming Audio Chunks over Full Audio Buffers",
        reasoning:
          "Rather than waiting for the user to hang up, we stream 400ms audio chunks over WebSocket to reduce end-to-end processing latency to under 1.2s.",
      },
      {
        title: "Strict Pydantic Schema Validation with Fallback Extraction",
        reasoning:
          "Conversational phone speech has high ambiguity. Enforcing typed JSON schemas with automated retry loops prevents malformed state changes in downstream databases.",
      },
      {
        title: "Evidence Timestamp Attribution",
        reasoning:
          "Every structured parameter extracted by the AI maintains an exact millisecond audio offset so human auditors can verify decisions instantly.",
      },
    ],
    challenges: [
      {
        challenge: "Acoustic distortion and background noise on low-bitrate 2G cellular codecs.",
        solution: "Implemented pre-inference noise suppression filters and trained phonetic boundary detectors tailored to noisy AMR-NB codecs.",
      },
      {
        challenge: "Handling mid-call interruptions and turn-taking without UI cues.",
        solution: "Engineered voice-activity-detection (VAD) state machines that dynamically adjust silence thresholds based on ambient caller noise.",
      },
    ],
    outcome:
      "Demonstrated reliable voice-to-data extraction across live cellular phone calls, bridging complex web-grade workflows to basic button phones.",
    stackGroups: [
      { category: "Telephony & Audio", items: ["Twilio / Asterisk", "WebSockets", "VAD (Silero)", "FFmpeg"] },
      { category: "Intelligence", items: ["Whisper ASR", "FastAPI", "OpenAI / Claude", "Pydantic"] },
      { category: "Backend & Data", items: ["Python", "Redis Queue", "PostgreSQL", "Docker"] },
    ],
    tech: ["Python", "FastAPI", "WebSockets", "Whisper", "Twilio", "PostgreSQL", "Pydantic"],
    category: "featured",
    github: "https://github.com/yab-g4u/omniq.git",
    demo: "https://omniq-sigma.vercel.app/",
    metrics: {
      latency: "< 1.2s",
      efficiency: "99.4% Valid JSON",
    },
    features: [
      "2G & feature-phone accessibility without mobile data",
      "Real-time audio streaming over WebSockets",
      "Timestamped evidence grounding for zero hallucination audit trails",
      "Multi-dialect audio understanding",
      "Automated SMS dispatch and webhook triggers",
    ],
    isFeatured: true,
  },
  {
    id: "medscope",
    number: "02",
    tag: "MULTI-AGENT SYSTEMS",
    name: "Medscope",
    subtitle: "Multi-agent epidemic response & coordination platform.",
    description:
      "A simulation and coordination platform where specialized AI agents model policy, logistics, government response, and public sentiment during an outbreak.",
    problem:
      "Public health emergencies fail when response agencies operate in isolation. Human planners cannot rapidly simulate the cascading second-order effects of border closures, vaccine supply deficits, and public panic.",
    whatWasBuilt:
      "Architected a collaborative multi-agent simulation framework with CrewAI and blockchain auditability, where autonomous agents represent logistics chiefs, epidemiologists, policy advisors, and citizen cohorts.",
    highlights: [
      "Multi-Agent AI Coordination",
      "CrewAI Task Pipelines",
      "Epidemic Curve Simulation",
      "Resource Allocation Logistics",
      "Decentralized Accountability",
      "Policy Impact Scoring",
    ],
    architectureSteps: [
      { step: "01", label: "Outbreak Vectors", desc: "Ingests transmission rates, hospital capacities, and demographic data" },
      { step: "02", label: "Agent Dispatch", desc: "Specialized roles (Logistics, Clinical, Policy, Public Sentiment) initialize" },
      { step: "03", label: "Inter-Agent Debate", desc: "Agents exchange counter-arguments and simulate conflicting trade-offs" },
      { step: "04", label: "SEIR Modeling", desc: "Mathematical disease projection dynamically adjusted by simulated policies" },
      { step: "05", label: "Audit Ledger", desc: "Simulation inputs, agent decisions, and justifications logged immutably" },
    ],
    technicalDecisions: [
      {
        title: "Role-Decomposed Agents over Monolithic Prompts",
        reasoning:
          "A single prompt attempting to balance medical efficacy, economic trade-offs, and public morale inevitably hallucinated consensus. Decomposing into adversarial agent roles exposed genuine failure modes.",
      },
      {
        title: "Deterministic SEIR Differential Equations Coupled with Agent Heuristics",
        reasoning:
          "Rather than asking LLMs to guess infection curves, the mathematical modeling remained deterministic while agents adjusted transmission modifiers based on policy logic.",
      },
    ],
    challenges: [
      {
        challenge: "Agent coordination loops deadlocking in recursive circular debates.",
        solution: "Introduced a hierarchical Arbiter agent with strict convergence rounds and utility scoring constraints.",
      },
    ],
    outcome:
      "Awarded 2nd Place at the African Blockchain Championship for pioneering verifiable emergency coordination and policy simulation.",
    stackGroups: [
      { category: "Multi-Agent Core", items: ["Python", "CrewAI", "LangChain", "NetworkX"] },
      { category: "Simulation & Math", items: ["NumPy", "SciPy (SEIR models)", "Pandas"] },
      { category: "Interface & Ledger", items: ["React", "FastAPI", "Solidity / Web3", "Tailwind CSS"] },
    ],
    tech: ["Python", "CrewAI", "FastAPI", "React", "Web3", "SEIR Models"],
    category: "featured",
    github: "https://github.com/yab-g4u/medscop.git",
    demo: "https://medscop.vercel.app/",
    metrics: {
      accuracy: 94.2,
      efficiency: "2nd Place African Championship",
    },
    features: [
      "Autonomous agent debate and policy negotiation",
      "Interactive epidemic curve prediction with live variable adjustments",
      "Logistical resource allocation and supply chain bottleneck detection",
      "Cryptographic ledger recording for public response accountability",
    ],
    isFeatured: true,
  },
  {
    id: "atlas",
    number: "03",
    tag: "AI DEVELOPER INFRASTRUCTURE",
    name: "ATLAS",
    subtitle: "AI-powered developer portfolio & technical profiling infrastructure.",
    description:
      "A system that turns a developer's GitHub, professional profile, and project history into a structured, deployable portfolio.",
    problem:
      "Most developer portfolios are static, out-of-date templates that fail to convey actual systems engineering, architecture decisions, and code depth to technical recruiters.",
    whatWasBuilt:
      "Built an automated analysis engine that indexes public GitHub repositories, analyzes ASTs and commit histories, synthesizes technical case studies, and compiles them into high-performance web applications.",
    highlights: [
      "GitHub API AST Ingestion",
      "Architectural Synthesis",
      "Commit Vector Indexing",
      "Deterministic Case Study Generator",
      "Automated Next.js Deployment",
    ],
    architectureSteps: [
      { step: "01", label: "Repo Ingestion", desc: "Pulls repositories, dependency manifests, and architectural trees" },
      { step: "02", label: "AST Analysis", desc: "Analyzes code depth, API design, frameworks, and engineering patterns" },
      { step: "03", label: "Case Study Synth", desc: "Extracts real technical problems, decisions, and system boundaries" },
      { step: "04", label: "Code Generation", desc: "Outputs clean TypeScript components formatted with design system rules" },
      { step: "05", label: "Live Deployment", desc: "Compiles and deploys an interactive, responsive portfolio" },
    ],
    technicalDecisions: [
      {
        title: "AST-Driven Heuristics vs Shallow Readme Scraping",
        reasoning:
          "Readme files are frequently out of date. Parsing `package.json`, routes, and schema files provides ground truth on what an engineer actually shipped.",
      },
    ],
    challenges: [
      {
        challenge: "Rate limits and context window overflow across large mono-repos.",
        solution: "Constructed hierarchical summarization trees that filter out boilerplate and vendor files before LLM ingestion.",
      },
    ],
    outcome:
      "Automated the end-to-end transformation of raw codebases into structured, senior-level engineering case studies.",
    stackGroups: [
      { category: "Engine", items: ["TypeScript", "Node.js", "Octokit GitHub API", "Babel AST"] },
      { category: "AI & Synthesis", items: ["OpenAI API", "Structured Outputs", "Zod Validation"] },
      { category: "Frontend & Deploy", items: ["Next.js 15", "Tailwind CSS", "Vercel SDK"] },
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "GitHub API", "OpenAI", "Tailwind CSS"],
    category: "featured",
    github: "https://github.com/yab-g4u/attlas",
    demo: "https://attlas-nu.vercel.app/",
    metrics: {
      efficiency: "Sub-45s Full Extraction",
    },
    features: [
      "Automated GitHub codebase analysis and architecture mapping",
      "Elimination of generic marketing fluff in favor of technical case studies",
      "Direct code-to-metric attribution",
      "Responsive, accessible design system generation",
    ],
    isFeatured: true,
  },
  {
    id: "ida",
    number: "04",
    tag: "HEALTHCARE INTELLIGENCE",
    name: "IDA",
    subtitle: "AI-powered clinical prescription assistant & interaction monitor.",
    description:
      "An intelligent medical assistant featuring automated prescription parsing, drug-drug interaction detection, and real-time patient health monitoring.",
    problem:
      "Adverse drug events and contraindications remain one of the leading causes of preventable patient injury in resource-strained clinical environments.",
    whatWasBuilt:
      "Engineered an integrated diagnostic and prescription safety platform combining FastAPI microservices, clinical drug knowledge bases, and a responsive doctor portal.",
    highlights: [
      "UniHack 1st Place Winner",
      "Drug-Drug Interaction Engine",
      "Clinical Prescription Parsing",
      "Real-time Patient Vitals",
      "JWT Role-Based Auth",
      "RESTful Architecture",
    ],
    architectureSteps: [
      { step: "01", label: "Prescription Ingest", desc: "Doctor enters diagnosis, dosage, and active medical orders" },
      { step: "02", label: "Interaction Matrix", desc: "Evaluates active compounds against contraindication graph" },
      { step: "03", label: "Severity Scoring", desc: "Flags critical, moderate, and mild pharmacokinetic risks" },
      { step: "04", label: "Patient Sync", desc: "Updates patient profile and schedules automated dosage reminders" },
    ],
    technicalDecisions: [
      {
        title: "Deterministic Conflict Matrix with ML Advisory",
        reasoning:
          "Pharmacological contraindications cannot tolerate probabilistic hallucination. We separated hard deterministic contraindication databases from natural language advisory summarization.",
      },
    ],
    challenges: [
      {
        challenge: "Sub-second response time requirement during active physician consultations.",
        solution: "Indexed drug interaction graphs in memory and cached frequent compound pairings using Redis.",
      },
    ],
    outcome:
      "Awarded 1st Place at UniHack for practical impact, fast execution, and medical accuracy.",
    stackGroups: [
      { category: "Backend", items: ["Python", "FastAPI", "PostgreSQL", "Redis", "JWT"] },
      { category: "ML & Data", items: ["TensorFlow", "Scikit-Learn", "Medical Datasets"] },
      { category: "Frontend", items: ["React", "Tailwind CSS", "Recharts"] },
    ],
    tech: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL", "JWT"],
    category: "featured",
    github: "https://github.com/yab-g4u/IDA.git",
    demo: "https://ida-test.vercel.app/",
    metrics: {
      accuracy: 96.8,
      efficiency: "1st Place UniHack Winner",
    },
    features: [
      "Automated drug-drug conflict detection with severity tiers",
      "Patient health monitoring timeline and vital sign tracking",
      "Secure JWT role-based access for physicians and pharmacists",
      "Exportable clinical audit summaries",
    ],
    isFeatured: true,
  },
  {
    id: "datapilot",
    number: "05",
    tag: "FINANCIAL ML & EXPLAINABILITY",
    name: "DataPilot",
    subtitle: "Explainable machine learning dashboard for credit default prediction.",
    description:
      "A machine-learning workflow combining data processing, model training, SHAP-based feature explainability, and API-based inference for financial institutions.",
    problem:
      "Black-box credit scoring models introduce regulatory risk, bias, and compliance violations when financial institutions cannot explain why an applicant was denied.",
    whatWasBuilt:
      "Created an interactive ML platform that calculates loan default risk while computing local and global SHAP (SHapley Additive exPlanations) values to output human-readable, auditable factor reports.",
    highlights: [
      "SHAP Interpretability",
      "Credit Default Prediction",
      "FastAPI Inference API",
      "Compliance Audit Reports",
      "Interactive Feature What-Ifs",
    ],
    architectureSteps: [
      { step: "01", label: "Financial Data Pipeline", desc: "Cleans, normalizes, and balances historical loan portfolios" },
      { step: "02", label: "Ensemble Training", desc: "Trains XGBoost and Random Forest classifiers with cross-validation" },
      { step: "03", label: "SHAP Computation", desc: "Calculates marginal contribution of debt ratio, income, and history" },
      { step: "04", label: "Explainability UI", desc: "Renders interactive waterfall plots and force diagrams" },
      { step: "05", label: "Compliance Export", desc: "Generates regulatory audit package explaining approval decisions" },
    ],
    technicalDecisions: [
      {
        title: "TreeSHAP for Real-Time Local Attributions",
        reasoning:
          "Standard kernel SHAP was too slow for interactive web queries. TreeSHAP optimized evaluation time by over 40x on tree ensemble models.",
      },
    ],
    challenges: [
      {
        challenge: "Visualizing high-dimensional feature attributions for non-technical credit officers.",
        solution: "Designed simplified contribution breakdown bars that translate complex mathematical log-odds into dollar-impact thresholds.",
      },
    ],
    outcome:
      "Delivered a production-ready explainable AI workflow ready for microfinance and fintech regulatory audits.",
    stackGroups: [
      { category: "ML & Interpretability", items: ["Python", "SHAP", "XGBoost", "Scikit-Learn", "Pandas"] },
      { category: "Backend", items: ["FastAPI", "Uvicorn", "Pydantic"] },
      { category: "Dashboard", items: ["React", "Recharts", "Tailwind CSS"] },
    ],
    tech: ["Python", "SHAP", "FastAPI", "XGBoost", "React", "Recharts"],
    category: "featured",
    github: "https://github.com/yab-g4u/DataPilot.git",
    demo: "",
    metrics: {
      accuracy: 92.3,
      loss: 0.18,
      f1Score: 0.91,
    },
    features: [
      "SHAP waterfall plots explaining individual decision factors",
      "Global feature importance rankings across loan cohorts",
      "What-If simulator to test credit score sensitivity to income changes",
      "Automated compliance documentation export",
    ],
    isFeatured: true,
  },
  {
    id: "lyne-creatives",
    number: "06",
    tag: "DISTRIBUTED PLATFORM",
    name: "Lyne Creatives Platform",
    subtitle: "Enterprise architecture company web platform with microservices.",
    description:
      "Architected and developed the company platform as lead software engineer. Built 15+ microservices for architectural data processing, optimizing API performance and reducing processing time by 35%.",
    problem:
      "Heavy architectural media, rendering assets, and client project milestones suffered from slow load times and uncoordinated collaboration.",
    whatWasBuilt:
      "Engineered a high-performance Next.js and Python/FastAPI microservices platform featuring custom team workspace modules and asset pipelines.",
    highlights: [
      "15+ Microservices Architecture",
      "35% API Latency Reduction",
      "Team Collaboration Workspace",
      "PostgreSQL + Redis Caching",
    ],
    tech: ["Next.js", "Python", "FastAPI", "React", "PostgreSQL", "Redis"],
    category: "fullstack",
    github: "https://github.com/yab-g4u/lyne-creatives",
    demo: "https://lyne-creativess.vercel.app/",
    features: [
      "15+ microservices architecture",
      "Team workspace module",
      "35% performance improvement",
      "Real-time asset optimization",
    ],
    isFeatured: false,
  },
  {
    id: "breast-cancer",
    number: "07",
    tag: "COMPUTER VISION & ML",
    name: "Breast Cancer Classifier",
    subtitle: "Machine learning classifier for clinical diagnostic support.",
    description:
      "Advanced machine learning classifier for breast cancer detection using clinical diagnostic data, achieving 96.5% validation accuracy with comprehensive feature engineering.",
    problem:
      "Early cancer screening requires high sensitivity and low false-negative rates to effectively triage clinical biopsies.",
    whatWasBuilt:
      "Implemented a machine learning pipeline comparing Support Vector Machines, Random Forests, and Multi-Layer Perceptrons with automated hyperparameter tuning.",
    highlights: ["96.5% Accuracy", "Feature Correlation Analysis", "ROC/AUC Optimization"],
    tech: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    category: "ml",
    github: "https://github.com/yab-g4u/Breast-Cancer-Classifier.git",
    demo: "",
    metrics: {
      accuracy: 96.5,
      loss: 0.12,
      f1Score: 0.95,
    },
    features: [
      "Comparative ML algorithm benchmarking",
      "Feature importance ranking for clinical biomarkers",
      "High sensitivity tuning minimizing false negatives",
    ],
    isFeatured: false,
  },
  {
    id: "kuriftu",
    number: "08",
    tag: "SECURE API PLATFORM",
    name: "Kuriftu Loyalty Platform",
    subtitle: "Secure API platform for hospitality loyalty program — ALX Hackathon Finalist.",
    description:
      "Directed system architecture and secure API design for resort loyalty management, featuring OAuth2/JWT authentication and a real-time points ledger for Kuriftu Resort guests.",
    problem:
      "Hospitality rewards systems frequently suffer from race conditions in point redemptions and fragile POS integration.",
    whatWasBuilt:
      "Designed an ACID-compliant transactional ledger API with Redis idempotency keys and rate-limited endpoints.",
    highlights: ["Hospitality Hackathon Finalist", "OAuth2 / JWT Security", "Atomic Points Ledger"],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "JWT", "OAuth2"],
    category: "fullstack",
    github: "https://github.com/yab-g4u/alx-hospitality-hackathon.git",
    demo: "https://kuriftu-resort-app.vercel.app/",
    features: [
      "ACID transactional points ledger",
      "OAuth2 + JWT token rotation",
      "High-throughput caching with Redis",
      "ALX Hospitality Hackathon Finalist",
    ],
    isFeatured: false,
  },
  {
    id: "ai-doc-assistant",
    number: "09",
    tag: "RAG & VECTOR SEARCH",
    name: "LangChain AI PDF Assistant",
    subtitle: "Context-aware document parsing & retrieval system.",
    description:
      "Document intelligence assistant utilizing vector search and conversational memory to parse complex technical manuals and research papers.",
    problem:
      "Dense technical specifications and legal PDFs are difficult to query without losing contextual table and footnote relationships.",
    whatWasBuilt:
      "Implemented a chunking and hybrid retrieval pipeline combining semantic vector similarity with dense keyword re-ranking.",
    highlights: ["Vector Retrieval", "Context-Aware Memory", "Multi-LLM Routing"],
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "Vector DB"],
    category: "ml",
    github: "https://github.com/yab-g4u/ai-doc-assitant.git",
    demo: "",
    metrics: {
      accuracy: 91.5,
      loss: 0.22,
      f1Score: 0.9,
    },
    features: [
      "Semantic chunking preserving document hierarchy",
      "Citation attribution pointing to exact PDF page numbers",
      "Multi-model fallback routing",
    ],
    isFeatured: false,
  },
]

export const getFeaturedProjects = () => projects.filter((p) => p.isFeatured)
export const getAllProjects = () => projects
export const getProjectById = (id: string | number) =>
  projects.find((p) => String(p.id).toLowerCase() === String(id).toLowerCase())
