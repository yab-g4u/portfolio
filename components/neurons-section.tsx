"use client"

import { useState } from "react"
import { NeuralBackground } from "./neural-background"

const mlProjects = [
  {
    id: 1,
    name: "SENTIMENT_ANALYZER",
    description: "NLP model for real-time sentiment analysis with 94% accuracy",
    tech: ["PyTorch", "Transformers", "FastAPI"],
    metrics: {
      accuracy: 94.2,
      loss: 0.18,
      f1Score: 0.93,
    },
  },
  {
    id: 2,
    name: "IMAGE_CLASSIFIER",
    description: "CNN-based image classification system for medical diagnostics",
    tech: ["TensorFlow", "Keras", "OpenCV"],
    metrics: {
      accuracy: 96.8,
      loss: 0.12,
      f1Score: 0.96,
    },
  },
  {
    id: 3,
    name: "RECOMMENDER_ENGINE",
    description: "Collaborative filtering system processing 10M+ user interactions",
    tech: ["Scikit-learn", "Pandas", "Redis"],
    metrics: {
      accuracy: 91.5,
      loss: 0.24,
      f1Score: 0.9,
    },
  },
  {
    id: 4,
    name: "PREDICTIVE_ANALYTICS",
    description: "Time series forecasting for financial market trends",
    tech: ["Prophet", "XGBoost", "Numpy"],
    metrics: {
      accuracy: 88.3,
      loss: 0.31,
      f1Score: 0.87,
    },
  },
]

export function NeuronsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof mlProjects)[0] | null>(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden">
      <NeuralBackground opacity={0.1} nodeCount={35} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 02"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">MACHINE LEARNING</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl">
            Neural networks and AI systems that learn, adapt, and predict. From NLP to computer vision and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mlProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="border-2 border-white/40 bg-black/60 backdrop-blur-sm p-4 md:p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-75"
            >
              <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">
                [NODE_{String(project.id).padStart(2, "0")}]
              </div>
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-wide">{project.name}</div>
              <p className="text-xs md:text-sm text-white/70 mb-3 md:mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[8px] md:text-[10px] border border-white/40 px-2 py-1 tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {selectedProject && (
          <div className="mt-6 md:mt-8 border-2 border-white bg-black/90 backdrop-blur-sm p-4 md:p-8">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div>
                <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">[PERFORMANCE METRICS]</div>
                <div className="text-xl md:text-2xl font-bold">{selectedProject.name}</div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-2xl hover:text-white/60 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="border border-white/40 p-3 md:p-4 text-center">
                <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{selectedProject.metrics.accuracy}%</div>
                <div className="text-[8px] md:text-xs tracking-wider text-white/60">ACCURACY</div>
              </div>
              <div className="border border-white/40 p-3 md:p-4 text-center">
                <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{selectedProject.metrics.loss}</div>
                <div className="text-[8px] md:text-xs tracking-wider text-white/60">LOSS</div>
              </div>
              <div className="border border-white/40 p-3 md:p-4 text-center">
                <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{selectedProject.metrics.f1Score}</div>
                <div className="text-[8px] md:text-xs tracking-wider text-white/60">F1-SCORE</div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 text-xs md:text-sm text-white/70 leading-relaxed">
              {selectedProject.description}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
