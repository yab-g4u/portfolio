"use client"

import React from "react"

interface IconProps {
  className?: string
  size?: number
}

export function PythonIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.812v.825H3.882S0 5.79 0 11.905c0 6.114 3.393 5.9 3.393 5.9h2.025v-2.842s-.11-3.394 3.338-3.394h5.753v-.853h-5.753s-3.23.08-3.23-3.176c0-3.256 2.82-3.174 2.82-3.174h8.344s2.983-.02 2.983 2.9v.273H17.84v2.842h5.882S24 9.94 24 3.99C24-1.96 19.98 0 11.914 0zm-2.9 1.84a.972.972 0 1 1 0 1.944.972.972 0 0 1 0-1.944zm3.072 9.404v.852h5.753s3.23-.08 3.23 3.176c0 3.256-2.82 3.174-2.82 3.174H9.905s-2.983.02-2.983-2.9v-.273h5.834v-2.842H6.874S4.714 14.06 4.714 20.01C4.714 25.96 8.734 24 16.8 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.812v-.825h8.136S24 18.21 24 12.095c0-6.114-3.393-5.9-3.393-5.9h-2.025v2.842s.11 3.394-3.338 3.394h-5.753zm2.9 10.916a.972.972 0 1 1 0-1.944.972.972 0 0 1 0 1.944z" />
    </svg>
  )
}

export function ReactIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  )
}

export function NextjsIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.82 17.575l-6.84-9.983H9.25v8.835H7.75V6.425h2.83l7.07 10.32v-9.17h1.5v10h-1.33z" />
    </svg>
  )
}

export function FastApiIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.75 4.5l5.25 7.5h-4.5l2.25 7.5-6.75-9h4.5l-0.75-6z" />
    </svg>
  )
}

export function PostgresIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.76 0 5 1.79 5 4 0 1.25-.72 2.37-1.85 3.12-.4.27-.87.48-1.37.63v3.25h-3.56v-3.25c-.5-.15-.97-.36-1.37-.63C7.72 11.37 7 10.25 7 9c0-2.21 2.24-4 5-4z" />
    </svg>
  )
}

export function TypeScriptIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 0h24v24H0V0zm12.3 18.5c1.4 0 2.5-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.6 0-1.6-.5-2.8-1.5-3.6-.9-.8-2.1-1.3-3.6-1.5-.9-.1-1.6-.3-2-.6-.4-.3-.6-.7-.6-1.2 0-.5.2-.9.7-1.2.5-.3 1.1-.4 1.9-.4 1.4 0 2.4.5 3 1.5l1.6-1.2c-.5-.8-1.2-1.4-2-1.8-.8-.4-1.8-.6-2.9-.6-1.4 0-2.5.4-3.3 1.2-.8.8-1.2 1.9-1.2 3.1 0 1.5.5 2.6 1.4 3.4.9.8 2.1 1.2 3.6 1.4.9.1 1.6.3 2 .6.4.3.6.8.6 1.3 0 .6-.2 1-.7 1.3-.5.3-1.2.5-2 .5-1.6 0-2.8-.6-3.6-1.8l-1.6 1.2c.6 1 1.5 1.8 2.6 2.3 1.2.5 2.5.7 3.9.7zm-6.8-1.5V9.4H1.8V7.5h8.9v1.9H7.2V17h-1.7z" />
    </svg>
  )
}

export function DockerIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.5 10.5c-.3-.2-1.5-.3-2.3.2-.2-.8-.8-1.5-1.7-1.9l-.5-.2-.3.5c-.4.8-.5 1.7-.3 2.5-.8.5-2.2.5-3.3.4h-.1V9.5h2.5V7h-2.5V4.5H12V7h-2.5v2.5H7V7H4.5v2.5H2V12c0 2.2 1.3 4.1 3.2 5.1 2.3 1.2 5.3 1.4 7.8 1.4 4.5 0 8.2-2.1 9.5-6.2.6-.1 1.4-.6 1.8-1.3-.4-.2-1.1-.4-1.8-.5zm-15.5 1h-2v-2h2v2zm2.5 0h-2v-2h2v2zm2.5 0h-2v-2h2v2zm2.5 0h-2v-2h2v2zm2.5 0h-2v-2h2v2z" />
    </svg>
  )
}

export function LangChainIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5l7 0M7.5 8.5l3.5 7M16.5 8.5l-3.5 7" />
    </svg>
  )
}

export function PyTorchIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.7 0a9.6 9.6 0 0 0-3.8.8l1.6 1.6a7.4 7.4 0 0 1 2.2-.4c4.3 0 7.8 3.5 7.8 7.8a7.7 7.7 0 0 1-4.7 7.1l1.1 2.6A10.5 10.5 0 0 0 23.2 9.8C23.2 4.4 18.5 0 12.7 0zm-2.9 3.5a10.4 10.4 0 0 0-9 10.4c0 5.4 4.7 9.8 10.5 9.8a9.6 9.6 0 0 0 3.8-.8l-1.6-1.6a7.4 7.4 0 0 1-2.2.4c-4.3 0-7.8-3.5-7.8-7.8 0-3.3 2-6.1 4.7-7.1L7.1 4.2a10.2 10.2 0 0 0-2.7 1.9L9.8 3.5zM14.5 9.2a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0z" />
    </svg>
  )
}

export function SqliteIcon({ className = "w-3.5 h-3.5", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

export function GitHubBrandIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

export function LinkedInBrandIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.4a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.83 6.4z" />
    </svg>
  )
}
