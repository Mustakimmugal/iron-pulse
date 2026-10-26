import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { Page, Reveal, Magnetic, Counter, Head } from '../components/ui'
import Plans from '../components/Plans'
import { programs, faqs } from '../data'
const Dumbbell = lazy(() => import('../components/Dumbbell'))

function Hero() {
  const lines = ['Transform your body.', 'Transform your life.']
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24">
      <div className="absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-pulse/20 blur-[140px]" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-full opacity-70 md:w-3/5 md:opacity-100"><Suspense fallback={null}><Dumbbell /></Suspense></div>
      <div className="relative mx-auto w-full max-w-7xl">
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)]">
          {lines.map((l, i) => <span key={l} className="block overflow-hidden"><motion.span className={`block ${i ? 'text-pulse' : ''}`} initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: 1.2 + i * .15, ease: [.22, 1, .36, 1] }}>{l}</motion.span></span>)}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="mt-6 max-w-md text-lg text-white/65">Iron Pulse is a coach-led gym for strength, fat loss and performance. Your first session is free.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} className="mt-8 flex flex-wrap gap-3">
          <Magnetic><Link to="/contact" className="btn btn-red">Book free trial <ArrowUpRight size={16} /></Link></Magnetic>
          <Magnetic><Link to="/membership" className="btn btn-ghost">View memberships</Link></Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
function Stats() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-10 md:grid-cols-4">
      {[[2400, '+', 'Active members'], [18, '', 'Certified coaches'], [12000, ' sq ft', 'Training floor'], [94, '%', 'Hit their goal in 6 months']].map(([n, s, l]) => (
        <Reveal key={String(l)}><div className="glass rounded-3xl p-6"><div className="display text-5xl text-pulse"><Counter to={n as number} suffix={s as string} /></div><div className="mt-2 text-sm text-white/60">{l}</div></div></Reveal>
      ))}
    </section>
  )
}
function ProgramsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Head t="Programs built for results" s="Ten programs, one standard: every session is coached." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.slice(0, 4).map(([t, d], i) => (
          <Reveal key={t} delay={i * .07}><motion.div whileHover={{ y: -8 }} className="glass group h-full rounded-3xl p-6"><h3 className="display text-2xl group-hover:text-pulse">{t}</h3><p className="mt-3 text-sm text-white/60">{d}</p></motion.div></Reveal>
        ))}
      </div>
      <Link to="/programs" className="btn btn-ghost mt-8">See all 10 programs <ArrowUpRight size={16} /></Link>
    </section>
  )
}
function BMI() {
  const [h, setH] = useState(170), [w, setW] = useState(70)
  const bmi = w / ((h / 100) ** 2)
  const [cat, tip] = bmi < 18.5 ? ['Underweight', 'Focus on strength training and a small calorie surplus with plenty of protein.']
    : bmi < 25 ? ['Healthy range', 'Keep your routine: three strength sessions and two cardio sessions a week.']
    : bmi < 30 ? ['Overweight', 'Combine strength training with daily walking and a modest calorie deficit.']
    : ['Obese range', 'Start with low-impact cardio and coached strength work. Check in with your doctor too.']
  const pct = Math.min(100, Math.max(0, ((bmi - 12) / 28) * 100))
  const Slider = ({ label, v, set, min, max, unit }: { label: string; v: number; set: (n: number) => void; min: number; max: number; unit: string }) => (
    <label className="block"><div className="mb-2 flex justify-between text-sm"><span>{label}</span><b>{v} {unit}</b></div><input type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} className="w-full accent-[#ff2d2d]" /></label>
  )
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Head t="Know your starting point" s="Check your BMI. It’s a rough guide, so your coach will do a full assessment on day one." />
      <div className="glass grid gap-10 rounded-[2rem] p-8 md:grid-cols-2 md:p-12">
        <div className="space-y-8"><Slider label="Height" v={h} set={setH} min={120} max={220} unit="cm" /><Slider label="Weight" v={w} set={setW} min={30} max={200} unit="kg" /></div>
        <div>
          <div className="display text-7xl text-pulse">{bmi.toFixed(1)}</div><div className="mt-1 text-xl font-semibold">{cat}</div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-white/40 to-pulse" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} /></div>
          <p className="mt-5 text-white/65" aria-live="polite">{tip}</p>
        </div>
      </div>
    </section>
  )
}
function Transformation() {
  const [p, setP] = useState(50)
  return (
    <section className="mx-auto max-w-4xl px-5 py-24">
      <Head t="16 weeks. One decision." s="Drag to compare Arjun’s first week with his sixteenth." />
      <div className="glass relative aspect-[16/10] select-none overflow-hidden rounded-3xl">
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-zinc-700 to-zinc-900"><div className="text-center"><div className="display text-6xl">96 kg</div><div className="text-white/60">Week 1 · 31% body fat</div></div></div>
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-red-700 to-black" style={{ clipPath: `inset(0 0 0 ${p}%)` }}><div className="text-center"><div className="display text-6xl">78 kg</div><div className="text-white/70">Week 16 · 16% body fat</div></div></div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${p}%` }} />
        <input aria-label="Before and after slider" type="range" min={0} max={100} value={p} onChange={(e) => setP(+e.target.value)} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
    </section>
  )
}
function FAQ() {
  const [o, setO] = useState(0)
  return (
    <section className="mx-auto max-w-3xl px-5 py-24"><Head t="Questions" />
      <div className="space-y-3">{faqs.map(([q, a], i) => (
        <div key={q} className="glass rounded-2xl">
          <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between p-5 text-left font-semibold">{q}<motion.span animate={{ rotate: o === i ? 45 : 0 }}><Plus size={18} /></motion.span></button>
          <AnimatePresence initial={false}>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-5 text-sm text-white/65">{a}</motion.p>}</AnimatePresence>
        </div>))}</div>
    </section>
  )
}
export default function Home() {
  return (
    <Page title="Transform Your Body. Transform Your Life.">
      <Hero /><Stats /><ProgramsPreview /><BMI /><Transformation />
      <section className="mx-auto max-w-7xl px-5 py-24"><Head t="Pick your membership" s="No joining fee. Cancel any month." /><Plans /></section>
      <FAQ />
    </Page>
  )
}
