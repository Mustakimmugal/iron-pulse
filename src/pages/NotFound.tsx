import { Link } from 'react-router-dom'
import { Page } from '../components/ui'
export default function NotFound() {
  return <Page title="Page not found"><section className="grid min-h-screen place-items-center px-5 text-center"><div><div className="display text-[9rem] text-pulse">404</div><p className="mb-6 text-white/60">That page doesn’t exist. Head back to the gym floor.</p><Link to="/" className="btn btn-red">Back to home</Link></div></section></Page>
}
