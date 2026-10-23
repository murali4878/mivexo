import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Play, CheckCircle, Clock, Award, BarChart2, ChevronRight, ChevronDown, Menu, X,
  Home, Settings, LogOut, FileText, Users, Download, HelpCircle, Sparkles,
  ExternalLink, Code2, CheckCircle2, AlertCircle, Laptop, ArrowRight, Star,
  FolderDown, Layers, Terminal, Send, Lock, ShieldAlert, Map,
  User, Mail, Phone, Check, ShieldCheck, Zap, Key, ArrowUpRight, CheckSquare, CreditCard,
  Search
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import mivexoLogo from '../assets/mivexo_logo.png'
import api from '../lib/api'

// All 20 tracks offered by Mivexo
const LMS_TRACK_OPTIONS = [
  'Full Stack Web Development (MERN & Next.js)',
  'Artificial Intelligence & Deep Learning',
  'Data Science & Machine Learning',
  'Cloud Computing & DevOps Engineering',
  'Cybersecurity & Ethical Hacking',
  'Business Analytics & Power BI',
  'UI/UX Design & Product Systems',
  'Digital Marketing & Growth Hacking',
  'Financial Modeling & Valuation',
  'Mobile App Development (React Native & Flutter)',
  'Blockchain & Web3 Engineering',
  'Embedded Systems & IoT Engineering',
  'Product Management & Agile Systems',
  'Robotics & Industrial Automation',
  'Game Development (Unity 3D)',
  'HR Analytics & Talent Operations',
  'Supply Chain & Logistics Operations',
  'Bioinformatics & Computational Genomics',
  'Big Data Engineering with Spark & Kafka',
  'AR/VR Development'
]

const LMS_PAYMENT_LINKS = {
  reserve: 'https://rzp.io/rzp/ypB0OAJ',       // ₹1,000 (pre-registration for both)
  foundation_full: 'https://rzp.io/rzp/KEDQZrF', // ₹3,000 (Foundation full)
  advanced_full: 'https://rzp.io/rzp/WCFgB2HX'    // ₹3,500 (Advanced full)
}

