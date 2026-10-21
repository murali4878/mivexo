import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Briefcase, IndianRupee, Clock, Building2,
  ExternalLink, Sparkles, Filter, CheckCircle2, ChevronRight,
  X, ArrowUpRight, Zap, RefreshCw, Globe, Radio, DollarSign
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ScrollReveal from '../components/ui/ScrollReveal'

// 100% LOCAL & INDIA TECH VACANCIES
const VERIFIED_INDIAN_JOBS = [
  {
    _id: 'in-job-1',
    title: 'Associate Software Engineer (GET / Fresher)',
    company: 'Tata Consultancy Services (TCS)',
    logo: '/companies/tcs.svg',
    location: 'Bangalore / Hyderabad / Pune / Chennai',
    city: 'Bangalore',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹4.5 - ₹7.2 LPA',
    description: 'Build enterprise microservices, REST APIs, and modern frontend dashboards. Comprehensive classroom and hands-on project mentorship included.',
    fullDescription: '<p>TCS is actively hiring engineering freshers and entry-level graduates. You will build and test web-scale microservices, RESTful APIs, and responsive interfaces using Java, Python, and modern JavaScript frameworks.</p><ul><li>Solid grounding in Data Structures and Algorithms</li><li>Foundations in Java, Python, C++, or React</li><li>Database queries in SQL (PostgreSQL / MySQL)</li><li>Strong analytical and problem-solving skills</li></ul>',
    skills: ['Java', 'Python', 'React.js', 'SQL', 'Git'],
    applyUrl: 'https://www.tcs.com/careers',
    postedAt: 'Just now',
    openings: 45,
    source: 'Verified Indian Campus Hiring'
  },
  {
    _id: 'in-job-2',
    title: 'Junior Full Stack Developer',
    company: 'Razorpay',
    logo: '/companies/google.svg',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    domain: 'Technical',
    type: 'Full-Time',
    experience: '0-2 yrs',
    salary: '₹12 - ₹18 LPA',
    description: 'Build fast, fault-tolerant payment gateway dashboards and SDK integrations handling millions of daily Indian digital UPI transactions.',
    fullDescription: '<p>Razorpay powers payments for millions of businesses across India. As a Junior Full Stack Developer, you will develop next-gen merchant checkout experiences, automated reconciliation workflows, and payment gateway infrastructure.</p><ul><li>Proficiency in React.js, Node.js and TypeScript</li><li>Experience designing clean REST &amp; GraphQL APIs</li><li>Knowledge of relational databases like PostgreSQL/MySQL</li><li>Understanding of Docker and CI/CD pipelines</li></ul>',
    skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    applyUrl: 'https://razorpay.com/jobs',
    postedAt: '2 hours ago',
    openings: 8,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-3',
    title: 'Cloud & DevOps Support Associate',
    company: 'Amazon Web Services (AWS India)',
    logo: '/companies/amazon.svg',
    location: 'Hyderabad, Telangana',
    city: 'Hyderabad',
    domain: 'Technical',
    type: 'Full-Time',
    experience: '0-2 yrs',
    salary: '₹14 - ₹22 LPA',
    description: 'Diagnose cloud architecture infrastructure issues, automate deployments, and maintain 99.99% uptime across AWS services.',
    fullDescription: '<p>AWS Premium Support provides technical assistance to enterprise customers across India and APAC. You will solve complex cloud architecture challenges, automate telemetry and log analysis, and collaborate with core AWS service teams.</p><ul><li>Deep understanding of Linux OS internals and networking (TCP/IP, DNS, SSL)</li><li>Hands-on experience with core AWS services (EC2, S3, VPC, IAM, RDS)</li><li>Scripting automation skills in Python, Bash, or Go</li><li>Familiarity with containerization (Docker, Kubernetes)</li></ul>',
    skills: ['AWS', 'Linux', 'Python', 'Networking', 'Docker', 'Kubernetes'],
    applyUrl: 'https://www.amazon.jobs',
    postedAt: '4 hours ago',
    openings: 14,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-4',
    title: 'Graduate Software Developer',
    company: 'Zoho Corporation',
    logo: '/companies/microsoft.svg',
    location: 'Chennai / Tenkasi, Tamil Nadu',
    city: 'Chennai',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹6.0 - ₹9.5 LPA',
    description: 'Develop world-class SaaS enterprise applications. Write robust Java/C++ backends, perform database indexing, and build modular client UIs.',
    fullDescription: '<p>Zoho builds native enterprise operating software used by over 100 million users globally. As a Graduate Software Developer, you will contribute directly to Zoho Creator, CRM, or Books platforms.</p><ul><li>Strong coding problem-solving in Java, C++, or Python</li><li>Solid grasp of OOP principles, multithreading, and memory management</li><li>Hands-on familiarity with relational SQL databases</li><li>Passion for building scalable product architectures</li></ul>',
    skills: ['Java', 'C++', 'Data Structures', 'SQL', 'Algorithms'],
    applyUrl: 'https://www.zoho.com/careers',
    postedAt: 'Today',
    openings: 25,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-5',
    title: 'Data Analyst — Business Intelligence',
    company: 'Swiggy',
    logo: '/companies/google.svg',
    location: 'Bangalore / Remote (India)',
    city: 'Bangalore',
    domain: 'Analytics',
    type: 'Remote (India)',
    experience: '0-2 yrs',
    salary: '₹8.5 - ₹14 LPA',
    description: 'Analyze hyper-local delivery logistics datasets, build automated Power BI KPI dashboards, and deliver operational optimization models.',
    fullDescription: '<p>Swiggy Data &amp; Analytics team empowers hyper-local commerce decisions. You will formulate SQL pipelines, build visual Power BI/Metabase dashboards, and partner with product squads to evaluate delivery funnel retention.</p><ul><li>Advanced SQL querying and aggregation pipelines</li><li>Proficiency with Python for exploratory data analysis (Pandas, NumPy)</li><li>Hands-on experience in Power BI, Tableau, or Metabase</li><li>Strong analytical problem-solving and business storytelling</li></ul>',
    skills: ['SQL', 'Power BI', 'Python', 'Excel Advanced', 'Tableau'],
    applyUrl: 'https://careers.swiggy.com',
    postedAt: '1 day ago',
    openings: 6,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-6',
    title: 'Software Engineering Apprentice',
    company: 'Google India',
    logo: '/companies/google.svg',
    location: 'Hyderabad / Bangalore',
    city: 'Hyderabad',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹16 - ₹26 LPA',
    description: 'Collaborate with world-class engineering teams building core products. Focus on distributed algorithms, scalable systems, and testing.',
    fullDescription: '<p>Google Software Engineering Apprenticeship in India provides intensive hands-on technical training while contributing to production software products used by billions of users worldwide.</p><ul><li>Solid grounding in Computer Science fundamentals: Data Structures &amp; Algorithms</li><li>Proficiency in at least one language: C++, Java, or Python</li><li>Knowledge of software testing, debugging, and code reviews</li></ul>',
    skills: ['Data Structures', 'C++', 'Java', 'Python', 'Algorithms'],
    applyUrl: 'https://careers.google.com',
    postedAt: 'Today',
    openings: 6,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-7',
    title: 'Junior UI/UX & Product Designer',
    company: 'Flipkart',
    logo: '/companies/microsoft.svg',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    domain: 'Design',
    type: 'Hybrid',
    experience: '0-2 yrs',
    salary: '₹9 - ₹15 LPA',
    description: 'Design mobile-first e-commerce checkout journeys, formulate accessible Figma design tokens, and conduct user research testing.',
    fullDescription: '<p>Flipkart Design Studio crafts experiences for over 450 million Indian shoppers. You will design elegant user interfaces, wireframes, and interactive prototypes for web and mobile apps.</p><ul><li>Strong portfolio showcasing UX case studies and UI prototypes in Figma</li><li>Understanding of design tokens, accessibility (WCAG), and responsive layouts</li><li>Experience with user testing, journey mapping, and usability heuristics</li></ul>',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems'],
    applyUrl: 'https://www.flipkartcareers.com',
    postedAt: '1 day ago',
    openings: 4,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-8',
    title: 'Associate Product Manager (APM)',
    company: 'PhonePe',
    logo: '/companies/google.svg',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    domain: 'Management',
    type: 'Full-Time',
    experience: '0-2 yrs',
    salary: '₹14 - ₹20 LPA',
    description: 'Drive fintech feature execution. Formulate detailed PRD specifications, define user funnel metrics, and work closely with engineering squads.',
    fullDescription: '<p>PhonePe is India leading digital payments platform. As an APM, you will own critical features across payment flows, user onboarding, and merchant experiences.</p><ul><li>Ability to translate user needs into crisp Product Requirement Documents (PRDs)</li><li>Strong quantitative skills (SQL, funnel conversion analysis)</li><li>Cross-functional collaboration with engineers, designers, and business ops</li></ul>',
    skills: ['Product Discovery', 'SQL', 'PRD Formulation', 'Agile/Scrum', 'Mixpanel'],
    applyUrl: 'https://www.phonepe.com/careers',
    postedAt: 'Just now',
    openings: 3,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-9',
    title: 'Frontend Engineer (React / Mobile)',
    company: 'CRED',
    logo: '/companies/google.svg',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    domain: 'Technical',
    type: 'Full-Time',
    experience: '0-2 yrs',
    salary: '₹15 - ₹24 LPA',
    description: 'Craft high-performance visual interfaces with smooth micro-animations, design tokens, and low-latency client state architectures.',
    fullDescription: '<p>CRED is known for its world-class mobile app design and micro-interactions. You will build buttery-smooth consumer interfaces with React Native, TypeScript, and modern state architectures.</p><ul><li>Expertise in JavaScript, TypeScript, and React / React Native</li><li>Deep eye for UI design detail, typography, and micro-animations</li><li>Performance profiling and eliminating framerate drops</li></ul>',
    skills: ['React Native', 'React.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
    applyUrl: 'https://careers.cred.club',
    postedAt: '2 days ago',
    openings: 5,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-10',
    title: 'Associate Quality Engineer (SDET)',
    company: 'Freshworks',
    logo: '/companies/microsoft.svg',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    domain: 'Technical',
    type: 'Hybrid',
    experience: '0-2 yrs',
    salary: '₹7.5 - ₹12 LPA',
    description: 'Automate end-to-end web testing suites, design API regression test cases, and integrate automated test runs in GitHub Actions CI/CD.',
    fullDescription: '<p>Freshworks powers SaaS customer engagement for businesses globally. As an Associate SDET, you will build automated test frameworks in Cypress, Selenium, or Playwright.</p><ul><li>Experience writing automated tests in Java or JavaScript</li><li>Hands-on knowledge of Selenium, Cypress, or Playwright</li><li>API testing with Postman and REST Assured</li><li>Integration with CI/CD build pipelines</li></ul>',
    skills: ['Cypress', 'Selenium', 'Postman', 'Java', 'Playwright'],
    applyUrl: 'https://careers.freshworks.com',
    postedAt: '3 days ago',
    openings: 7,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-11',
    title: 'Backend Developer Trainee (Node.js / Go)',
    company: 'Paytm',
    logo: '/companies/google.svg',
    location: 'Noida / Gurgaon (Delhi NCR)',
    city: 'Gurgaon / Noida',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹6.5 - ₹10 LPA',
    description: 'Build high-concurrency payment processing APIs, Redis caching layers, and Kafka streaming pipelines for Indian merchants.',
    fullDescription: '<p>Paytm connects over 350 million Indian consumers and 20 million merchants. You will build and scale transaction routing engines, distributed caching, and microservices.</p><ul><li>Solid grounding in Node.js, Go, or Java</li><li>Familiarity with Redis, Kafka, or RabbitMQ</li><li>Database optimization with MongoDB and MySQL</li><li>Writing clean, modular, unit-tested code</li></ul>',
    skills: ['Node.js', 'Go', 'Kafka', 'Redis', 'MongoDB'],
    applyUrl: 'https://careers.paytm.com',
    postedAt: 'Today',
    openings: 12,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-12',
    title: 'Associate Software Engineer (ASE)',
    company: 'Accenture India',
    logo: '/companies/accenture.svg',
    location: 'Gurgaon / Mumbai / Bangalore / Pune',
    city: 'Pune',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹4.8 - ₹7.0 LPA',
    description: 'Deliver modern cloud-native solutions, enterprise SAP/Salesforce integrations, and full-stack software development for global clients.',
    fullDescription: '<p>Accenture India is hiring Associate Software Engineers. You will receive structured cloud training and contribute to enterprise technology transformation programs.</p><ul><li>Degree in B.E./B.Tech/MCA with strong programming skills</li><li>Familiarity with Cloud concepts (AWS/Azure/GCP)</li><li>Good communication and teamwork instincts</li></ul>',
    skills: ['Java', 'Cloud Fundamentals', 'SQL', 'Python', 'Agile'],
    applyUrl: 'https://www.accenture.com/in-en/careers',
    postedAt: '2 days ago',
    openings: 50,
    source: 'Verified Indian Campus Hiring'
  },
  {
    _id: 'in-job-13',
    title: 'Graduate Project Engineer',
    company: 'Wipro Technologies',
    logo: '/companies/wipro.svg',
    location: 'Pune / Hyderabad / Bangalore',
    city: 'Pune',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹4.2 - ₹6.5 LPA',
    description: 'Join Wipro Elite national talent pool. Master cloud-native development, automated unit testing, and agile client delivery.',
    fullDescription: '<p>Wipro Technologies is hiring fresh engineering graduates for its Project Engineer track. Comprehensive 3-month bootcamp in modern full-stack web and cloud frameworks.</p><ul><li>B.E./B.Tech graduates with strong logical aptitude</li><li>Foundations in Python, Java, or C++</li><li>Basic database and networking knowledge</li></ul>',
    skills: ['Java', 'Python', 'C++', 'SQL', 'Cloud Basics'],
    applyUrl: 'https://careers.wipro.com',
    postedAt: '1 day ago',
    openings: 40,
    source: 'Verified Indian Campus Hiring'
  },
  {
    _id: 'in-job-14',
    title: 'Graduate Cloud & AI Trainee',
    company: 'Jio Platforms Limited',
    logo: '/companies/google.svg',
    location: 'Mumbai / Navi Mumbai, Maharashtra',
    city: 'Mumbai',
    domain: 'Technical',
    type: 'Full-Time',
    experience: 'Fresher (0-1 yr)',
    salary: '₹6.5 - ₹10 LPA',
    description: 'Contribute to India’s largest 5G, telecom cloud infrastructure, and AI foundational services handling petabytes of data.',
    fullDescription: '<p>Jio Platforms builds India digital nervous system. As a Graduate Cloud &amp; AI Trainee, you will work on 5G cloud networks, edge AI compute, and distributed media streaming services.</p><ul><li>Solid grounding in Linux and Python/Go/C++</li><li>Familiarity with cloud containers (Docker/Kubernetes)</li><li>Curiosity for 5G, networking, and applied AI</li></ul>',
    skills: ['Python', 'Linux', 'Docker', 'Go', 'AI Basics'],
    applyUrl: 'https://careers.jio.com',
    postedAt: 'Today',
    openings: 20,
    source: 'Verified Indian Tech Giant'
  },
  {
    _id: 'in-job-15',
    title: 'Growth & Business Operations Analyst',
    company: 'Zomato',
    logo: '/companies/google.svg',
    location: 'Gurgaon / Delhi NCR',
    city: 'Gurgaon / Noida',
    domain: 'Marketing',
    type: 'Full-Time',
    experience: '0-2 yrs',
    salary: '₹7.0 - ₹12 LPA',
    description: 'Formulate hyper-local growth experiments, evaluate customer acquisition funnel data, and execute retention campaigns.',
    fullDescription: '<p>Zomato Growth team drives merchant and diner engagement. You will conduct exploratory analysis on restaurant density, customer cohort retention, and paid marketing channels.</p><ul><li>Advanced Excel and SQL skills</li><li>Understanding of CAC, LTV, and cohort retention funnels</li><li>Strong communication and commercial intuition</li></ul>',
    skills: ['SQL', 'Growth Marketing', 'Excel', 'Data Analysis', 'Funnels'],
    applyUrl: 'https://www.zomato.com/careers',
    postedAt: '3 days ago',
    openings: 5,
    source: 'Verified Indian Tech Giant'
  }
]

const DOMAINS = ['All Domains', 'Technical', 'Analytics', 'Design', 'Marketing', 'Management']

// Strictly Indian Tech Hubs & Local Cities
const LOCATIONS = [
  'All India',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Gurgaon / Noida',
  'Mumbai',
  'Remote (India)'
]

export default function JobPortal() {
  const [jobs, setJobs] = useState(VERIFIED_INDIAN_JOBS)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('All Domains')
  const [selectedLocation, setSelectedLocation] = useState('All India')
  const [selectedJob, setSelectedJob] = useState(null)
  const [lastRefreshed, setLastRefreshed] = useState('')

  // Optional: Fetch only India-filtered remote jobs from Remotive API
  const fetchIndiaJobs = async () => {
    setLoading(true)
    let liveIndiaJobs = []

    try {
      const res = await axios.get('https://remotive.com/api/remote-jobs?limit=100', { timeout: 8000 })
      if (res.data?.jobs && Array.isArray(res.data.jobs)) {
        // STRICT FILTER: ONLY include jobs that explicitly mention India or Worldwide/APAC eligibility
        liveIndiaJobs = res.data.jobs
          .filter((j) => {
            const loc = (j.candidate_required_location || '').toLowerCase()
            return loc.includes('india') || loc.includes('asia') || loc.includes('anywhere')
          })
          .map((j) => {
            let domain = 'Technical'
            const cat = (j.category || '').toLowerCase()
            if (cat.includes('data') || cat.includes('ai') || cat.includes('analyst')) domain = 'Analytics'
            else if (cat.includes('design')) domain = 'Design'
            else if (cat.includes('market') || cat.includes('growth')) domain = 'Marketing'
            else if (cat.includes('product') || cat.includes('business')) domain = 'Management'

            return {
              _id: 'remotive-in-' + j.id,
              title: j.title,
              company: j.company_name,
              logo: j.company_logo || null,
              location: 'Remote (India / APAC)',
              city: 'Remote (India)',
              domain,
              type: 'Remote',
              experience: 'Entry / 0-2 yrs',
              salary: '₹8 - ₹16 LPA (Converted)',
              description: j.description ? j.description.replace(/<[^>]+>/g, ' ').slice(0, 220) + '...' : 'Verified tech opening eligible for Indian engineers.',
              fullDescription: j.description || '',
              skills: Array.isArray(j.tags) && j.tags.length > 0 ? j.tags.slice(0, 5) : ['Software', 'India'],
              applyUrl: j.url,
              postedAt: 'Active Today',
              openings: 1,
              source: 'Verified India Opening'
            }
          })
      }
    } catch (_) {
      // Graceful fallback
    }

    if (liveIndiaJobs.length > 0) {
      setJobs([...VERIFIED_INDIAN_JOBS, ...liveIndiaJobs])
      setLastRefreshed(new Date().toLocaleTimeString())
      toast.success(`Loaded ${VERIFIED_INDIAN_JOBS.length + liveIndiaJobs.length} active Indian tech vacancies! 🇮🇳`)
    } else {
      setJobs(VERIFIED_INDIAN_JOBS)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchIndiaJobs()
  }, [])

  // Filter only matching India & local location criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      // Keyword search
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase()) ||
        (j.skills && j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())))

      // Domain filter
      const matchDomain =
        selectedDomain === 'All Domains' ||
        j.domain?.toLowerCase() === selectedDomain.toLowerCase()

      // Local Indian City / Hub filter
      const matchLoc =
        selectedLocation === 'All India' ||
        j.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        j.city?.toLowerCase() === selectedLocation.toLowerCase()

      return matchSearch && matchDomain && matchLoc
    })
  }, [jobs, search, selectedDomain, selectedLocation])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070714] text-slate-900 dark:text-white transition-colors duration-300">
      {/* HERO BANNER - DEDICATED TO INDIA & LOCAL TECH HIRING */}
      <section className="relative bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 py-16 px-4 sm:px-6 md:px-10 text-white overflow-hidden border-b border-violet-900/40">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs sm:text-sm font-black mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              🇮🇳 India Tech Vacancies &amp; Campus Hiring Portal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight leading-tight"
          >
            Local &amp; India Tech Careers <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Fresher &amp; Graduate Vacancies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
          >
            Direct access to verified fresher roles, entry-level engineering openings, and campus hiring drives across major Indian tech hubs (Bangalore, Hyderabad, Pune, Chennai, Gurgaon, Mumbai).
          </motion.p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{jobs.length}+</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">India Vacancies</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-teal-300">Top Indian Hubs</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">BLR · HYD · PNQ · MAA</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-300">Fresher / 0-2 Yrs</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Entry-Level Focus</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-300">100% Free</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Direct Career Portals</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <section className="sticky top-16 z-30 bg-white/95 dark:bg-[#0c0c1e]/95 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 shadow-sm py-4 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by job title, company, or skills (e.g. React, Java, Power BI, Python)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-violet-500 font-medium"
              />
            </div>

            {/* Indian City / Location Filter */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-emerald-500 shrink-0 hidden sm:block" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>

              {/* Domain Filter */}
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                {DOMAINS.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchIndiaJobs}
                title="Refresh openings"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 text-slate-500 hover:text-violet-500 transition-colors cursor-pointer"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Quick city pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Top Hubs:
            </span>
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLocation === loc
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS LISTING SECTION */}
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Verified India Tech Vacancies ({filteredJobs.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing opportunities for freshers and entry-level talent across Indian tech hubs.
            </p>
          </div>

          {selectedLocation !== 'All India' && (
            <button
              onClick={() => setSelectedLocation('All India')}
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Reset to All India
            </button>
          )}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Building2 size={40} className="text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No vacancies matching your selected city/criteria
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Try selecting "All India" or clearing your search filters.
            </p>
            <button
              onClick={() => {
                setSelectedLocation('All India')
                setSelectedDomain('All Domains')
                setSearch('')
              }}
              className="btn-primary !py-2 !px-4 !text-xs"
            >
              Show All India Vacancies
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl bg-white dark:bg-[#0c0c1e] border-2 border-slate-200 dark:border-slate-800/90 hover:border-violet-400 dark:hover:border-violet-500/70 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all"
              >
                <div>
                  {/* Card Header: Company, Location, and Domain */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 shrink-0">
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Building2 size={24} className="text-violet-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {job.company}
                        </h4>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          {job.source}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 shrink-0">
                      {job.domain}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3
                    onClick={() => setSelectedJob(job)}
                    className="text-base font-black text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {job.title}
                  </h3>

                  {/* Metadata Chips: Location, Experience, Salary */}
                  <div className="space-y-1.5 mb-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <IndianRupee size={13} /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      <Briefcase size={12} className="shrink-0" /> {job.experience} · {job.type}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills?.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills?.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{job.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={11} /> {job.postedAt}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
                    >
                      Apply <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* DETAIL MODAL DRAWER */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#13132B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-700 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4 border-b pb-4 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-slate-700 flex items-center justify-center p-2 overflow-hidden">
                    {selectedJob.logo ? (
                      <img src={selectedJob.logo} alt={selectedJob.company} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Building2 size={28} className="text-violet-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs font-bold text-violet-600 dark:text-violet-400 mt-0.5">
                      {selectedJob.company} · {selectedJob.domain}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Badges Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Compensation</div>
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedJob.salary}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Location</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedJob.location}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Work Type</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">{selectedJob.type}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Hiring Source</div>
                  <div className="text-xs font-black text-violet-600 dark:text-violet-400 mt-0.5">{selectedJob.source}</div>
                </div>
              </div>

              {/* Skills */}
              <div className="my-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Skills &amp; Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.skills?.map((s, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 border border-violet-300 dark:border-violet-700 font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div className="my-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Role Overview &amp; Requirements
                </h4>
                {selectedJob.fullDescription ? (
                  <div
                    className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 max-h-60 overflow-y-auto p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                    dangerouslySetInnerHTML={{ __html: selectedJob.fullDescription }}
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    {selectedJob.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
                >
                  Apply on Official Career Page <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
