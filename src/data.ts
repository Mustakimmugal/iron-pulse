// Edit contact details before launch.
export const SITE = { phone: '+91 99999 99999', whatsapp: '919999999999', email: 'join@ironpulsefitness.in', instagram: 'https://instagram.com/ironpulsefitness', address: 'Iron Pulse Fitness, Jaipur, Rajasthan' }
export const WA = (t = 'Hi Iron Pulse, I want to book a free trial.') => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t)}`
export const programs = [
  ['Strength Training', 'Progressive barbell and dumbbell programming that builds real, measurable strength.'],
  ['Fat Loss', 'Calorie-smart training and nutrition coaching with weekly body-composition check-ins.'],
  ['Bodybuilding', 'Hypertrophy splits, posing practice and contest-prep guidance.'],
  ['Powerlifting', 'Squat, bench and deadlift coaching on a competition-spec platform.'],
  ['CrossFit', 'Daily WODs, Olympic lifting and gymnastics in small coached groups.'],
  ['Cardio', 'Zone-based running, rowing and bike sessions for heart health and endurance.'],
  ['HIIT', 'Forty-minute high-intensity circuits that keep burning calories after you leave.'],
  ['Yoga', 'Mobility, breath work and recovery classes for lifters and athletes.'],
  ['Personal Training', 'One-to-one coaching with a custom plan built around your goal and schedule.'],
  ['Women Fitness', 'Strength and conditioning classes in a supportive, women-first environment.']
]
export const plans = [
  { name: 'Starter', price: 1499, note: 'Open gym access', feats: ['Gym floor 6am–10pm', 'Locker + shower', 'Fitness assessment', 'App workout library'] },
  { name: 'Pro', price: 2999, note: 'Classes and coaching', feats: ['Everything in Starter', 'Unlimited group classes', 'Monthly body scan', 'Nutrition guide', '2 guest passes'], hot: true },
  { name: 'Elite', price: 5499, note: 'Full personal coaching', feats: ['Everything in Pro', '12 personal training sessions', 'Custom diet plan', 'Priority booking', 'Recovery room access'] }
]
export const compare: [string, boolean, boolean, boolean][] = [
  ['Gym floor access', true, true, true], ['Group classes', false, true, true], ['Body scan', false, true, true],
  ['Personal training', false, false, true], ['Custom diet plan', false, false, true], ['Recovery room', false, false, true]
]
export const faqs = [
  ['Can I try before I join?', 'Yes. Book a free trial session and a coach will walk you through the gym and a first workout.'],
  ['I’m a complete beginner. Is that okay?', 'Absolutely. Every member starts with an assessment, and your coach builds a plan for your level.'],
  ['Can I freeze my membership?', 'Pro and Elite members can pause for up to 30 days per year for travel or injury.'],
  ['What are the gym timings?', 'We’re open 6am to 10pm Monday to Saturday, and 7am to 1pm on Sundays.']
]
