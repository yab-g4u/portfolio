"use client"

import React, { createContext, useContext, useState } from "react"
import { ResumeModal } from "@/components/resume-modal"

interface ResumeContextType {
  openResume: () => void
  closeResume: () => void
  isResumeOpen: boolean
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const openResume = () => setIsResumeOpen(true)
  const closeResume = () => setIsResumeOpen(false)

  return (
    <ResumeContext.Provider value={{ openResume, closeResume, isResumeOpen }}>
      {children}
      <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
