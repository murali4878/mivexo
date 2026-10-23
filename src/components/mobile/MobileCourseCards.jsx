import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Laptop2,
  Brain,
  BarChart3,
  Cloud,
  ShieldCheck,
  Smartphone,
  BookOpen,
  Award,
  Users
} from 'lucide-react'
import MobileSyllabusModal from './MobileSyllabusModal'

const courses = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    desc: 'Build modern web apps with real-world projects.',
    category: 'development',
    duration: '3-6 Months',
    level: 'Beginner',
    popular: true,
    enrolled: 420,
    rating: 4.9,
    tag: 'Trending #1',
    icon: Laptop2,
    iconBg: 'from-blue-600 to-indigo-600',
    description: 'Master full-stack engineering. Build high-concurrency microservices, modern responsive SPAs, and production cloud APIs.',
    prerequisites: 'Basic HTML/CSS and core programming fundamentals.',
    capstone: 'Build and deploy a multi-tenant SaaS workspace with real-time WebSockets and Stripe/Razorpay billing.',
    skills: ['React 18', 'Next.js 14', 'Node.js', 'MongoDB', 'Tailwind', 'Docker'],
    modules: [
      { week: 'Weeks 1-3', title: 'Modern React & Next.js 14 Architecture', topics: ['Server Components & Client State', 'React Hooks deep dive (useMemo, useCallback)', 'Dynamic routing & SSR/SSG caching', 'Responsive design with Tailwind CSS'] },
      { week: 'Weeks 4-6', title: 'Backend APIs with Node.js & Express', topics: ['Asynchronous event loop & streaming', 'RESTful & GraphQL API design', 'JWT authentication & role authorization', 'Rate-limiting & security headers'] },
      { week: 'Weeks 7-9', title: 'Database Design & Optimization', topics: ['MongoDB aggregation pipelines', 'PostgreSQL schema modeling & relations', 'Redis caching layer', 'Database indexing & transactions'] },
      { week: 'Weeks 10-12', title: 'DevOps, Capstone & Mock Interviews', topics: ['Docker multi-stage builds', 'GitHub Actions CI/CD pipelines', 'Deployment to AWS/Render', 'Technical interview prep & code review'] }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    desc: 'Learn AI concepts and build practical models.',
    category: 'ai',
    duration: '3-6 Months',
    level: 'Intermediate',
    popular: false,
    enrolled: 380,
    rating: 4.9,
    tag: 'Hot Track',
    icon: Brain,
    iconBg: 'from-purple-600 to-fuchsia-600',
    description: 'From deep neural networks and vision systems to generative AI, transformer architectures, and enterprise RAG pipelines.',
    prerequisites: 'Python programming and fundamental linear algebra.',
    capstone: 'Enterprise RAG question-answering system with vector search database (Pinecone/Chroma) and custom LLM prompt pipeline.',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'Transformers', 'LangChain', 'RAG'],
    modules: [
      { week: 'Weeks 1-4', title: 'Neural Networks & PyTorch Fundamentals', topics: ['Perceptrons, backprop & autograd', 'Optimizers (AdamW, SGD) & loss functions', 'PyTorch tensor operations', 'Regularization & Dropout'] },
      { week: 'Weeks 5-8', title: 'Computer Vision & Convolutional Nets', topics: ['CNN architectures (ResNet, EfficientNet)', 'Transfer learning with pre-trained weights', 'Object detection with YOLO', 'Image augmentation techniques'] },
      { week: 'Weeks 9-12', title: 'NLP, Attention & Transformers', topics: ['Tokenization & Word Embeddings', 'Transformer attention heads', 'HuggingFace ecosystem & BERT', 'Fine-tuning models on domain text'] },
      { week: 'Weeks 13-16', title: 'Generative AI & LLM Systems', topics: ['Retrieval Augmented Generation (RAG)', 'Vector DBs (Chroma, Pinecone)', 'LangChain & LlamaIndex frameworks', 'AI deployment & latency benchmarking'] }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    desc: 'Analyze data and gain valuable insights.',
    category: 'data',
    duration: '2-4 Months',
    level: 'Beginner',
    popular: false,
    enrolled: 310,
    rating: 4.8,
    tag: 'High Placement',
    icon: BarChart3,
    iconBg: 'from-emerald-500 to-teal-600',
    description: 'Transform complex raw data into predictive intelligence and statistical decision models with Python, SQL, and Power BI.',
    prerequisites: 'Basic math and logical thinking.',
    capstone: 'End-to-end customer lifetime value & churn prediction system deployed with interactive Streamlit app.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Statistics', 'Power BI'],
    modules: [
      { week: 'Weeks 1-4', title: 'Data Cleaning & Advanced SQL', topics: ['Pandas dataframes & vectorization', 'Complex SQL joins, CTEs, and Window functions', 'Data imputation & anomaly handling', 'Seaborn & Plotly interactive visual storytelling'] },
      { week: 'Weeks 5-8', title: 'Inferential Statistics & EDA', topics: ['Hypothesis testing (p-values, Z/T tests)', 'ANOVA & Chi-square distributions', 'Feature correlation & multicollinearity', 'Principal Component Analysis (PCA)'] },
      { week: 'Weeks 9-12', title: 'Predictive Machine Learning', topics: ['Linear & Logistic Regression', 'Decision Trees, Random Forests, XGBoost', 'Model evaluation (ROC-AUC, F1-Score)', 'Hyperparameter tuning with Optuna'] },
      { week: 'Weeks 13-16', title: 'Production Deployment & Projects', topics: ['Streamlit/Gradio web dashboard', 'Deploying models as REST inference endpoints', 'Model drift monitoring', 'Industry mock interview rounds'] }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    desc: 'Learn cloud tools and modern DevOps practices.',
    category: 'cloud',
    duration: '3-6 Months',
    level: 'Intermediate',
    popular: false,
    enrolled: 290,
    rating: 4.8,
    tag: 'Enterprise Need',
    icon: Cloud,
    iconBg: 'from-cyan-500 to-blue-600',
    description: 'Master enterprise cloud infrastructure. Deploy containerized microservices, build zero-downtime CI/CD pipelines, and write IaC.',
    prerequisites: 'Basic command line & general programming concepts.',
    capstone: 'Automated multi-region Kubernetes cluster deployment managed via Terraform and GitHub Actions.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Linux'],
    modules: [
      { week: 'Weeks 1-3', title: 'Linux Systems & AWS Cloud Architecture', topics: ['Bash scripting & Linux system internals', 'AWS VPC, EC2, S3, IAM, and Security Groups', 'Cloud networking & DNS routing with Route53', 'Cost budgeting & autoscaling'] },
      { week: 'Weeks 4-6', title: 'Docker Containerization & Microservices', topics: ['Dockerfiles & multi-stage image optimization', 'Docker Compose multi-container networks', 'Volume persistence & configuration binds', 'Security scanning with Trivy'] },
      { week: 'Weeks 7-9', title: 'Kubernetes Orchestration & Helm', topics: ['Pods, Deployments, Services, and Ingress', 'ConfigMaps & Secrets management', 'Persistent Volume Claims (PVC)', 'Packaging charts with Helm'] },
      { week: 'Weeks 10-12', title: 'Infrastructure as Code (Terraform) & Monitoring', topics: ['Terraform state management & modules', 'GitHub Actions automated testing & deployment', 'Prometheus & Grafana telemetry', 'DevOps interview case questions'] }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cyber Security',
    desc: 'Learn security fundamentals and hands-on tools.',
    category: 'cloud',
    duration: '3-6 Months',
    level: 'Beginner',
    popular: false,
    enrolled: 240,
    rating: 4.7,
    tag: 'Critical Skill',
    icon: ShieldCheck,
    iconBg: 'from-red-500 to-rose-600',
    description: 'Learn offensive and defensive security tactics. Conduct vulnerability assessments, exploit web vulnerabilities, and secure enterprise networks.',
    prerequisites: 'Basic networking and operating system fundamentals.',
    capstone: 'Comprehensive penetration testing report and vulnerability remediation playbook on a simulated banking system.',
    skills: ['Network Security', 'OWASP Top 10', 'Penetration Testing', 'Kali Linux', 'Burp Suite'],
    modules: [
      { week: 'Weeks 1-3', title: 'Network Defense & Protocol Analysis', topics: ['TCP/IP stack, Wireshark packet capture', 'Firewalls, IDS/IPS configuration', 'Reconnaissance using Nmap and Shodan', 'Linux security hardening'] },
      { week: 'Weeks 4-6', title: 'Web Application Security (OWASP)', topics: ['SQL Injection & Blind SQLi attacks', 'Cross-Site Scripting (XSS) & CSRF', 'Broken Authentication & Access Control', 'Burp Suite proxy manipulation'] },
      { week: 'Weeks 7-9', title: 'Exploitation & Privilege Escalation', topics: ['Metasploit framework & payload crafting', 'Linux & Windows privilege escalation', 'Credential harvesting & password cracking', 'Wireless penetration testing'] },
      { week: 'Weeks 10-12', title: 'Security Auditing & Certifications', topics: ['Writing professional pentest reports', 'SOC analysis & log triage with SIEM', 'Compliance (ISO 27001, SOC 2)', 'Cybersecurity interview simulations'] }
    ]
  },
  {
    id: 'app-dev',
    title: 'App Development',
    desc: 'Build Android & iOS apps with real-world projects.',
    category: 'development',
    duration: '3-6 Months',
    level: 'Beginner',
    popular: false,
    enrolled: 210,
    rating: 4.8,
    tag: 'Cross-Platform',
    icon: Smartphone,
    iconBg: 'from-violet-500 to-purple-600',
    description: 'Build native iOS and Android apps with a single modern codebase. Connect cloud databases, push notifications, and payment gateways.',
    prerequisites: 'Basic JavaScript or Dart understanding.',
    capstone: 'Deploy an on-demand food delivery or ride-booking mobile app to TestFlight / Google Play Console.',
    skills: ['React Native', 'Flutter', 'Dart', 'Expo', 'Firebase', 'State Management'],
    modules: [
      { week: 'Weeks 1-3', title: 'Mobile Frameworks & Navigation', topics: ['React Native & Expo ecosystem', 'Flexbox layout for mobile screens', 'Native navigation (tabs, stacks, drawers)', 'Device permissions & storage'] },
      { week: 'Weeks 4-6', title: 'State, APIs & Offline Caching', topics: ['Global state with Redux Toolkit / Zustand', 'Async data fetching & offline caching', 'Local SQLite and Realm databases', 'Geolocation & camera hardware integration'] },
      { week: 'Weeks 7-9', title: 'Backend & Push Notifications', topics: ['Firebase Authentication & Firestore', 'OneSignal & FCM push notifications', 'In-app purchases & UPI payment integration', 'Animations with React Native Reanimated'] },
      { week: 'Weeks 10-12', title: 'App Store Deployment & Performance', topics: ['Building production APK and iOS ipa bundles', 'App performance profiling and memory leaks', 'Publishing to Play Store & App Store', 'Mobile developer interview prep'] }
    ]
  }
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'data', label: 'Data' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'ai', label: 'AI' }
]

