import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: 1,
    name: "IDA",
    description: "AI-integrated medicine platform - UniHack Winner",
    longDescription:
      "Led the architecture and development of an AI-powered medicine platform featuring intelligent prescription management, drug interaction detection, and patient health monitoring. Built with Python/FastAPI backend and React frontend, processing real-time medical data with advanced ML algorithms.",
    tech: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL", "JWT"],
    category: "hybrid",
    github: "https://github.com/yab-g4u/IDA.git",
    demo: "https://ida-test.vercel.app/",
    features: [
      "AI-powered prescription management",
      "Drug interaction detection system",
      "Real-time patient monitoring",
      "Secure authentication with JWT",
      "RESTful API architecture",
    ],
  },
  {
    id: 2,
    name: "MediScope",
    description: "Blockchain healthcare platform - African Championship 2nd Place",
    longDescription:
      "Revolutionary blockchain-based healthcare platform combining AI policy prediction with transparent medical data management. Features decentralized funding analysis and policy simulation for healthcare systems across Africa.",
    tech: ["Python", "Blockchain", "AI/ML", "React", "Solidity", "Web3"],
    category: "hybrid",
    github: "https://github.com/yab-g4u/medscop.git",
    demo: "https://medscop.vercel.app/",
    features: [
      "Blockchain-based medical records",
      "AI policy simulation engine",
      "Decentralized funding analysis",
      "Smart contract integration",
      "Secure data encryption",
    ],
  },
  {
    id: 3,
    name: "Lyne Creatives Platform",
    description: "Company website with team workspace module",
    longDescription:
      "Architected and developed the entire company website serving as lead software engineer. Built 15+ microservices for complex architectural data processing, optimizing API performance and reducing client data processing time by 35%. Includes proprietary team workspace module enabling collaborative project management.",
    tech: ["Python", "FastAPI", "React", "Next.js", "PostgreSQL", "Redis"],
    category: "fullstack",
    github: "https://github.com/yab-g4u/lyne-creatives",
    demo: "https://lyne-creativess.vercel.app/",
    features: [
      "15+ microservices architecture",
      "Team workspace module",
      "35% performance improvement",
      "Real-time collaboration",
      "Advanced API optimization",
    ],
  },
  {
    id: 4,
    name: "Breast Cancer Classifier",
    description: "Machine learning model for cancer detection",
    longDescription:
      "Advanced machine learning classifier for breast cancer detection using medical imaging data. Implements multiple ML algorithms with feature engineering and model optimization for high accuracy rates in clinical diagnosis support.",
    tech: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    category: "ml",
    github: "https://github.com/yab-g4u/Breast-Cancer-Classifier.git",
    demo: "",
    metrics: {
      accuracy: 96.5,
      loss: 0.12,
      f1Score: 0.95,
    },
    features: ["Multiple ML algorithms", "Feature engineering", "High accuracy classification"],
  },
  {
    id: 5,
    name: "Kuriftu Loyalty Program",
    description: "Secure API platform for loyalty program - ALX Hospitality Hackathon",
    longDescription:
      "Directed system architecture and secure API design for resort loyalty program. Built scalable backend infrastructure with advanced security features, JWT authentication, and real-time points tracking system for Kuriftu Resort guests.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "JWT", "OAuth2"],
    category: "fullstack",
    github: "https://github.com/yab-g4u/alx-hospitality-hackathon.git",
    demo: "https://kuriftu-resort-app.vercel.app/",
    features: [
      "Secure API architecture",
      "OAuth2 authentication",
      "Real-time points tracking",
      "Scalable infrastructure",
      "Advanced security features",
    ],
  },
  {
    id: 6,
    name: "DataPilot",
    description: "ML dashboard for loan default prediction with SHAP interpretability",
    longDescription:
      "DataPilot for Finance is a web-based interactive machine learning dashboard tailored for financial institutions like microfinance organizations and fintech startups. It helps teams build auditable, explainable, and data-driven solutions for Loan Default Prediction, with built-in SHAP-based interpretability and compliance-friendly reporting.",
    tech: ["Python", "Machine Learning", "SHAP", "FastAPI", "React", "Finance"],
    category: "ml",
    github: "https://github.com/yab-g4u/DataPilot.git",
    demo: "",
    metrics: {
      accuracy: 92.3,
      loss: 0.18,
      f1Score: 0.91,
    },
    features: [
      "SHAP-based interpretability",
      "Loan default prediction",
      "Compliance-friendly reporting",
      "Interactive ML dashboard",
      "Financial data analysis",
    ],
  },
  {
    id: 7,
    name: "Computer Vision OCR",
    description: "Advanced OCR system with computer vision - In Development",
    longDescription:
      "Developing sophisticated optical character recognition system leveraging computer vision techniques. Processes complex document layouts with high accuracy, supporting multiple languages and handwriting recognition. Currently in active development phase.",
    tech: ["Python", "OpenCV", "TensorFlow", "Tesseract", "FastAPI"],
    category: "ml",
    github: "",
    demo: "",
    metrics: {
      accuracy: 94.0,
      loss: 0.15,
      f1Score: 0.93,
    },
    features: ["Multi-language support", "Handwriting recognition", "Complex layout processing"],
  },
  {
    id: 8,
    name: "LangChain AI PDF Assistant",
    description: "AI-powered document reader with conversational interface",
    longDescription:
      "Built intelligent PDF document assistant using LangChain principles. Features context-aware responses, advanced document parsing, and integration with multiple LLM models for enhanced natural language understanding and document analysis.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "Vector DB"],
    category: "ml",
    github: "https://github.com/yab-g4u/ai-doc-assitant.git",
    demo: "",
    metrics: {
      accuracy: 91.5,
      loss: 0.22,
      f1Score: 0.9,
    },
    features: ["Context-aware responses", "PDF document parsing", "Multi-LLM integration", "Vector search"],
  },
]

export const getProjectsByCategory = (category: "fullstack" | "ml" | "hybrid") => {
  return projects.filter((p) => p.category === category)
}

export const getAllProjects = () => projects
