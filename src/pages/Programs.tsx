import { motion } from 'framer-motion'
import { Page, Reveal, Head } from '../components/ui'
import { programs } from '../data'
export default function Programs() {
  return (
    <Page title="Programs">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36"><Head t="Programs" s="Every program is coached, tracked and adjusted every four weeks." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{programs.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * .07}><motion.article whileHover={{ y: -8 }} className="glass group h-full rounded-3xl p-7"><h2 className="display text-3xl group-hover:text-pulse">{t}</h2><p className="mt-3 text-white/60">{d}</p></motion.article></Reveal>
        ))}</div>
      </section>
    </Page>
  )
}