const whyChooseFeatures = [
  {
    title: 'Industry-Relevant Curriculum',
    desc: 'Updated for 2026 tech stacks',
    icon: BookOpen,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/60'
  },
  {
    title: 'Hands-on Live Projects',
    desc: 'Real enterprise production code',
    icon: Laptop2,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60'
  },
  {
    title: 'Certification & Recognition',
    desc: 'Tamper-proof QR-verified credential',
    icon: Award,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/60'
  },
  {
    title: 'Career Guidance & Mentorship',
    desc: '1-on-1 reviews with MNC mentors',
    icon: Users,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/60'
  }
]

export default function MobileCourseCards() {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const filtered =
    activeTab === 'all'
      ? courses
      : courses.filter((c) => c.category === activeTab)

  return (
    <section className="py-10 px-4 bg-slate-50 dark:bg-[#091124] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-md mx-auto">
        {/* ── Popular Programs Horizontal Preview (Matches Screen 1) ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Popular Programs
            </h3>
            <Link
              to="/programs"
              className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div
            onClick={() => setSelectedCourse(courses[0])}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Laptop2 size={22} />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  Full Stack Development
                </h4>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Web Development
                </p>
                <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500">
                  3-6 M | Beginner to Advanced
                </span>
              </div>
            </div>
            <span className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-violet-600 dark:group-hover:bg-violet-400 dark:group-hover:text-white transition-colors">
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-violet-600 dark:text-violet-400 uppercase block mb-1.5">
            EXPLORE PROGRAMS
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Learn In-Demand <br />
            Skills with MIVEXO
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Choose from industry-focused programs designed to make you job-ready.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 mb-6 overflow-x-auto scrollbar-hide py-1">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* 2-Column Course Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {filtered.map((course, idx) => {
            const Icon = course.icon
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.05
                }}
                onClick={() => setSelectedCourse(course)}
                className="group relative flex flex-col justify-between h-full p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all text-left cursor-pointer"
              >
                {/* Top: Icon + Optional Popular Badge */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.iconBg} text-white flex items-center justify-center shadow-xs`}
                    >
                      <Icon size={20} />
                    </div>

                    {course.popular && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xs font-black text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Short Desc */}
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed line-clamp-2 mb-3">
                    {course.desc}
                  </p>
                </div>

                {/* Bottom: Tags + Circular Arrow */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                      {course.duration}
                    </span>
                    <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400">
                      {course.level}
                    </span>
                  </div>

                  <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center group-hover:bg-violet-600 dark:group-hover:bg-violet-400 dark:group-hover:text-white transition-colors shrink-0 shadow-xs">
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Dark Callout Banner: Work on Live Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-gradient-to-br from-[#0c1328] via-[#0f172a] to-[#1e1b4b] p-5 text-white overflow-hidden shadow-xl mb-10 border border-indigo-900/50"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-600/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-300">
              REAL-WORLD EXPERIENCE
            </span>

            <h3 className="text-xl font-black leading-tight text-white">
              Work on Live Projects
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
              Build a portfolio that stands out with guidance from industry experts.
            </p>

            <div className="pt-2">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md hover:bg-slate-100 active:scale-95 transition-all"
              >
                <span>Know More</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Why Choose MIVEXO? 2x2 Grid ── */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Why Choose MIVEXO?
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {whyChooseFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center text-center"
                >
                  <div
                    className={`w-9 h-9 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center mb-2 shadow-xs`}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white leading-snug">
                    {feat.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
                    {feat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile Syllabus Sheet Triggered on Course Click ── */}
      {selectedCourse && (
        <MobileSyllabusModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </section>
  )
}
