import { ClipboardList, Laptop2, IndianRupee, Briefcase } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const steps = [
  { icon: ClipboardList, step: '01', title: 'Register & Get Training', desc: 'Sign up, choose your domain, and dive straight into structured online training with live mentor sessions and hands-on coursework.', color: 'from-violet-500 to-indigo-500' },
  { icon: Laptop2, step: '02', title: 'Complete Your Internship', desc: 'Work on real-world industry projects assigned by MIVEXO mentors. Simulate a professional internship environment from day one.', color: 'from-indigo-500 to-blue-500' },
  { icon: IndianRupee, step: '03', title: 'Earn Your Stipend', desc: 'Top-performing interns are recognised with performance-based stipends and rewards upon successful project completion and evaluation.', color: 'from-blue-500 to-cyan-500' },
  { icon: Briefcase, step: '04', title: 'Land Your Placement', desc: 'Get placement support, resume reviews, mock interviews, and direct referrals to our hiring partner network across India.', color: 'from-emerald-500 to-teal-500' }
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white dark:bg-[#0B0B1A]">
      <div className="container-max">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3">Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Your Journey to
            <br /><span className="gradient-text">Career Success</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-violet-300 to-transparent dark:from-violet-800 z-0" />
                )}
                <div className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon size={32} className="text-white" />
                </div>
                <div className="text-xs font-black text-violet-400 mb-2">{step.step}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
