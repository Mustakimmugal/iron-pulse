import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { plans } from '../data'
import { Reveal } from './ui'

export default function Plans() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.1}>
          <motion.div whileHover={{ y: -8 }} className={`glass relative flex h-full flex-col rounded-3xl p-8 ${p.hot ? 'ring-2 ring-pulse' : ''}`}>
            {p.hot && <span className="btn-red absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-semibold">Most popular</span>}
            <h3 className="display text-3xl">{p.name}</h3>
            <p className="mt-1 text-sm text-white/55">{p.note}</p>
            <div className="mt-5"><span className="display text-6xl">₹{p.price.toLocaleString('en-IN')}</span><span className="text-white/50"> /month</span></div>
            <ul className="my-7 flex-1 space-y-3 text-sm">{p.feats.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-pulse" />{f}</li>)}</ul>
            <Link to={`/contact?plan=${p.name}`} className={`btn justify-center ${p.hot ? 'btn-red' : 'btn-ghost'}`}>Join {p.name}</Link>
          </motion.div>
        </Reveal>
      ))}
    </div>
  )
}