// Complete Multi-Domain Curriculum & Study Materials Dataset
const domainCurriculums = {
  'full-stack': {
    id: 'full-stack',
    name: 'Full Stack Web Development (MERN & Next.js)',
    short: 'Full Stack',
    icon: Code2,
    badgeColor: 'bg-violet-600 text-white',
    description: 'Master frontend architecture with React & Next.js 14, scalable REST/GraphQL APIs with Node.js, and cloud deployments.',
    modules: [
      {
        id: 'mod-1',
        title: 'Modern React & Next.js 14 Architecture',
        week: 'Week 1-2',
        duration: '6h 30m',
        completed: 4,
        total: 4,
        lessons: [
          { id: 'fs-1-1', title: 'React 18 Concurrent Rendering & State Patterns', duration: '45m', completed: true, videoId: '6ZfuNTut_gc', summary: 'Deep dive into useTransition, useDeferredValue, and custom hook encapsulation for high-traffic apps.' },
          { id: 'fs-1-2', title: 'Next.js 14 App Router & Server Components', duration: '55m', completed: true, videoId: 'jMy4pVZMyLM', summary: 'Client vs Server Components boundary, streaming with Suspense, and route segment caching mechanisms.' },
          { id: 'fs-1-3', title: 'Modern Styling with Tailwind CSS & Framer Motion', duration: '50m', completed: true, videoId: 'dFgzHOX84xQ', summary: 'Design tokens, dark mode automation, and responsive glassmorphic interfaces.' },
          { id: 'fs-1-4', title: 'State Management with Zustand & React Query', duration: '1h 10m', completed: true, videoId: '_ngCLZ5Iz-0', summary: 'Asynchronous cache invalidation, optimistic UI mutations, and state hydration.' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Backend Microservices with Node.js & Express',
        week: 'Week 3-4',
        duration: '7h 15m',
        completed: 3,
        total: 4,
        lessons: [
          { id: 'fs-2-1', title: 'Node.js Event Loop & Non-blocking I/O Architecture', duration: '50m', completed: true, videoId: 'XUSHH0E3Mzk', summary: 'Libuv worker threads, memory lifecycle, and event emitter patterns.' },
          { id: 'fs-2-2', title: 'RESTful API Engineering & Express Middleware', duration: '1h 05m', completed: true, videoId: 'l8WPWK9mS5M', summary: 'Controller architecture, centralized error handling, and rate limiting.' },
          { id: 'fs-2-3', title: 'JWT Authentication, Session Refresh & Role RBAC', duration: '1h 15m', completed: true, videoId: '7Q17ubqLfaM', summary: 'HttpOnly cookie security, access vs refresh tokens, and middleware guards.' },
          { id: 'fs-2-4', title: 'API Documentation with Swagger & OpenAPI 3.0', duration: '45m', completed: false, videoId: 'l8WPWK9mS5M', summary: 'Auto-generating interactive API test documentation and client SDKs.' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Databases: MongoDB Aggregations & PostgreSQL',
        week: 'Week 5-6',
        duration: '6h 45m',
        completed: 1,
        total: 4,
        lessons: [
          { id: 'fs-3-1', title: 'MongoDB Schema Design & High-Performance Indexes', duration: '1h 00m', completed: true, videoId: 'ofme2o29pgU', summary: 'Compound indexes, execution plan explain(), and data denormalization.' },
          { id: 'fs-3-2', title: 'Advanced Aggregation Pipelines ($facet, $lookup)', duration: '1h 15m', completed: false, videoId: 'ofme2o29pgU', summary: 'Multi-stage data transforms, grouping, and analytical rollups.' },
          { id: 'fs-3-3', title: 'PostgreSQL Relational Modeling & Prisma ORM', duration: '1h 10m', completed: false, videoId: 'RebA5J-rlwg', summary: 'Foreign keys, database migrations, connection pooling, and ACID.' },
          { id: 'fs-3-4', title: 'Redis In-Memory Caching & Distributed Session Store', duration: '45m', completed: false, videoId: 'jgpVdJB2sKQ', summary: 'Sub-millisecond query caching and rate limiter implementation.' }
        ]
      },
      {
        id: 'mod-4',
        title: 'Docker, CI/CD Cloud Deployments & Capstone',
        week: 'Week 7-8',
        duration: '8h 00m',
        completed: 0,
        total: 4,
        lessons: [
          { id: 'fs-4-1', title: 'Docker Multi-Stage Image Builds & Compose Networks', duration: '1h 15m', completed: false, videoId: 'gAkwW2tuIqE', summary: 'Minimizing production image sizes from 1GB to 80MB using Alpine.' },
          { id: 'fs-4-2', title: 'Automated CI/CD with GitHub Actions', duration: '1h 05m', completed: false, videoId: 'mFFXuXjVgkU', summary: 'Automated linting, integration testing, and auto-deploy to AWS/Render.' },
          { id: 'fs-4-3', title: 'Production Security Hardening & CORS Best Practices', duration: '50m', completed: false, videoId: 'X84C8LAliwc', summary: 'Helmet security headers, SQL/NoSQL injection prevention, and SSL/TLS.' },
          { id: 'fs-4-4', title: 'Live Capstone Project Defense & Code Review', duration: '1h 30m', completed: false, videoId: 'qwfE7fElb9M', summary: 'Live architecture defense and peer code review with industry mentor.' }
        ]
      }
    ],
    materials: [
      { id: 'mat-1', title: 'Full Stack MERN System Architecture Handbook (PDF)', size: '4.8 MB', type: 'PDF Guide', downloads: 1420 },
      { id: 'mat-2', title: 'Next.js 14 Production Starter Boilerplate (GitHub)', size: '12 MB', type: 'Source Code', downloads: 2180 },
      { id: 'mat-3', title: 'Top 100 Technical Interview Questions & Solutions', size: '3.2 MB', type: 'PDF Book', downloads: 3450 },
      { id: 'mat-4', title: 'MongoDB Aggregation Cheat Sheet & Best Practices', size: '1.9 MB', type: 'Cheatsheet', downloads: 1890 },
      { id: 'mat-5', title: 'Docker & Kubernetes Commands Quick Reference', size: '1.4 MB', type: 'Cheatsheet', downloads: 2600 }
    ],
    quizzes: [
      {
        id: 'q-1',
        title: 'Week 2 Quiz: React 18 & Next.js Architecture',
        duration: '15 Mins',
        totalQuestions: 4,
        questions: [
          {
            q: 'Which Next.js 14 component type executes solely on the server without shipping JavaScript to the client browser by default?',
            options: ['Client Component with "use client"', 'Server Component', 'React Hydrated Component', 'Static Hook Component'],
            answer: 1,
            explanation: 'In Next.js 14 App Router, all components inside the app directory are React Server Components (RSC) by default.'
          },
          {
            q: 'What is the primary benefit of the useTransition hook in React 18?',
            options: ['To fetch data automatically', 'To mark state updates as non-blocking transitions keeping the UI responsive', 'To transition between CSS classes', 'To replace useEffect for animations'],
            answer: 1,
            explanation: 'useTransition lets you mark state updates as transitions, allowing high-priority updates (like typing in an input) to interrupt low-priority ones.'
          },
          {
            q: 'Which HTTP status code should a REST API return when a resource is successfully created?',
            options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
            answer: 1,
            explanation: 'HTTP 201 Created indicates that the request has succeeded and led to the creation of a new resource.'
          },
          {
            q: 'What purpose does an index serve in MongoDB collections?',
            options: ['Compresses stored BSON data', 'Drastically speeds up query lookups by ordering key fields into a B-tree', 'Enforces strict TypeScript types', 'Encrypts user passwords'],
            answer: 1,
            explanation: 'Indexes support the efficient execution of queries in MongoDB by organizing field values in an ordered data structure.'
          }
        ]
      },
      {
        id: 'q-2',
        title: 'Week 4 Quiz: Node.js, Express & Database Optimization',
        duration: '20 Mins',
        totalQuestions: 3,
        questions: [
          {
            q: 'Where should JWT refresh tokens ideally be stored in modern web applications to mitigate XSS attacks?',
            options: ['In window.localStorage', 'In a secure HttpOnly SameSite cookie', 'In the Redux global store', 'In a hidden DOM element'],
            answer: 1,
            explanation: 'HttpOnly cookies cannot be accessed by client-side JavaScript, protecting tokens from malicious XSS script extraction.'
          },
          {
            q: 'Which MongoDB aggregation operator allows joining documents from another collection?',
            options: ['$match', '$lookup', '$project', '$unwind'],
            answer: 1,
            explanation: '$lookup performs a left outer join to an unsharded collection in the same database.'
          },
          {
            q: 'What is Docker multi-stage build primarily used for?',
            options: ['Running multiple operating systems at once', 'Separating build tools from the final production runtime to minimize image size', 'Speeding up CPU clocks', 'Replacing Kubernetes'],
            answer: 1,
            explanation: 'Multi-stage builds allow you to use intermediate images to compile code, copying only the required build artifacts into a lean final runtime image.'
          }
        ]
      }
    ],
    assignment: {
      title: 'Full Stack Capstone: Multi-Tenant SaaS Workspace with Stripe/Razorpay',
      deadline: 'Nov 15, 2026',
      status: 'In Progress',
      rubric: [
        'Responsive Next.js 14 UI with Dark & Light theme (25%)',
        'Secure Node.js & Express REST/GraphQL API with JWT RBAC (25%)',
        'PostgreSQL/MongoDB database with optimized indexes & transactions (25%)',
        'Docker containerization & live public deployment with automated tests (25%)'
      ]
    }
  },
  'ai-ml': {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Deep Learning',
    short: 'AI & Deep Learning',
    icon: Sparkles,
    badgeColor: 'bg-amber-600 text-white',
    description: 'Build neural networks with PyTorch, explore Computer Vision with CNNs/YOLO, master NLP with Transformers & Hugging Face, and deploy Generative AI RAG systems.',
    modules: [
      {
        id: 'ai-1',
        title: 'Neural Networks & PyTorch Fundamentals',
        week: 'Week 1-2',
        duration: '7h 00m',
        completed: 4,
        total: 4,
        lessons: [
          { id: 'ai-1-1', title: 'Tensors, Autograd & Computation Graphs in PyTorch', duration: '50m', completed: true, videoId: 'c36lUUr864M', summary: 'Automatic differentiation, backpropagation mechanics, and GPU CUDA acceleration.' },
          { id: 'ai-1-2', title: 'Designing Deep Neural Architectures from Scratch', duration: '1h 00m', completed: true, videoId: 'aircAruvnKk', summary: 'Linear layers, activation functions (ReLU, GELU), and loss functions.' },
          { id: 'ai-1-3', title: 'Optimization Algorithms: SGD, AdamW & Learning Rate Schedulers', duration: '55m', completed: true, videoId: 'IHZwWFHWa-w', summary: 'Momentum, weight decay, gradient clipping, and cosine annealing.' },
          { id: 'ai-1-4', title: 'Overfitting Mitigation: Dropout, Batch Normalization & L2', duration: '45m', completed: true, videoId: 'nUUqwaxLnWs', summary: 'Regularization strategies for generalization on unseen validation test sets.' }
        ]
      },
      {
        id: 'ai-2',
        title: 'Computer Vision: Convolutional Networks & Object Detection',
        week: 'Week 3-4',
        duration: '7h 30m',
        completed: 2,
        total: 4,
        lessons: [
          { id: 'ai-2-1', title: 'Convolutions, Kernels & Pooling Operations', duration: '55m', completed: true, videoId: 'YRhxdVk_sIs', summary: 'Spatial feature hierarchies, stride, and receptive fields.' },
          { id: 'ai-2-2', title: 'ResNet, EfficientNet & Transfer Learning', duration: '1h 10m', completed: true, videoId: 'c36lUUr864M', summary: 'Residual skip connections and fine-tuning ImageNet pre-trained backbones.' },
          { id: 'ai-2-3', title: 'Real-time Object Detection with YOLO v8', duration: '1h 20m', completed: false, videoId: 'ag3DLKsl2vk', summary: 'Anchor boxes, Intersection over Union (IoU), and non-max suppression.' },
          { id: 'ai-2-4', title: 'Image Segmentation with U-Net Architectures', duration: '50m', completed: false, videoId: 'YRhxdVk_sIs', summary: 'Pixel-level semantic classification for medical & autonomous driving imagery.' }
        ]
      },
      {
        id: 'ai-3',
        title: 'NLP, Transformers & Large Language Models',
        week: 'Week 5-6',
        duration: '8h 00m',
        completed: 0,
        total: 4,
        lessons: [
          { id: 'ai-3-1', title: 'Self-Attention Mechanisms & Scaled Dot-Product Math', duration: '1h 15m', completed: false, videoId: '4Bdc55j80l8', summary: 'Query, Key, Value vectors and multi-head attention.' },
          { id: 'ai-3-2', title: 'The Transformer Architecture: Encoders & Decoders', duration: '1h 10m', completed: false, videoId: '4Bdc55j80l8', summary: 'Positional encodings, layer normalization, and feed-forward sublayers.' },
          { id: 'ai-3-3', title: 'Hugging Face Ecosystem, Tokenizers & Fine-tuning BERT', duration: '1h 20m', completed: false, videoId: '8ht-HDyFfqo', summary: 'Domain adaptation on specialized text classification tasks.' },
          { id: 'ai-3-4', title: 'Generative AI: RAG Pipelines with Pinecone & LangChain', duration: '1h 30m', completed: false, videoId: 'tcqEUSNCn8I', summary: 'Vector embeddings, semantic search, and prompt engineering orchestration.' }
        ]
      }
    ],
    materials: [
      { id: 'mat-ai-1', title: 'PyTorch Deep Learning Math & Code Blueprint (PDF)', size: '6.2 MB', type: 'PDF Book', downloads: 2190 },
      { id: 'mat-ai-2', title: 'Transformer Attention Mechanism Explained Visual Notes', size: '3.8 MB', type: 'Infographic', downloads: 1840 },
      { id: 'mat-ai-3', title: 'Enterprise RAG Architecture Starter Pack (Python)', size: '14 MB', type: 'Source Code', downloads: 3100 },
      { id: 'mat-ai-4', title: 'Top 50 AI Research & Machine Learning Interview Guide', size: '2.5 MB', type: 'PDF Guide', downloads: 4120 }
    ],
    quizzes: [
      {
        id: 'q-ai-1',
        title: 'Week 2 Quiz: PyTorch & Deep Neural Foundations',
        duration: '15 Mins',
        totalQuestions: 3,
        questions: [
          {
            q: 'In backpropagation, how is the gradient of the loss with respect to each model parameter calculated?',
            options: ['By random trial and error', 'By applying the chain rule of calculus backwards through the graph', 'By sorting the weights', 'By calculating the average of the inputs'],
            answer: 1,
            explanation: 'Autograd uses the chain rule to recursively compute partial derivatives of the loss with respect to all leaf tensors.'
          },
          {
            q: 'What major problem do residual connections (skip connections) in ResNet solve?',
            options: ['Memory shortage', 'Vanishing and exploding gradient problem during deep layer training', 'Lack of training data', 'High inference latency'],
            answer: 1,
            explanation: 'Skip connections allow gradients to flow directly through the identity mappings, preventing gradient degradation in very deep networks.'
          },
          {
            q: 'In the Attention formula Attention(Q, K, V), why is the dot product of Q and K divided by sqrt(d_k)?',
            options: ['To speed up computation', 'To prevent dot products from growing excessively large which pushes softmax into regions with tiny gradients', 'To convert float to integer', 'To remove negative numbers'],
            answer: 1,
            explanation: 'Scaling by sqrt(d_k) counters the variance increase of the dot product for large dimensions, preventing the softmax function from saturating.'
          }
        ]
      }
    ],
    assignment: {
      title: 'AI Capstone: Production RAG Knowledge Assistant with Vector Embeddings',
      deadline: 'Nov 20, 2026',
      status: 'Not Started',
      rubric: [
        'Chunking strategy & document ingestion pipeline (25%)',
        'Vector similarity search with Pinecone or ChromaDB (25%)',
        'Custom prompt template with hallucination guardrails (25%)',
        'Latency benchmarking and interactive Streamlit UI (25%)'
      ]
    }
  },
  'cloud-devops': {
    id: 'cloud-devops',
    name: 'Cloud Computing & DevOps Engineering',
    short: 'Cloud & DevOps',
    icon: Laptop,
    badgeColor: 'bg-blue-600 text-white',
    description: 'Master AWS Infrastructure, Docker containerization, Kubernetes cluster orchestration, Terraform Infrastructure as Code, and CI/CD automation.',
    modules: [
      {
        id: 'cd-1',
        title: 'AWS Cloud Architecture & Networking',
        week: 'Week 1-2',
        duration: '6h 30m',
        completed: 4,
        total: 4,
        lessons: [
          { id: 'cd-1-1', title: 'AWS VPC, Subnets, Internet Gateways & Route Tables', duration: '55m', completed: true, videoId: 'Ia-UEYYR44s', summary: 'Designing isolated public and private cloud network topologies.' },
          { id: 'cd-1-2', title: 'EC2 Compute Instances, Auto Scaling & Load Balancers', duration: '1h 05m', completed: true, videoId: 'Ia-UEYYR44s', summary: 'Target groups, health checks, and elastic scale configurations.' },
          { id: 'cd-1-3', title: 'S3 Object Storage, IAM Roles & Principle of Least Privilege', duration: '50m', completed: true, videoId: 'SOTamWNgDKc', summary: 'Zero-trust IAM policy engineering and bucket security.' },
          { id: 'cd-1-4', title: 'Route53 DNS Management & CloudFront CDN Caching', duration: '45m', completed: true, videoId: 'Ia-UEYYR44s', summary: 'Global edge distribution and SSL certificate automation with ACM.' }
        ]
      },
      {
        id: 'cd-2',
        title: 'Kubernetes Cluster Orchestration & Helm',
        week: 'Week 3-4',
        duration: '7h 45m',
        completed: 2,
        total: 4,
        lessons: [
          { id: 'cd-2-1', title: 'Kube Architecture: Control Plane, API Server & kubelet', duration: '1h 00m', completed: true, videoId: 'X48VuDVv0do', summary: 'Worker nodes, etcd distributed state, and scheduler mechanics.' },
          { id: 'cd-2-2', title: 'Pods, Deployments, ReplicaSets & Rolling Upgrades', duration: '1h 15m', completed: true, videoId: 'X48VuDVv0do', summary: 'Zero-downtime rolling updates and rollback strategies.' },
          { id: 'cd-2-3', title: 'Services (ClusterIP, NodePort, LoadBalancer) & Ingress', duration: '1h 10m', completed: false, videoId: 'X48VuDVv0do', summary: 'Exposing microservices and NGINX ingress routing.' },
          { id: 'cd-2-4', title: 'Helm Charts: Templating & Versioning Cloud Apps', duration: '55m', completed: false, videoId: 'X48VuDVv0do', summary: 'Package management and configuration values across environments.' }
        ]
      }
    ],
    materials: [
      { id: 'mat-cd-1', title: 'AWS Certified Solutions Architect Study Notes (PDF)', size: '8.4 MB', type: 'PDF Book', downloads: 3820 },
      { id: 'mat-cd-2', title: 'Kubernetes Production YAML Templates & Helm Charts', size: '5.6 MB', type: 'Source Code', downloads: 2740 },
      { id: 'mat-cd-3', title: 'Terraform Multi-Region AWS Infrastructure Blueprint', size: '2.1 MB', type: 'Source Code', downloads: 1980 }
    ],
    quizzes: [
      {
        id: 'q-cd-1',
        title: 'Week 2 Quiz: AWS Networking & Security Protocols',
        duration: '15 Mins',
        totalQuestions: 2,
        questions: [
          {
            q: 'Which component is required in a VPC to allow instances in a private subnet to initiate outbound internet traffic while blocking inbound connections?',
            options: ['Internet Gateway (IGW)', 'NAT Gateway placed in a public subnet', 'Direct Connect Gateway', 'Virtual Private Gateway'],
            answer: 1,
            explanation: 'A NAT Gateway translates traffic from private subnet instances so they can reach the public internet without exposing their private IPs to incoming traffic.'
          },
          {
            q: 'In Kubernetes, what is the default Service type if no type is explicitly specified in the YAML manifest?',
            options: ['NodePort', 'LoadBalancer', 'ClusterIP', 'ExternalName'],
            answer: 2,
            explanation: 'ClusterIP is the default service type, which exposes the service on an internal cluster IP accessible only within the cluster.'
          }
        ]
      }
    ],
    assignment: {
      title: 'DevOps Capstone: Zero-Downtime CI/CD Pipeline to AWS EKS with Terraform',
      deadline: 'Nov 25, 2026',
      status: 'Pending Review',
      rubric: [
        'Modular Terraform IaC for VPC and EKS (25%)',
        'Dockerized microservices deployed via Helm (25%)',
        'GitHub Actions pipeline with security scans (25%)',
        'Prometheus & Grafana metrics dashboard (25%)'
      ]
    }
  }
}

export default function LMSPortal() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('modules') // 'modules' | 'materials' | 'quizzes' | 'assignments'
  const [selectedDomainKey, setSelectedDomainKey] = useState('full-stack')
  const [activeLessonModal, setActiveLessonModal] = useState(null)
  const [activeQuizModal, setActiveQuizModal] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)

  const { user, login, logout } = useAuth()
  const currentDomain = domainCurriculums[selectedDomainKey] || domainCurriculums['full-stack']

  // Modal State for LMS Access
  const [authMode, setAuthMode] = useState('register') // 'register' | 'login'
  const [selectedPlan, setSelectedPlan] = useState('advanced') // 'foundation' | 'advanced'
  const [paymentOption, setPaymentOption] = useState('reserve') // 'reserve' | 'full'
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    track: 'Full Stack Web Development (MERN & Next.js)'
  })
  const [trackDropdownOpen, setTrackDropdownOpen] = useState(false)
  const [trackSearch, setTrackSearch] = useState('')
  const trackDropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (trackDropdownRef.current && !trackDropdownRef.current.contains(event.target)) {
        setTrackDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredTracks = LMS_TRACK_OPTIONS.filter((t) =>
    t.toLowerCase().includes(trackSearch.toLowerCase())
  )

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Current amount calculation
  const currentAmount = paymentOption === 'reserve'
    ? 1000
    : selectedPlan === 'foundation' ? 3000 : 3500

  const handleRegisterAndPay = (e) => {
    e?.preventDefault()
    if (!regForm.name.trim() || !regForm.email.trim() || !regForm.phone.trim()) {
      toast.error('Please enter your Name, Email, and WhatsApp number')
      return
    }

    setIsSubmitting(true)

    // Fire background student pre-registration to backend (non-blocking)
    try {
      api.post('/api/auth/register', {
        name: regForm.name.trim(),
        email: regForm.email.trim().toLowerCase(),
        password: 'LmsUser@2026',
        phone: regForm.phone.trim(),
        domain: regForm.track,
        batchPreference: selectedPlan === 'advanced' ? 'Advanced Track' : 'Foundation Track'
      }).catch(() => null)
    } catch (_) {}

    // Determine target Razorpay payment link
    let targetLink = LMS_PAYMENT_LINKS.reserve
    if (paymentOption === 'full') {
      targetLink = selectedPlan === 'foundation'
        ? LMS_PAYMENT_LINKS.foundation_full
        : LMS_PAYMENT_LINKS.advanced_full
    }

    toast.success(`Redirecting to secure Razorpay checkout (₹${currentAmount.toLocaleString()})...`, {
      icon: '🔒'
    })
    setTimeout(() => {
      window.location.href = targetLink
    }, 400)
  }

  const handleLoginSubmit = async (e) => {
    e?.preventDefault()
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      toast.error('Please enter both Email and LMS Password')
      return
    }

    setIsSubmitting(true)
    try {
      await login(loginForm.email.trim(), loginForm.password.trim())
      toast.success('Welcome back to Mivexo LMS!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid LMS credentials. Please verify your email and password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate live domain progress
  const totalLessons = currentDomain.modules.reduce((acc, m) => acc + m.total, 0)
  const completedLessons = currentDomain.modules.reduce((acc, m) => acc + m.completed, 0)
  const progressPercent = Math.round((completedLessons / (totalLessons || 1)) * 100)

  // Quiz Handling
  const handleAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleQuizSubmit = (quiz) => {
    let score = 0
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        score++
      }
    })
    const percentage = Math.round((score / quiz.questions.length) * 100)
    setQuizScore({ score, total: quiz.questions.length, percentage })
    setQuizSubmitted(true)
    if (percentage >= 75) {
      toast.success(`Congratulations! Passed with ${percentage}% 🎉`)
    } else {
      toast.error(`Scored ${percentage}%. Review explanations and try again!`)
    }
  }

  const resetQuiz = () => {
    setUserAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }

  // Persist completed lessons in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const saved = localStorage.getItem('mivexo_lms_progress')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  const markLessonComplete = (lessonId) => {
    setCompletedLessonIds(prev => {
      const updated = { ...prev, [lessonId]: true }
      localStorage.setItem('mivexo_lms_progress', JSON.stringify(updated))
      return updated
    })
    toast.success('Lesson completed! Progress saved.')
    setActiveLessonModal(null)
  }

  const handleDownloadMaterial = (title) => {
    toast.success(`Downloading "${title}"...`)
  }

  // Access Restriction Gate: Modernized Register / Login Modal
  if (!user) {
    return (
      <div className="min-h-screen bg-[#070714] text-white flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
        {/* Radiant Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
        
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.3) 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />

        {/* Modal Card */}
        <div className="w-full max-w-2xl relative z-10 my-4">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[#0f0f23]/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-5 sm:p-8 relative overflow-hidden"
          >
            {/* Top Accent Line - Professional Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600" />

            {/* HEADER */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">MIVEXO LMS PORTAL</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {authMode === 'register' ? 'Register or Reserve Seat' : 'Student LMS Login'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {authMode === 'register'
                    ? 'Secure Razorpay checkout · Instant access credentials'
                    : 'Enter your student credentials to access your modules & assignments.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close and return to Home"
              >
                <X size={18} />
              </button>
            </div>

            {/* PROMINENT MODE SWITCHER: REGISTER VS LOGIN - Professional Colors */}
            <div className="grid grid-cols-2 p-1 bg-slate-950/80 border border-slate-800 rounded-2xl mb-6 shadow-inner">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles size={15} className={authMode === 'register' ? 'text-amber-300' : ''} />
                <span>Enroll / Reserve Seat</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock size={15} className={authMode === 'login' ? 'text-violet-200' : ''} />
                <span>Login to LMS</span>
              </button>
            </div>

            {/* AUTH MODE: REGISTER & ENROLL */}
            {authMode === 'register' ? (
              <form onSubmit={handleRegisterAndPay} className="space-y-5">
                
                {/* 1. SELECT PLAN */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                      <Layers size={13} className="text-slate-400" /> SELECT PLAN
                    </label>
                    <span className="text-[11px] text-gray-400">Choose training tier</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Foundation */}
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('foundation')}
                      className={`relative p-4 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                        selectedPlan === 'foundation'
                          ? 'border-cyan-500/70 bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-[#0e1628] shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Foundation</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPlan === 'foundation' ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-gray-500'
                        }`}>
                          {selectedPlan === 'foundation' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white">₹3,000</div>
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                          Complete Internship &amp; Core Training with full LMS access &amp; Certificate.
                        </p>
                      </div>
                    </button>

                    {/* Advanced */}
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('advanced')}
                      className={`relative p-4 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                        selectedPlan === 'advanced'
                          ? 'border-violet-500/70 bg-gradient-to-br from-violet-950/30 via-slate-900/80 to-[#140e2b] shadow-lg shadow-violet-500/15 ring-1 ring-violet-500/40'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Advanced</span>
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs">
                            POPULAR
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPlan === 'advanced' ? 'border-violet-400 bg-violet-500 text-white' : 'border-gray-500'
                        }`}>
                          {selectedPlan === 'advanced' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white">₹3,500</div>
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                          Full Placement Accelerator, 1-on-1 Mentorship, Capstone &amp; Direct Referrals.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. PAYMENT OPTION */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                      <CreditCard size={13} className="text-amber-400" /> PAYMENT OPTION
                    </label>
                    <span className="text-[11px] text-gray-400">Seat Booking vs Full Payment</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Reserve Seat */}
                    <button
                      type="button"
                      onClick={() => setPaymentOption('reserve')}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between cursor-pointer ${
                        paymentOption === 'reserve'
                          ? 'border-amber-500/60 bg-gradient-to-br from-amber-950/25 via-slate-900/80 to-[#1c1508] shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Reserve Seat</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            Flexible
                          </span>
                        </div>
                        <div className="text-xl font-black text-amber-400 mt-1">₹1,000</div>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Pre-registration for both plans (Balance paid at batch start)
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        paymentOption === 'reserve' ? 'border-amber-400 bg-amber-500' : 'border-gray-500'
                      }`}>
                        {paymentOption === 'reserve' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>

                    {/* Pay in Full */}
                    <button
                      type="button"
                      onClick={() => setPaymentOption('full')}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between cursor-pointer ${
                        paymentOption === 'full'
                          ? 'border-emerald-500/60 bg-gradient-to-br from-emerald-950/25 via-slate-900/80 to-[#0b1c13] shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Pay in Full</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Instant Access
                          </span>
                        </div>
                        <div className="text-xl font-black text-emerald-400 mt-1">
                          ₹{selectedPlan === 'foundation' ? '3,000' : '3,500'}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          One-time complete payment, zero future installments
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        paymentOption === 'full' ? 'border-emerald-400 bg-emerald-500' : 'border-gray-500'
                      }`}>
                        {paymentOption === 'full' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* 3. STUDENT REGISTRATION DETAILS */}
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
                      <div className="relative group">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                        <input
                          type="text"
                          required
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-slate-700/80 focus:border-violet-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
                      <div className="relative group">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="e.g. rahul@gmail.com"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-slate-700/80 focus:border-violet-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">WhatsApp / Phone</label>
                      <div className="relative group">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                        <input
                          type="tel"
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-slate-700/80 focus:border-violet-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* CUSTOM DESIGNED TRACK SELECTION DROPDOWN */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Select Program Track</label>
                      <div className="relative" ref={trackDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setTrackDropdownOpen(!trackDropdownOpen)}
                          className={`w-full px-3 py-2.5 bg-slate-900/60 border rounded-xl text-xs text-white flex items-center justify-between gap-2 transition-all cursor-pointer text-left ${
                            trackDropdownOpen
                              ? 'border-violet-500 ring-1 ring-violet-500/40 bg-slate-900'
                              : 'border-slate-700/80 hover:border-violet-500/50'
                          }`}
                        >
                          <span className="truncate font-medium">{regForm.track}</span>
                          <ChevronDown
                            size={14}
                            className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                              trackDropdownOpen ? 'rotate-180 text-violet-400' : ''
                            }`}
                          />
                        </button>

                        {/* Styled Dropdown Menu */}
                        {trackDropdownOpen && (
                          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0c0d1c] border border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-950/50 p-2 backdrop-blur-xl">
                            {/* Search Filter */}
                            <div className="relative mb-2">
                              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                              <input
                                type="text"
                                value={trackSearch}
                                onChange={(e) => setTrackSearch(e.target.value)}
                                placeholder="Search 20 specialization tracks..."
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-700 focus:border-violet-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
                                autoFocus
                              />
                            </div>

                            {/* Track List */}
                            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                              {filteredTracks.map((track, i) => {
                                const isSelected = regForm.track === track
                                return (
                                  <div
                                    key={i}
                                    onClick={() => {
                                      setRegForm({ ...regForm, track })
                                      setTrackDropdownOpen(false)
                                      setTrackSearch('')
                                    }}
                                    className={`px-3 py-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${
                                      isSelected
                                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-sm shadow-violet-500/30'
                                        : 'text-slate-300 hover:bg-violet-950/40 hover:text-violet-200'
                                    }`}
                                  >
                                    <span className="truncate">{track}</span>
                                    {isSelected && <Check size={14} className="shrink-0 text-white ml-2" />}
                                  </div>
                                )
                              })}
                              {filteredTracks.length === 0 && (
                                <p className="text-center text-xs text-gray-500 py-3">No matching tracks found</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. SUMMARY & ENROLL NOW BUTTON - Professional Violet Gradient */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {paymentOption === 'reserve' ? 'RESERVE SEAT — PAY ₹1,000' : `ENROLL NOW — PAY ₹${currentAmount.toLocaleString()}`}
                    </span>
                    <ArrowUpRight size={17} />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>100% Secure Razorpay Checkout · Instant LMS Credentials on Enrollment</span>
                  </div>
                </div>
              </form>
            ) : (
              /* AUTH MODE: MEMBER LOGIN - Professional Colors */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-indigo-950/30 border border-violet-800/40 text-xs text-slate-300">
                  <div className="flex items-center gap-2 font-bold mb-1 text-violet-200">
                    <Lock size={14} className="text-violet-400" /> Enrolled Member Credentials
                  </div>
                  Please sign in using the email and LMS password dispatched to your email &amp; WhatsApp following verified registration.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 focus:border-violet-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">LMS Password</label>
                  <div className="relative group">
                    <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors" />
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 focus:border-violet-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <BookOpen size={16} />
                    <span>{isSubmitting ? 'Verifying...' : 'Sign In to LMS Dashboard ↗'}</span>
                  </button>
                </div>

                <div className="text-center pt-2 border-t border-slate-800">
                  <p className="text-xs text-slate-400">
                    Don&apos;t have credentials yet?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-violet-400 hover:text-violet-300 hover:underline font-bold transition-colors"
                    >
                      Reserve Seat / Enroll Now for ₹1,000 ↗
                    </button>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-[#0B0B1A] text-slate-900 dark:text-slate-100 font-sans">

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#13132E] border-r-2 border-gray-200 dark:border-gray-800 shadow-2xl lg:shadow-none transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}>
        
        {/* Brand Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={mivexoLogo}
              alt="MIVEXO LMS"
              className="h-7 w-auto object-contain group-hover:scale-105 transition-transform dark:brightness-0 dark:invert"
            />
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">LMS</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Student Badge Card */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-[#1A1A3A] dark:to-[#171736] border-2 border-violet-200 dark:border-violet-700/60 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
              {user?.name?.[0]?.toUpperCase() || 'P'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                {user?.name || 'Enrolled Student'}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-0.5" />
                Paid Member Pass · Batch 2026
              </span>
            </div>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <nav className="px-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-1">
            Learning Desk
          </div>

          {[
            { id: 'modules', label: 'Course Modules & Lessons', icon: Layers, count: `${completedLessons}/${totalLessons}` },
            { id: 'materials', label: 'Study Material & Notes', icon: FolderDown, count: `${currentDomain.materials.length}` },
            { id: 'quizzes', label: 'Weekly Quizzes', icon: HelpCircle, count: `${currentDomain.quizzes.length}` },
            { id: 'assignments', label: 'Capstone Project & Tasks', icon: FileText, count: '1 Active' },
            { id: 'roadmap', label: 'Learning Path', icon: Map, count: `${currentDomain.modules.length} Stages` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25 scale-[1.02]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}

          {/* Quick Shortcuts */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-1">
            Platform Shortcuts
          </div>
          <Link
            to="/placement"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 transition-colors"
          >
            <Laptop size={16} className="text-violet-500" />
            Placement Practice Lab
          </Link>
          <Link
            to="/certificates"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 transition-colors"
          >
            <Award size={16} className="text-amber-500" />
            Verified Certificate Gallery
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t-2 border-gray-200 dark:border-gray-800 mt-auto">
          <Link to="/" className="w-full mb-2 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Home size={14} /> Back to MIVEXO Home
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">

        {/* TOP STATUS BAR WITH DOMAIN SWITCHER */}
        <header className="bg-white dark:bg-[#13132E] border-b-2 border-gray-200 dark:border-gray-800 px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-200"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Current Specialization
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                  {progressPercent}% Complete
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                {currentDomain.name}
              </h1>
            </div>
          </div>

          {/* Domain Selector Dropdown (Allows switching to study materials for any domain) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden md:inline">
                Switch Domain:
              </span>
              <select
                value={selectedDomainKey}
                onChange={(e) => {
                  setSelectedDomainKey(e.target.value)
                  resetQuiz()
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-violet-300 dark:border-violet-700 font-bold text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-600 cursor-pointer shadow-xs"
              >
                <option value="full-stack">Full Stack (MERN & Next.js)</option>
                <option value="ai-ml">Artificial Intelligence & Deep Learning</option>
                <option value="cloud-devops">Cloud Computing & DevOps</option>
              </select>
            </div>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main className="p-5 sm:p-8 space-y-7 max-w-7xl mx-auto w-full">

          {/* DOMAIN PROGRESS HERO BANNER */}
          <section className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
                  Interactive LMS Track
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-2 text-white">
                  {currentDomain.name}
                </h2>
                <p className="text-xs sm:text-sm text-violet-100 leading-relaxed font-medium">
                  {currentDomain.description}
                </p>
              </div>

              {/* Progress Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 shrink-0 min-w-64">
                <div className="flex items-center justify-between text-xs font-bold text-violet-100 mb-2">
                  <span>Track Mastery</span>
                  <span className="text-white font-black text-sm">{progressPercent}%</span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-violet-200 mt-2 font-semibold">
                  <span>{completedLessons} of {totalLessons} lessons done</span>
                  <span>{progressPercent >= 80 ? '🏆 Certificate Ready' : '4 lessons to unlock Cert'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* TAB 1: MODULES & VIDEO LESSONS */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Curriculum Modules &amp; Video Lessons
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Step-by-step masterclasses with video walkthroughs, code walkthroughs, and assessments.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {currentDomain.modules.map((mod, mIdx) => (
                  <div
                    key={mod.id}
                    className="rounded-3xl bg-white dark:bg-[#161633] border-2 border-gray-200 dark:border-gray-700/80 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Module Title Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                          {mIdx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                              {mod.week}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              ⏱️ {mod.duration}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                            {mod.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {mod.completed}/{mod.total} Completed
                        </span>
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-600 rounded-full"
                            style={{ width: `${Math.round((mod.completed / mod.total) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lessons Grid */}
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          onClick={() => setActiveLessonModal(lesson)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                            lesson.completed
                              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 hover:border-emerald-500'
                              : 'bg-slate-50 dark:bg-slate-900/60 border-gray-200 dark:border-gray-700 hover:border-violet-500 hover:bg-white dark:hover:bg-[#1A1A3C]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              lesson.completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300'
                            }`}>
                              {lesson.completed ? <CheckCircle size={15} /> : <Play size={13} className="ml-0.5" />}
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                                {lesson.title}
                              </h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                                {lesson.summary}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2">
                                <Clock size={11} /> {lesson.duration} · Click to Launch Lesson
                              </span>
                            </div>
                          </div>

                          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-violet-500 transition-all shrink-0 mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: STUDY MATERIALS & DOWNLOADS */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Downloadable Study Materials, Notes &amp; Starter Repositories
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Comprehensive PDF cheatsheets, GitHub code boilerplates, and interview preparation guides.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentDomain.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#161633] border-2 border-gray-200 dark:border-gray-700/80 shadow-sm hover:shadow-xl hover:border-violet-500 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                          <FolderDown size={22} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/50 px-2.5 py-1 rounded-full">
                          {mat.type}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-2 leading-snug">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        File Size: <strong>{mat.size}</strong> · {mat.downloads}+ active downloads
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Free for Students
                      </span>
                      <button
                        onClick={() => handleDownloadMaterial(mat.title)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/20 transition-all cursor-pointer"
                      >
                        <Download size={13} /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WEEKLY QUIZZES */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Interactive Weekly Knowledge Quizzes
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Test your understanding after each module. Score 75% or above to qualify for verified certificate endorsements.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentDomain.quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#161633] border-2 border-gray-200 dark:border-gray-700/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                          Active Quiz Pack
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock size={13} /> {quiz.duration}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        Covers essential algorithmic concepts, production best practices, and interview coding MCQs for this specialization.
                      </p>

                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>📝 {quiz.totalQuestions} Questions</span>
                        <span>·</span>
                        <span>🎯 Passing Score: 75%</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                        Immediate Automated Grading
                      </span>
                      <button
                        onClick={() => {
                          setActiveQuizModal(quiz)
                          resetQuiz()
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-violet-500/25 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        Start Quiz Now <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CAPSTONE ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Capstone Project Deliverable &amp; Mentorship Evaluation
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Submit your real-world project repository and live URL to receive 1-on-1 feedback from senior tech reviewers.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Project Brief */}
                <div className="lg:col-span-2 p-7 rounded-3xl bg-white dark:bg-[#161633] border-2 border-gray-200 dark:border-gray-700/80 shadow-md space-y-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                      Primary Capstone
                    </span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mt-3 mb-2">
                      {currentDomain.assignment.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      Design, build, and deploy an end-to-end production solution. Your project must include modular architecture, automated test coverage, and a comprehensive README documentation.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                      Evaluation Rubric Criteria (100 Points Total):
                    </h5>
                    <div className="space-y-2.5">
                      {currentDomain.assignment.rubric.map((r, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-semibold p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-gray-800">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submission Form Card */}
                <div className="p-7 rounded-3xl bg-white dark:bg-[#161633] border-2 border-gray-200 dark:border-gray-700/80 shadow-md flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white mb-2">
                      Submit Your Project
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium">
                      Ensure your GitHub repository is public or has invite access granted.
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); toast.success('Capstone Project Submitted! A mentor will review within 48h.'); }} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                          GitHub Repository URL *
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://github.com/your-username/project"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                          Live Deployed App URL *
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://my-app.vercel.app"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                          Notes / Architecture Details
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief explanation of your tech stack and setup..."
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-violet-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all cursor-pointer"
                      >
                        <Send size={14} /> Submit Capstone for Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEARNING PATH / ROADMAP TAB */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Structured Learning Roadmap</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Your end-to-end curriculum path from beginner to job-ready professional.</p>
              </div>

              <div className="relative">
                {/* Vertical line connector */}
                <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-violet-500 via-indigo-500 to-emerald-500 opacity-30" />

                <div className="space-y-4">
                  {currentDomain.modules.map((mod, mIdx) => {
                    const isComplete = mod.completed === mod.total
                    const inProgress = mod.completed > 0 && !isComplete
                    return (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: mIdx * 0.1 }}
                        onClick={() => { setActiveTab('modules') }}
                        className="flex gap-5 cursor-pointer group"
                      >
                        {/* Step indicator */}
                        <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg shadow-lg transition-transform group-hover:scale-105 ${
                          isComplete ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30' :
                          inProgress ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-violet-500/30' :
                          'bg-white dark:bg-[#161633] border-2 border-gray-300 dark:border-gray-700 text-slate-400'
                        }`}>
                          {isComplete ? <CheckCircle size={24} /> : mIdx + 1}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 p-5 rounded-2xl border-2 transition-all ${
                          isComplete ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60' :
                          inProgress ? 'bg-violet-50 dark:bg-violet-950/20 border-violet-400 dark:border-violet-700' :
                          'bg-white dark:bg-[#161633] border-gray-200 dark:border-gray-700 group-hover:border-violet-400'
                        }`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  isComplete ? 'bg-emerald-600 text-white' :
                                  inProgress ? 'bg-violet-600 text-white' :
                                  'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}>
                                  {isComplete ? '✓ Complete' : inProgress ? '● In Progress' : mod.week}
                                </span>
                                <span className="text-[10px] text-slate-500 font-semibold">⏱ {mod.duration}</span>
                              </div>
                              <h4 className="font-black text-slate-900 dark:text-white text-base">{mod.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mod.completed}/{mod.total} lessons completed</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-lg font-black text-slate-900 dark:text-white">{Math.round((mod.completed / mod.total) * 100)}%</div>
                              <div className="text-[10px] text-slate-500">Progress</div>
                              <div className="mt-2 w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-violet-500'}`} style={{ width: `${Math.round((mod.completed / mod.total) * 100)}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Lessons preview */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {mod.lessons.map(lesson => (
                              <span key={lesson.id} className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                                lesson.completed
                                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}>
                                {lesson.completed ? '✓' : '○'} {lesson.title.slice(0, 28)}{lesson.title.length > 28 ? '...' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Free Resources section */}
              <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800/60">
                <h4 className="font-black text-slate-900 dark:text-white text-lg mb-2">📚 Free Learning Resources</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">All video lessons in this track are sourced from top free educational channels on YouTube.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
                    { name: 'Fireship', url: 'https://www.youtube.com/@Fireship', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' },
                    { name: 'freeCodeCamp', url: 'https://www.youtube.com/@freecodecamp', color: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' },
                    { name: '3Blue1Brown', url: 'https://www.youtube.com/@3blue1brown', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
                    { name: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldwithNana', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' },
                    { name: 'The Net Ninja', url: 'https://www.youtube.com/@NetNinja', color: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400' },
                  ].map((ch, i) => (
                    <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs transition-transform hover:scale-105 ${ch.color}`}>
                      <ExternalLink size={13} /> {ch.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* LESSON VIDEO & NOTES PLAYER MODAL */}
      <AnimatePresence>
        {activeLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#161633] rounded-3xl max-w-3xl w-full border-2 border-gray-300 dark:border-gray-700 shadow-2xl overflow-hidden my-8"
            >
              {/* Real YouTube Video Player */}
              <div className="relative aspect-video bg-slate-950">
                {activeLessonModal.videoId ? (
                  <iframe
                    key={activeLessonModal.videoId}
                    src={`https://www.youtube-nocookie.com/embed/${activeLessonModal.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                    title={activeLessonModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-violet-600/90 flex items-center justify-center shadow-xl mb-4">
                      <Play size={28} className="ml-1" />
                    </div>
                    <h4 className="text-lg font-black max-w-lg">{activeLessonModal.title}</h4>
                    <p className="text-xs text-slate-300 mt-2">⏱️ {activeLessonModal.duration} · Video Loading...</p>
                  </div>
                )}
                <button
                  onClick={() => setActiveLessonModal(null)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Lesson Details & Takeaways */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full">
                    Lesson Transcript &amp; Summary
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={14} /> MIVEXO Accredited Lesson
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeLessonModal.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {activeLessonModal.summary}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-gray-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  💡 <strong>Hands-on Exercise:</strong> Clone the starter code repository, implement the patterns demonstrated in this lecture, and test boundary edge cases.
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveLessonModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => markLessonComplete(activeLessonModal.id)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Mark as Completed &amp; Next
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE WEEKLY QUIZ MODAL */}
      <AnimatePresence>
        {activeQuizModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#161633] rounded-3xl max-w-2xl w-full border-2 border-gray-300 dark:border-gray-700 shadow-2xl p-6 sm:p-8 my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    Live Assessment Simulator
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {activeQuizModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {activeQuizModal.questions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-gray-800 space-y-3"
                  >
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      Q{qIdx + 1}. {q.q}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[qIdx] === optIdx
                        const isCorrect = q.answer === optIdx
                        let btnStyle = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-violet-500'

                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 font-bold'
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-violet-600 bg-violet-50 dark:bg-violet-900/40 text-violet-900 dark:text-white font-bold shadow-xs'
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleAnswerSelect(qIdx, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border-2 text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <CheckCircle size={15} className="text-emerald-500 shrink-0 ml-2" />}
                          </button>
                        )
                      })}
                    </div>

                    {/* Explanation when submitted */}
                    {quizSubmitted && (
                      <div className="mt-2 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-[11px] font-semibold text-violet-800 dark:text-violet-200 border border-violet-200 dark:border-violet-800">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quiz Results & Action */}
              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                {quizSubmitted && quizScore ? (
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white ${
                      quizScore.percentage >= 75 ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}>
                      {quizScore.percentage}%
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 dark:text-white">
                        {quizScore.percentage >= 75 ? 'Quiz Passed! Certificate Endorsed' : 'Needs Practice'}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {quizScore.score} of {quizScore.total} questions answered correctly
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Answer all questions before submitting.
                  </span>
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {quizSubmitted ? (
                    <button
                      onClick={resetQuiz}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-700 font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Retake Quiz
                    </button>
                  ) : (
                    <button
                      onClick={() => handleQuizSubmit(activeQuizModal)}
                      className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black text-xs shadow-lg shadow-violet-500/25 cursor-pointer"
                    >
                      Submit Quiz for Evaluation
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
