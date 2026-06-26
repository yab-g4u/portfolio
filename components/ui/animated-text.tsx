'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={`${className} relative`}>
      {characters.map((char, i) => (
        <CharacterAnimation key={i} character={char} progress={scrollYProgress} index={i} total={characters.length} />
      ))}
    </p>
  )
}

function CharacterAnimation({
  character,
  progress,
  index,
  total,
}: {
  character: string
  progress: any
  index: number
  total: number
}) {
  const opacity = useTransform(progress, [0, 1], [0.2, 1], {
    clamp: false,
  })

  const delay = index / total * 0.5

  return (
    <motion.span
      style={{ opacity }}
      initial={{ opacity: 0.2 }}
      className="inline"
    >
      {character === ' ' ? '\u00A0' : character}
    </motion.span>
  )
}
