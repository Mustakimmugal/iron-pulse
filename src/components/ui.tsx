import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, animate, useMotionValue, useSpring } from 'framer-motion'

export function Page({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => { document.title = `${title} | Iron Pulse Fitness` }, [title])
  return <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>{children}</motion.main>
}
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  return <motion.div className="inline-block" style={{ x: sx, y: sy }}
    onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .3); y.set((e.clientY - r.top - r.height / 2) * .3) }}
    onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null), inView = useInView(ref, { once: true }), [v, setV] = useState(0)
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: 1.8, onUpdate: (n) => setV(Math.round(n)) }); return () => c.stop() }, [inView, to])
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>
}
export function Head({ t, s }: { t: string; s?: string }) {
  return <Reveal className="mb-12 max-w-2xl"><h2 className="display text-5xl sm:text-6xl">{t}</h2>{s && <p className="mt-4 text-white/60">{s}</p>}</Reveal>
}
