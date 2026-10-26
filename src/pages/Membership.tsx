import { Check, Minus } from 'lucide-react'
import { Page, Head } from '../components/ui'
import Plans from '../components/Plans'
import { compare } from '../data'
export default function Membership() {
  return (
    <Page title="Membership">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36"><Head t="Membership" s="Three plans. No joining fee. Cancel any month." /><Plans />
        <div className="glass mt-16 overflow-x-auto rounded-3xl"><table className="w-full min-w-[480px] text-left text-sm">
          <thead><tr className="border-b border-white/10">{['Feature', 'Starter', 'Pro', 'Elite'].map((h) => <th key={h} className="p-5 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{compare.map(([f, ...v]) => <tr key={f} className="border-b border-white/5"><td className="p-5">{f}</td>{v.map((x, i) => <td key={i} className="p-5">{x ? <Check size={18} className="text-pulse" aria-label="Included" /> : <Minus size={18} className="text-white/30" aria-label="Not included" />}</td>)}</tr>)}</tbody>
        </table></div>
      </section>
    </Page>
  )
}
