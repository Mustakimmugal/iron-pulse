import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import Lenis from 'lenis'
import { Menu, X, MessageCircle, ArrowUp } from 'lucide-react'
import { SITE, WA } from './data'

const Home = lazy(() => import('./pages/Home'))
const Programs = lazy(() => import('./pages/Programs'))
const Membership = lazy(() => import('./pages/Membership'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
declare global { interface Window { lenis?: Lenis | null } }

const links: [string, string][] = [['/programs', 'Programs'], ['/membership', 'Membership'], ['/contact', 'Contact']]

function Loader() {
  return <motion.div className="fixed inset-0 z-[200] grid place-items-center bg-black" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }}>
    <div className="text-center"><div className="display text-6xl">Iron <span className="text-pulse">Pulse</span></div>
      <motion.div className="mx-auto mt-4 h-0.5 bg-pulse" initial={{ width: 0 }} animate={{ width: 160 }} transition={{ duration: 1.1 }} /></div>
  </motion.div>
}
function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100), sx = useSpring(x, { stiffness: 450, damping: 35 }), sy = useSpring(y, { stiffness: 450, damping: 35 })
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setOn(true); document.body.classList.add('cur')
    const m = (e: MouseEvent) => { x.set(e.clientX - 10); y.set(e.clientY - 10) }
    window.addEventListener('mousemove', m)
    return () => { window.removeEventListener('mousemove', m); document.body.classList.remove('cur') }
  }, [x, y])
  return on ? <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] h-5 w-5 rounded-full border-2 border-pulse mix-blend-difference" /> : null
}
function Nav() {
  const [open, setOpen] = useState(false), { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const cls = ({ isActive }: { isActive: boolean }) => `transition ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
    <nav aria-label="Main" className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3">
      <Link to="/" className="display text-xl">Iron <span className="text-pulse">Pulse</span></Link>
      <div className="hidden gap-8 text-sm md:flex">{links.map(([to, l]) => <NavLink key={to} to={to} className={cls}>{l}</NavLink>)}</div>
      <div className="flex items-center gap-3"><Link to="/contact" className="btn btn-red hidden !py-2 sm:inline-flex">Free trial</Link>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </nav>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass mx-auto mt-2 flex max-w-7xl flex-col gap-4 rounded-3xl p-6 md:hidden">
      {links.map(([to, l]) => <NavLink key={to} to={to} className={cls}>{l}</NavLink>)}</motion.div>}</AnimatePresence>
  </header>
}
function Footer() {
  const [ok, setOk] = useState(false)
  return <footer className="border-t border-white/10 px-5 py-14"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
    <div><div className="display text-3xl">Iron <span className="text-pulse">Pulse</span></div><p className="mt-3 max-w-xs text-sm text-white/55">Transform your body. Transform your life.</p></div>
    <div className="flex flex-col gap-2 text-sm text-white/65">{links.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}<a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
    <form onSubmit={(e) => { e.preventDefault(); setOk(true) }} className="text-sm"><label htmlFor="nl" className="mb-2 block font-semibold">Weekly training tips</label>
      {ok ? <p role="status" className="text-white/65">You’re subscribed. See you Monday.</p> : <div className="flex gap-2"><input id="nl" required type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-pulse" /><button className="btn btn-red !py-2.5">Join</button></div>}</form>
  </div><p className="mx-auto mt-10 max-w-7xl text-xs text-white/40">© {new Date().getFullYear()} Iron Pulse Fitness. All rights reserved.</p></footer>
}
function Floating() {
  const [show, setShow] = useState(false)
  useEffect(() => { const s = () => setShow(window.scrollY > 600); window.addEventListener('scroll', s, { passive: true }); return () => window.removeEventListener('scroll', s) }, [])
  return <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
    <AnimatePresence>{show && <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} aria-label="Back to top" onClick={() => window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0 })} className="glass grid h-12 w-12 place-items-center rounded-full"><ArrowUp size={18} /></motion.button>}</AnimatePresence>
    <a aria-label="Chat on WhatsApp" href={WA()} target="_blank" rel="noopener noreferrer" className="btn-red grid h-12 w-12 place-items-center rounded-full"><MessageCircle size={20} /></a></div>
}
function Shell() {
  const { pathname } = useLocation()
  useEffect(() => { window.lenis ? window.lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0) }, [pathname])
  return <><Nav /><Suspense fallback={<div className="min-h-screen" />}><Routes>
    <Route path="/" element={<Home />} /><Route path="/programs" element={<Programs />} /><Route path="/membership" element={<Membership />} />
    <Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></Suspense><Footer /><Floating /></>
}
export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('ip-seen'))
  const { scrollYProgress } = useScroll(), prog = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => { if (!loading) return; const t = setTimeout(() => { setLoading(false); sessionStorage.setItem('ip-seen', '1') }, 1400); return () => clearTimeout(t) }, [loading])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ lerp: .09 }); window.lenis = l; let id = 0
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy(); window.lenis = null }
  }, [])
  return <BrowserRouter>
    <AnimatePresence>{loading && <Loader />}</AnimatePresence>
    <motion.div style={{ scaleX: prog }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-pulse" />
    <Cursor /><Shell />
  </BrowserRouter>
}
