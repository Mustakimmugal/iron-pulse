import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MessageCircle, Instagram, MapPin, Check } from 'lucide-react'
import { Page, Head } from '../components/ui'
import { SITE, WA } from '../data'

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a 10-digit Indian mobile number'),
  goal: z.enum(['Book free trial', 'Join membership', 'Schedule training']),
  message: z.string().max(300, 'Keep it under 300 characters').optional()
})
type Form = z.infer<typeof schema>

export default function Contact() {
  const [params] = useSearchParams(), plan = params.get('plan')
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { goal: plan ? 'Join membership' : 'Book free trial', message: plan ? `I'm interested in the ${plan} plan.` : '' } })
  const onSubmit = (d: Form) => {
    window.open(WA(`Hi Iron Pulse, I'm ${d.name} (${d.phone}). ${d.goal}. ${d.message ?? ''}`), '_blank', 'noopener')
    setDone(true)
  }
  const field = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-pulse'
  const Err = ({ m }: { m?: string }) => m ? <p role="alert" className="mt-1 text-xs text-pulse">{m}</p> : null
  return (
    <Page title="Contact">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-36 md:grid-cols-2">
        <div><Head t="Start this week" s="Tell us your goal. A coach will call you within one working day." />
          <ul className="space-y-4 text-sm">
            <li><a className="flex items-center gap-3" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><Phone size={18} className="text-pulse" />{SITE.phone}</a></li>
            <li><a className="flex items-center gap-3" href={`mailto:${SITE.email}`}><Mail size={18} className="text-pulse" />{SITE.email}</a></li>
            <li><a className="flex items-center gap-3" href={WA()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} className="text-pulse" />WhatsApp us</a></li>
            <li><a className="flex items-center gap-3" href={SITE.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} className="text-pulse" />@ironpulsefitness</a></li>
            <li className="flex items-center gap-3"><MapPin size={18} className="text-pulse" />{SITE.address}</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass space-y-4 rounded-3xl p-8">
          {done ? <p className="flex items-center gap-2 text-lg" role="status"><Check className="text-pulse" />Thanks. Finish sending your message in WhatsApp and we’ll call you back.</p> : <>
            <div><input aria-label="Name" placeholder="Your name" className={field} {...register('name')} /><Err m={errors.name?.message} /></div>
            <div><input aria-label="Phone" inputMode="numeric" placeholder="Mobile number" className={field} {...register('phone')} /><Err m={errors.phone?.message} /></div>
            <select aria-label="I want to" className={field} {...register('goal')}>{['Book free trial', 'Join membership', 'Schedule training'].map((o) => <option key={o} className="text-black">{o}</option>)}</select>
            <div><textarea aria-label="Message" rows={4} placeholder="Your goal, in a sentence" className={field} {...register('message')} /><Err m={errors.message?.message} /></div>
            <button disabled={isSubmitting} className="btn btn-red w-full justify-center">Send request</button></>}
        </form>
      </section>
    </Page>
  )
}
