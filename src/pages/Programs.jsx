import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Clock, Users, Star, ArrowRight, BookOpen, CheckCircle, Code, Layers, Sparkles, X, Laptop, Briefcase, Zap, Shield, Globe, Cpu, Smartphone, BarChart3, Database } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import ScrollReveal from '../components/ui/ScrollReveal'

// 20 Trending Domains with curated images, modules and career tracks
const trending20Programs = [
  {
    id: 'prog-1',
    title: 'Full Stack Web Development (MERN & Next.js)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 420,
    rating: 4.9,
    tag: 'Trending #1',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80',
    color: 'from-violet-500 to-indigo-500',
    skills: ['React 18', 'Next.js 14', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Docker'],
    description: 'Master full-stack engineering. Build high-concurrency microservices, modern responsive SPAs, and production cloud APIs.',
    prerequisites: 'Basic HTML/CSS and core programming fundamentals.',
    capstone: 'Build and deploy a multi-tenant SaaS workspace with real-time WebSockets and Stripe/Razorpay billing.',
    modules: [
      { week: 'Weeks 1-3', title: 'Modern React & Next.js 14 Architecture', topics: ['Server Components & Client State', 'React Hooks deep dive (useMemo, useCallback)', 'Dynamic routing & SSR/SSG caching', 'Responsive design with Tailwind CSS'] },
      { week: 'Weeks 4-6', title: 'Backend APIs with Node.js & Express', topics: ['Asynchronous event loop & streaming', 'RESTful & GraphQL API design', 'JWT authentication & role authorization', 'Rate-limiting & security headers'] },
      { week: 'Weeks 7-9', title: 'Database Design & Optimization', topics: ['MongoDB aggregation pipelines', 'PostgreSQL schema modeling & relations', 'Redis caching layer', 'Database indexing & transactions'] },
      { week: 'Weeks 10-12', title: 'DevOps, Capstone & Mock Interviews', topics: ['Docker multi-stage builds', 'GitHub Actions CI/CD pipelines', 'Deployment to AWS/Render', 'Technical interview prep & code review'] }
    ]
  },
  {
    id: 'prog-2',
    title: 'Artificial Intelligence & Deep Learning',
    domain: 'Technical',
    duration: '4 months',
    enrolled: 380,
    rating: 4.9,
    tag: 'Hot Track',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&auto=format&fit=crop&q=80',
    color: 'from-orange-500 to-amber-500',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'Transformers', 'Computer Vision', 'RAG'],
    description: 'From deep neural networks and convolutional vision systems to generative AI, transformer architectures, and RAG pipelines.',
    prerequisites: 'Python programming and fundamental linear algebra.',
    capstone: 'Enterprise RAG question-answering system with vector search database (Pinecone/Chroma) and custom LLM prompt pipeline.',
    modules: [
      { week: 'Weeks 1-4', title: 'Neural Networks & PyTorch Fundamentals', topics: ['Perceptrons, backprop & autograd', 'Optimizers (AdamW, SGD) & loss functions', 'PyTorch tensor operations', 'Regularization & Dropout'] },
      { week: 'Weeks 5-8', title: 'Computer Vision & Convolutional Nets', topics: ['CNN architectures (ResNet, EfficientNet)', 'Transfer learning with pre-trained weights', 'Object detection with YOLO', 'Image augmentation techniques'] },
      { week: 'Weeks 9-12', title: 'NLP, Attention & Transformers', topics: ['Tokenization & Word Embeddings', 'Transformer attention heads', 'HuggingFace ecosystem & BERT', 'Fine-tuning models on domain text'] },
      { week: 'Weeks 13-16', title: 'Generative AI & LLM Systems', topics: ['Retrieval Augmented Generation (RAG)', 'Vector DBs (Chroma, Pinecone)', 'LangChain & LlamaIndex frameworks', 'AI deployment & latency benchmarking'] }
    ]
  },
  {
    id: 'prog-3',
    title: 'Data Science & Machine Learning',
    domain: 'Analytics',
    duration: '4 months',
    enrolled: 310,
    rating: 4.8,
    tag: 'High Placement',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80',
    color: 'from-emerald-500 to-teal-500',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Statistics', 'Power BI'],
    description: 'Transform complex raw data into predictive intelligence and statistical decision models with Python, SQL, and Scikit-Learn.',
    prerequisites: 'Basic math and logical thinking.',
    capstone: 'End-to-end customer lifetime value & churn prediction system deployed with interactive Streamlit app.',
    modules: [
      { week: 'Weeks 1-4', title: 'Data Cleaning & Advanced SQL', topics: ['Pandas dataframes & vectorization', 'Complex SQL joins, CTEs, and Window functions', 'Data imputation & anomaly handling', 'Seaborn & Plotly interactive visual storytelling'] },
      { week: 'Weeks 5-8', title: 'Inferential Statistics & EDA', topics: ['Hypothesis testing (p-values, Z/T tests)', 'ANOVA & Chi-square distributions', 'Feature correlation & multicollinearity', 'Principal Component Analysis (PCA)'] },
      { week: 'Weeks 9-12', title: 'Predictive Machine Learning', topics: ['Linear & Logistic Regression', 'Decision Trees, Random Forests, XGBoost', 'Model evaluation (ROC-AUC, F1-Score)', 'Hyperparameter tuning with Optuna'] },
      { week: 'Weeks 13-16', title: 'Production Deployment & Projects', topics: ['Streamlit/Gradio web dashboard', 'Deploying models as REST inference endpoints', 'Model drift monitoring', 'Industry mock interview rounds'] }
    ]
  },
  {
    id: 'prog-4',
    title: 'Cloud Computing & DevOps Engineering',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 290,
    rating: 4.8,
    tag: 'Enterprise Need',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-cyan-500',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Linux'],
    description: 'Master enterprise cloud infrastructure. Deploy containerized microservices, build zero-downtime CI/CD pipelines, and write IaC.',
    prerequisites: 'Basic command line & general programming concepts.',
    capstone: 'Automated multi-region Kubernetes cluster deployment managed via Terraform and GitHub Actions.',
    modules: [
      { week: 'Weeks 1-3', title: 'Linux Systems & AWS Cloud Architecture', topics: ['Bash scripting & Linux system internals', 'AWS VPC, EC2, S3, IAM, and Security Groups', 'Cloud networking & DNS routing with Route53', 'Cost budgeting & autoscaling'] },
      { week: 'Weeks 4-6', title: 'Docker Containerization & Microservices', topics: ['Dockerfiles & multi-stage image optimization', 'Docker Compose multi-container networks', 'Volume persistence & configuration binds', 'Security scanning with Trivy'] },
      { week: 'Weeks 7-9', title: 'Kubernetes Orchestration & Helm', topics: ['Pods, Deployments, Services, and Ingress', 'ConfigMaps & Secrets management', 'Persistent Volume Claims (PVC)', 'Packaging charts with Helm'] },
      { week: 'Weeks 10-12', title: 'Infrastructure as Code (Terraform) & Monitoring', topics: ['Terraform state management & modules', 'GitHub Actions automated testing & deployment', 'Prometheus & Grafana telemetry', 'DevOps interview case questions'] }
    ]
  },
  {
    id: 'prog-5',
    title: 'Cybersecurity & Ethical Hacking',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 240,
    rating: 4.7,
    tag: 'Critical Skill',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80',
    color: 'from-red-500 to-rose-600',
    skills: ['Network Security', 'OWASP Top 10', 'Penetration Testing', 'Kali Linux', 'Burp Suite'],
    description: 'Learn offensive and defensive security tactics. Conduct vulnerability assessments, exploit web vulnerabilities, and secure enterprise networks.',
    prerequisites: 'Basic networking and operating system fundamentals.',
    capstone: 'Comprehensive penetration testing report and vulnerability remediation playbook on a simulated banking system.',
    modules: [
      { week: 'Weeks 1-3', title: 'Network Defense & Protocol Analysis', topics: ['TCP/IP stack, Wireshark packet capture', 'Firewalls, IDS/IPS configuration', 'Reconnaissance using Nmap and Shodan', 'Linux security hardening'] },
      { week: 'Weeks 4-6', title: 'Web Application Security (OWASP)', topics: ['SQL Injection & Blind SQLi attacks', 'Cross-Site Scripting (XSS) & CSRF', 'Broken Authentication & Access Control', 'Burp Suite proxy manipulation'] },
      { week: 'Weeks 7-9', title: 'Exploitation & Privilege Escalation', topics: ['Metasploit framework & payload crafting', 'Linux & Windows privilege escalation', 'Credential harvesting & password cracking', 'Wireless penetration testing'] },
      { week: 'Weeks 10-12', title: 'Security Auditing & Certifications', topics: ['Writing professional pentest reports', 'SOC analysis & log triage with SIEM', 'Compliance (ISO 27001, SOC 2)', 'Cybersecurity interview simulations'] }
    ]
  },
  {
    id: 'prog-6',
    title: 'UI/UX Design & Design Systems',
    domain: 'Design',
    duration: '2 months',
    enrolled: 320,
    rating: 4.9,
    tag: 'Creative Core',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-pink-500',
    skills: ['Figma', 'User Research', 'Design Systems', 'Interactive Prototyping', 'WCAG', 'Wireframing'],
    description: 'Design digital experiences users love. Master Figma auto-layout, design tokens, interactive micro-animations, and responsive design systems.',
    prerequisites: 'Passion for design and human-computer interaction.',
    capstone: 'Production-ready mobile & desktop design system with high-fidelity interactive prototype in Figma.',
    modules: [
      { week: 'Weeks 1-2', title: 'User Research & Information Architecture', topics: ['User interviews and empathy mapping', 'Creating problem statements & personas', 'User journey mapping & task flows', 'Low-fidelity wireframing and sketching'] },
      { week: 'Weeks 3-4', title: 'Visual Design & Figma Mastery', topics: ['Typography scales & visual hierarchy', 'Color psychology & WCAG accessibility standards', 'Figma Auto-layout & component variants', 'Micro-interactions & smart animation'] },
      { week: 'Weeks 5-6', title: 'Building Scalable Design Systems', topics: ['Design tokens (color, spacing, elevation)', 'Form components, modals & responsive grids', 'Documentation and developer handoff', 'Figma collaboration workflows'] },
      { week: 'Weeks 7-8', title: 'Usability Testing & Portfolio Case Study', topics: ['Conducting moderated user usability tests', 'Synthesizing test data into iterations', 'Publishing a standout Behance/Notion case study', 'Product design interview walkthroughs'] }
    ]
  },
  {
    id: 'prog-7',
    title: 'Mobile App Development (React Native & Flutter)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 210,
    rating: 4.8,
    tag: 'Cross-Platform',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&auto=format&fit=crop&q=80',
    color: 'from-indigo-600 to-blue-500',
    skills: ['React Native', 'Flutter', 'Dart', 'Expo', 'Firebase', 'State Management'],
    description: 'Build native iOS and Android apps with a single modern codebase. Connect cloud databases, push notifications, and payment gateways.',
    prerequisites: 'Basic JavaScript or Dart understanding.',
    capstone: 'Deploy an on-demand food delivery or ride-booking mobile app to TestFlight / Google Play Console.',
    modules: [
      { week: 'Weeks 1-3', title: 'Mobile Frameworks & Navigation', topics: ['React Native & Expo ecosystem', 'Flexbox layout for mobile screens', 'Native navigation (tabs, stacks, drawers)', 'Device permissions & storage'] },
      { week: 'Weeks 4-6', title: 'State, APIs & Offline Caching', topics: ['Global state with Redux Toolkit / Zustand', 'Async data fetching & offline caching', 'Local SQLite and Realm databases', 'Geolocation & camera hardware integration'] },
      { week: 'Weeks 7-9', title: 'Backend & Push Notifications', topics: ['Firebase Authentication & Firestore', 'OneSignal & FCM push notifications', 'In-app purchases & UPI payment integration', 'Animations with React Native Reanimated'] },
      { week: 'Weeks 10-12', title: 'App Store Deployment & Performance', topics: ['Building production APK and iOS ipa bundles', 'App performance profiling and memory leaks', 'Publishing to Play Store & App Store', 'Mobile developer interview prep'] }
    ]
  },
  {
    id: 'prog-8',
    title: 'Blockchain & Web3 Engineering',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 175,
    rating: 4.7,
    tag: 'Future Tech',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=700&auto=format&fit=crop&q=80',
    color: 'from-amber-600 to-yellow-500',
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Ethers.js', 'Hardhat', 'IPFS'],
    description: 'Engineer decentralized applications. Write secure Solidity smart contracts, deploy DeFi protocols, and integrate Web3 wallets.',
    prerequisites: 'Strong JavaScript and basic understanding of cryptography.',
    capstone: 'Build a decentralized lending protocol or NFT marketplace with Solidity and automated unit tests.',
    modules: [
      { week: 'Weeks 1-3', title: 'Blockchain Architecture & Cryptography', topics: ['Consensus mechanisms (PoW, PoS)', 'Hashing, public-key cryptography & wallets', 'Ethereum Virtual Machine (EVM) architecture', 'Gas optimization fundamentals'] },
      { week: 'Weeks 4-6', title: 'Solidity Smart Contracts', topics: ['Syntax, mappings, structs, and inheritance', 'ERC-20 and ERC-721 token standards', 'Events, modifiers, and access controls', 'Testing contracts with Hardhat & Chai'] },
      { week: 'Weeks 7-9', title: 'Smart Contract Security & Audits', topics: ['Reentrancy, front-running & arithmetic overflows', 'Slither and Mythril static security analysis', 'Upgradable proxy patterns', 'Auditing smart contract checklists'] },
      { week: 'Weeks 10-12', title: 'Full Web3 DApp & Deployment', topics: ['Ethers.js & Wagmi React hooks', 'Connecting MetaMask and WalletConnect', 'IPFS decentralized storage integration', 'Web3 engineering interview prep'] }
    ]
  },
  {
    id: 'prog-9',
    title: 'Internet of Things (IoT) & Embedded Systems',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 160,
    rating: 4.6,
    tag: 'Hardware + Cloud',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80',
    color: 'from-teal-600 to-emerald-500',
    skills: ['ESP32', 'Arduino', 'MQTT', 'Raspberry Pi', 'C/C++', 'Node-RED'],
    description: 'Interface sensors, microcontrollers, and actuators with cloud IoT gateways. Build automated smart systems and telemetry monitors.',
    prerequisites: 'Basic physics, circuits, and C/C++ syntax.',
    capstone: 'Smart industrial environmental monitoring gateway with MQTT broker, cloud telemetry, and automated SMS alerts.',
    modules: [
      { week: 'Weeks 1-3', title: 'Microcontrollers & Sensor Interfacing', topics: ['ESP32 & Arduino architecture', 'GPIO, ADC, PWM, I2C, SPI protocols', 'Interfacing temperature, pressure, motion sensors', 'Power optimization in embedded code'] },
      { week: 'Weeks 4-6', title: 'IoT Protocols & Telemetry Networking', topics: ['MQTT protocol & broker setup (Mosquitto)', 'HTTP vs CoAP for constrained devices', 'Wi-Fi & Bluetooth Low Energy (BLE) pairing', 'Node-RED visualization dashboard'] },
      { week: 'Weeks 7-9', title: 'Cloud IoT Platforms', topics: ['AWS IoT Core integration', 'Device shadows, topics & rules engine', 'InfluxDB time-series data storage', 'Grafana IoT visualization'] },
      { week: 'Weeks 10-12', title: 'Edge Computing & Hardware Capstone', topics: ['Running lightweight TinyML on microcontrollers', 'Firmware Over-The-Air (FOTA) updates', 'Hardware packaging & PCB design basics', 'IoT engineering career guidance'] }
    ]
  },
  {
    id: 'prog-10',
    title: 'Game Development & 3D Interactive (Unity / C#)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 190,
    rating: 4.8,
    tag: 'Gaming Core',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=80',
    color: 'from-pink-600 to-purple-600',
    skills: ['Unity Engine', 'C#', '3D Physics', 'Game Design', 'Shaders', 'Blender Basics'],
    description: 'Design, code, and deploy 2D and 3D games in Unity. Master player controllers, collision mechanics, animation trees, and audio mix.',
    prerequisites: 'Basic object-oriented programming concepts.',
    capstone: 'Complete playable 3D action-adventure level with AI enemy navigation, inventory, and particle effects.',
    modules: [
      { week: 'Weeks 1-3', title: 'Unity Engine & C# Scripting', topics: ['Unity Editor layout & GameObject hierarchy', 'C# scripting: vectors, transforms, loops', 'Input system (keyboard, touch, controller)', '2D physics and sprite animations'] },
      { week: 'Weeks 4-6', title: '3D Physics, Lighting & Materials', topics: ['Rigidbodies, colliders, and raycasting', 'Materials, shaders, and post-processing', 'Baking real-time and static lighting', 'Particle systems for spell effects & fire'] },
      { week: 'Weeks 7-9', title: 'Game Mechanics & AI Enemy Logic', topics: ['NavMesh and AI state machines (patrol, chase, attack)', 'Health systems, UI scoreboards, and inventory', 'Cinemachine camera controls', 'Audio mixers and ambient soundscapes'] },
      { week: 'Weeks 10-12', title: 'Optimization & Multi-Platform Build', topics: ['Draw call batching & occlusion culling', 'Building for PC, WebGL, and mobile', 'Monetization (ads, IAP)', 'Game studio portfolio preparation'] }
    ]
  },
  {
    id: 'prog-11',
    title: 'Business Analytics & Power BI',
    domain: 'Analytics',
    duration: '2.5 months',
    enrolled: 340,
    rating: 4.7,
    tag: 'Corporate Essential',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80',
    color: 'from-teal-500 to-cyan-500',
    skills: ['Power BI', 'SQL', 'Advanced Excel', 'DAX Measures', 'Storytelling', 'Data Modeling'],
    description: 'Convert disconnected spreadsheets into clean, interactive executive dashboards using Power BI, DAX formulas, and SQL.',
    prerequisites: 'Familiarity with spreadsheets.',
    capstone: 'Enterprise executive sales & inventory performance dashboard with automated refresh and drill-down KPIs.',
    modules: [
      { week: 'Weeks 1-2', title: 'Advanced Excel & Analytical Foundations', topics: ['XLOOKUP, INDEX/MATCH, and dynamic arrays', 'Pivot tables and multi-condition modeling', 'Data validation and scenario managers', 'Introductory business mathematics'] },
      { week: 'Weeks 3-5', title: 'SQL for Business Analytics', topics: ['SELECT, WHERE, GROUP BY & aggregations', 'Joins, subqueries and common table expressions', 'Window functions (RANK, ROW_NUMBER, LAG/LEAD)', 'Extracting and cleaning transactional data'] },
      { week: 'Weeks 6-8', title: 'Power BI Modeling & DAX Formulas', topics: ['Star and Snowflake schema data modeling', 'Calculated columns vs DAX measures', 'Time-intelligence DAX functions (YTD, MTD, YoY)', 'Power Query transformations and M-code'] },
      { week: 'Weeks 9-10', title: 'Interactive Dashboard Design & Storytelling', topics: ['Visual design best practices for executives', 'Drill-through filters and tooltip pages', 'Publishing reports to Power BI Service', 'Business analyst case interview preparation'] }
    ]
  },
  {
    id: 'prog-12',
    title: 'Product Management Masterclass',
    domain: 'Management',
    duration: '2 months',
    enrolled: 250,
    rating: 4.8,
    tag: 'Leadership',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&auto=format&fit=crop&q=80',
    color: 'from-violet-600 to-purple-700',
    skills: ['Product Roadmapping', 'Agile/Scrum', 'PRD Writing', 'RICE Matrix', 'Product Metrics'],
    description: 'Drive feature vision from user discovery to release. Write detailed PRDs, define North Star metrics, and conduct agile sprints.',
    prerequisites: 'Open to engineers, business graduates, and career changers.',
    capstone: 'Complete Product Requirement Document (PRD) and launch roadmap for a high-growth tech feature.',
    modules: [
      { week: 'Weeks 1-2', title: 'Product Discovery & Problem Sizing', topics: ['User problem statements & discovery interviews', 'Market opportunity sizing (TAM/SAM/SOM)', 'Competitive intelligence analysis', 'Value proposition canvas design'] },
      { week: 'Weeks 3-4', title: 'Crafting Product Requirements (PRD) & Specs', topics: ['Anatomy of an industry-standard PRD', 'Writing clear user stories & acceptance criteria', 'Wireframing user journeys with Miro/Figma', 'Managing engineering & design alignment'] },
      { week: 'Weeks 5-6', title: 'Agile Sprints & Prioritization Frameworks', topics: ['Scrum rituals: planning, standups, retros', 'RICE, Kano & MoSCoW prioritization methods', 'Managing tech debt vs feature delivery', 'Jira workflow management'] },
      { week: 'Weeks 7-8', title: 'Product Metrics, GTM & PM Interviews', topics: ['AARRR Pirate Funnel & North Star metrics', 'A/B testing and cohort retention metrics', 'Go-To-Market launch strategy', 'PM interview frameworks: CIRCLES & RCA cases'] }
    ]
  },
  {
    id: 'prog-13',
    title: 'Digital Marketing & Growth Hacking',
    domain: 'Marketing',
    duration: '2 months',
    enrolled: 380,
    rating: 4.7,
    tag: 'Fast Scaling',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&auto=format&fit=crop&q=80',
    color: 'from-rose-500 to-pink-600',
    skills: ['SEO', 'Google Ads', 'Meta Campaigns', 'Social Media', 'Analytics', 'Conversion Funnels'],
    description: 'Scale organic traffic and run high-ROI paid campaigns on Google, Meta, and LinkedIn with data-driven attribution models.',
    prerequisites: 'No prior experience required.',
    capstone: 'Multi-channel acquisition strategy and live ad campaign setup with conversion landing page audit.',
    modules: [
      { week: 'Weeks 1-2', title: 'Growth Marketing Fundamentals & SEO', topics: ['Customer persona development', 'Technical and on-page SEO optimization', 'Keyword discovery with Semrush/Ahrefs', 'Content marketing & backlink strategy'] },
      { week: 'Weeks 3-4', title: 'Performance Marketing (Google & Meta Ads)', topics: ['Google Search, Display & Performance Max ads', 'Meta Ads Manager (Facebook & Instagram targeting)', 'Ad creative copywriting & high-converting hooks', 'Bid strategies and budget scaling'] },
      { week: 'Weeks 5-6', title: 'Conversion Rate Optimization (CRO) & Email', topics: ['Landing page UI/UX heuristics & heatmaps', 'A/B testing methodologies', 'Automated email nurture sequences', 'Retention marketing & customer lifetime value'] },
      { week: 'Weeks 7-8', title: 'Google Analytics 4 & Portfolio Pitch', topics: ['GA4 event tracking & custom conversions', 'Multi-touch attribution models', 'Executive marketing reporting dashboard', 'Freelance & agency placement preparation'] }
    ]
  },
  {
    id: 'prog-14',
    title: 'Financial Modeling & Valuation',
    domain: 'Finance',
    duration: '3 months',
    enrolled: 180,
    rating: 4.6,
    tag: 'High Finance',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=700&auto=format&fit=crop&q=80',
    color: 'from-emerald-600 to-green-600',
    skills: ['Financial Modeling', 'DCF Valuation', 'Comparable Comps', 'Excel', 'Ratio Analysis'],
    description: 'Learn three-statement financial modeling, Discounted Cash Flow (DCF), LBO mechanics, and equity research pitching in Excel.',
    prerequisites: 'Basic knowledge of accounting statements.',
    capstone: 'Integrated financial forecast model and DCF valuation report for a publicly listed Indian firm.',
    modules: [
      { week: 'Weeks 1-3', title: 'Integrated Three-Statement Modeling', topics: ['Income Statement, Balance Sheet, Cash Flow linkages', 'Revenue & expense driver schedules', 'Depreciation, PP&E and working capital schedules', 'Debt schedule and interest calculations'] },
      { week: 'Weeks 4-6', title: 'Discounted Cash Flow (DCF) Valuation', topics: ['Unlevered Free Cash Flow (UFCF) modeling', 'Cost of Equity, Debt, and WACC estimation', 'Terminal Value: Perpetuity Growth vs Exit Multiple', 'Sensitivity analysis with data tables'] },
      { week: 'Weeks 7-9', title: 'Relative Valuation & Comparable Companies', topics: ['Trading comps (EV/EBITDA, P/E, EV/Sales)', 'Precedent transactions analysis', 'Football field valuation summary charts', 'Financial ratio analysis & benchmarking'] },
      { week: 'Weeks 10-12', title: 'M&A Basics & Financial Research Report', topics: ['Merger model mechanics and accretion/dilution', 'Writing a professional equity research report', 'Executive presentation skills', 'Finance analyst interview questions'] }
    ]
  },
  {
    id: 'prog-15',
    title: 'HR Analytics & Modern Talent Operations',
    domain: 'Management',
    duration: '2 months',
    enrolled: 150,
    rating: 4.6,
    tag: 'People Ops',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80',
    color: 'from-cyan-600 to-blue-700',
    skills: ['HR Metrics', 'Retention Modeling', 'Workforce Planning', 'Excel HR Analytics', 'Talent Acquisition'],
    description: 'Leverage data to optimize recruiting funnels, employee retention, performance scoring, and organizational design.',
    prerequisites: 'Open to any graduate interested in human resources and organizational management.',
    capstone: 'Comprehensive attrition risk predictive model and workforce compensation benchmark report.',
    modules: [
      { week: 'Weeks 1-2', title: 'HR Analytics Foundations & Metrics', topics: ['Time-to-hire, cost-per-hire, turnover rates', 'Headcount forecasting & diversity metrics', 'Data privacy & ethical handling of employee data', 'HR dashboards in Excel'] },
      { week: 'Weeks 3-4', title: 'Talent Acquisition & Pipeline Analytics', topics: ['Sourcing channel effectiveness & conversion rates', 'Candidate drop-off funnel analysis', 'Applicant Tracking System (ATS) data extraction', 'Structured interviewing scorecards'] },
      { week: 'Weeks 5-6', title: 'Employee Engagement & Attrition Modeling', topics: ['Pulse surveys & sentiment analysis', 'Identifying early resignation predictors', 'Compensation parity and salary banding', 'Retention strategies and exit interview analytics'] },
      { week: 'Weeks 7-8', title: 'Executive HR Dashboard & Presentation', topics: ['Building an interactive HR scorecard in Power BI', 'Storytelling with HR data for leadership', 'Strategic talent review presentations', 'HR interview preparation'] }
    ]
  },
  {
    id: 'prog-16',
    title: 'Supply Chain & Logistics Operations',
    domain: 'Management',
    duration: '2.5 months',
    enrolled: 130,
    rating: 4.6,
    tag: 'Operations',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&auto=format&fit=crop&q=80',
    color: 'from-amber-600 to-orange-700',
    skills: ['Inventory Optimization', 'Supply Chain Analytics', 'Procurement', 'ERP Systems', 'Demand Forecasting'],
    description: 'Optimize global supply networks, warehouse throughput, demand planning, and vendor procurement workflows.',
    prerequisites: 'Basic analytical curiosity.',
    capstone: 'Dynamic inventory replenishment and safety stock model for a multi-node retail supply chain.',
    modules: [
      { week: 'Weeks 1-2', title: 'Supply Chain Architecture & Strategy', topics: ['Upstream vs downstream supply chain', 'Bullwhip effect and mitigation strategies', 'Incoterms and international freight basics', 'Key performance metrics (OTIF, lead time)'] },
      { week: 'Weeks 3-5', title: 'Demand Forecasting & Inventory Planning', topics: ['Time series demand forecasting in Excel/Python', 'Economic Order Quantity (EOQ) & Safety stock', 'ABC / FSN inventory classification', 'Managing seasonal stock spikes'] },
      { week: 'Weeks 6-8', title: 'Warehouse Operations & Logistics Routing', topics: ['Warehouse layout design and slotting', 'Vehicle routing problem (VRP) heuristics', 'Cold chain and perishable inventory handling', 'Third-party logistics (3PL/4PL) selection'] },
      { week: 'Weeks 9-10', title: 'Procurement, ERP & Capstone Presentation', topics: ['Vendor evaluation matrices and contract negotiation', 'ERP modules overview (SAP/Oracle concepts)', 'Supply chain risk management', 'Operations analyst mock interviews'] }
    ]
  },
  {
    id: 'prog-17',
    title: 'Big Data Engineering & Cloud Pipelines',
    domain: 'Technical',
    duration: '3.5 months',
    enrolled: 220,
    rating: 4.8,
    tag: 'High Scale',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=700&auto=format&fit=crop&q=80',
    color: 'from-blue-700 to-indigo-800',
    skills: ['Apache Spark', 'Kafka', 'Airflow', 'Snowflake', 'Hadoop', 'AWS EMR'],
    description: 'Build enterprise big data architectures. Process petabyte-scale data lakes with Apache Spark, streaming pipelines with Kafka, and orchestration with Airflow.',
    prerequisites: 'Proficiency in Python and advanced SQL.',
    capstone: 'Real-time financial transaction fraud streaming pipeline using Kafka, Spark Streaming, and Snowflake data lake.',
    modules: [
      { week: 'Weeks 1-3', title: 'Distributed Systems & Hadoop Ecosystem', topics: ['HDFS architecture and MapReduce paradigms', 'Hive metastore and external tables', 'Parquet, ORC, and Avro columnar file formats', 'Data partitioning and bucketing'] },
      { week: 'Weeks 4-6', title: 'Apache Spark Distributed Compute', topics: ['Spark RDDs, DataFrames, and SparkSQL', 'Spark execution plan, shuffle, and spill', 'Memory management and partition tuning', 'PySpark transformations on AWS EMR'] },
      { week: 'Weeks 7-9', title: 'Streaming Data with Apache Kafka', topics: ['Kafka brokers, topics, partitions, and consumer groups', 'Event-driven architecture and schema registry', 'Spark Structured Streaming integration', 'Exactly-once processing semantics'] },
      { week: 'Weeks 10-14', title: 'Airflow Orchestration & Modern Data Stack', topics: ['Apache Airflow DAGs and task dependencies', 'Snowflake data warehousing & dbt transformations', 'Data quality tests and schema evolution', 'Big Data engineer interview practice'] }
    ]
  },
  {
    id: 'prog-18',
    title: 'Augmented & Virtual Reality (AR / VR)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 140,
    rating: 4.7,
    tag: 'Spatial Tech',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=700&auto=format&fit=crop&q=80',
    color: 'from-violet-500 to-fuchsia-600',
    skills: ['Unity XR', 'WebXR', 'ARKit', 'ARCore', 'C#', '3D Spatial Audio'],
    description: 'Design immersive virtual reality and augmented reality environments. Program hand tracking, spatial anchors, and real-time 3D interaction.',
    prerequisites: 'Basic C# and 3D graphics curiosity.',
    capstone: 'Interactive AR furniture placement app and immersive VR architectural walkthrough for Meta Quest.',
    modules: [
      { week: 'Weeks 1-3', title: 'XR Foundations & Hardware Setup', topics: ['AR vs VR vs MR paradigms', 'Setting up Unity XR Interaction Toolkit', 'Headset tracking and controller inputs', 'Spatial computing design guidelines'] },
      { week: 'Weeks 4-6', title: 'Virtual Reality (VR) Mechanics', topics: ['Teleportation, smooth locomotion, snap turns', 'Direct hand tracking and grab interactables', 'Spatial 3D audio implementation', 'Optimizing VR framerate to prevent motion sickness'] },
      { week: 'Weeks 7-9', title: 'Augmented Reality (ARKit & ARCore)', topics: ['Plane detection & surface anchoring', 'Image tracking & markerless AR', 'Light estimation and shadow alignment', 'WebXR for browser-based AR experiences'] },
      { week: 'Weeks 10-12', title: 'Multiplayer XR & Industry Portfolios', topics: ['Networked avatars using Photon/Mirror', 'Building for Meta Quest and mobile AR', 'Spatial UX case study portfolio', 'AR/VR engineering interview guidelines'] }
    ]
  },
  {
    id: 'prog-19',
    title: 'Bioinformatics & Computational Genomics',
    domain: 'Analytics',
    duration: '3 months',
    enrolled: 110,
    rating: 4.7,
    tag: 'BioTech',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&auto=format&fit=crop&q=80',
    color: 'from-teal-600 to-blue-700',
    skills: ['BioPython', 'Genomic Data', 'NCBI Databases', 'BLAST', 'R for Genomics', 'Variant Calling'],
    description: 'Apply computational algorithms to biological datasets. Analyze DNA/RNA sequences, gene expressions, and protein structures using Python and R.',
    prerequisites: 'Basic biology and Python programming basics.',
    capstone: 'Automated variant calling pipeline and phylogenetic tree construction for pathogen genome sequences.',
    modules: [
      { week: 'Weeks 1-3', title: 'Biological Databases & BioPython', topics: ['NCBI, GenBank, UniProt programmatic access', 'BioPython Seq & SeqRecord modules', 'Pairwise and multiple sequence alignment (BLAST)', 'FASTA, FASTQ, and SAM/BAM file formats'] },
      { week: 'Weeks 4-6', title: 'Next-Generation Sequencing (NGS) Analysis', topics: ['Quality control of read data with FastQC', 'Read alignment with BWA and Bowtie2', 'Variant calling with GATK pipeline', 'RNA-Seq differential expression analysis in R'] },
      { week: 'Weeks 7-9', title: 'Structural Bioinformatics & Proteomics', topics: ['Protein data bank (PDB) analysis', 'Molecular visualization with PyMOL', 'AlphaFold and machine learning in protein folding', 'Docking simulations and drug target identification'] },
      { week: 'Weeks 10-12', title: 'Machine Learning in Genomics & Capstone', topics: ['Classification of cancer genomic subtypes', 'Clustering single-cell RNA datasets', 'Writing scientific research reports', 'Bioinformatics career pathways'] }
    ]
  },
  {
    id: 'prog-20',
    title: 'Software Testing & Automation (SDET / Selenium / Cypress)',
    domain: 'Technical',
    duration: '2.5 months',
    enrolled: 260,
    rating: 4.8,
    tag: 'Zero Defect',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
    color: 'from-emerald-600 to-teal-700',
    skills: ['Selenium', 'Cypress', 'Playwright', 'Postman API Testing', 'Java / Python', 'CI/CD Testing'],
    description: 'Become a Software Development Engineer in Test (SDET). Master automated web testing, API test suites, and load testing in CI/CD pipelines.',
    prerequisites: 'Basic programming in Java or JavaScript or Python.',
    capstone: 'Comprehensive automated test framework with Cypress, Postman, and Allure test reports integrated into GitHub Actions.',
    modules: [
      { week: 'Weeks 1-2', title: 'Manual Testing & Test Case Design', topics: ['SDLC and STLC test life cycles', 'Writing comprehensive test scenarios and edge cases', 'Bug reporting & Jira issue tracking', 'Black box vs White box testing methods'] },
      { week: 'Weeks 3-5', title: 'Web Automation with Cypress & Playwright', topics: ['Locators, assertions, and DOM traversal', 'Page Object Model (POM) architectural design', 'Handling iframes, popups, and dynamic waits', 'Cross-browser automated test execution'] },
      { week: 'Weeks 6-8', title: 'API Automation with Postman & RestAssured', topics: ['HTTP status codes, headers, and payloads', 'Writing automated assertions in Postman', 'Schema validation and data-driven testing', 'Automating mock servers'] },
      { week: 'Weeks 9-10', title: 'CI/CD Test Automation & SDET Interviews', topics: ['Running test suites in headless Docker containers', 'GitHub Actions test triggers on Pull Requests', 'Generating rich Allure test reports', 'SDET coding and technical interview prep'] }
    ]
  }
]

const domains = ['All', 'Technical', 'Analytics', 'Marketing', 'Design', 'Management', 'Finance']
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

export default function Programs() {
  const [search, setSearch] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [activeCourseModal, setActiveCourseModal] = useState(null)

  const filtered = trending20Programs.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.domain.toLowerCase().includes(search.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchDomain = selectedDomain === 'All' || p.domain === selectedDomain
    const matchLevel = selectedLevel === 'All Levels' || p.level === selectedLevel
    return matchSearch && matchDomain && matchLevel
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B1A]">
      {/* Animated Hero Header */}
      <div className="bg-gradient-to-br from-violet-950 via-indigo-900 to-[#0B0B1A] py-20 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />
        
        {/* Animated glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-violet-600 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-indigo-600 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs md:text-sm font-semibold mb-4">
              <Sparkles size={14} className="text-amber-400" />
              20 Trending Industry Tracks · Practical Training · Guaranteed Project Experience
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight"
          >
            20 Trending Tech &amp; Management <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Career Specializations
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-violet-200 max-w-2xl mx-auto text-sm md:text-lg mb-8 leading-relaxed"
          >
            Click any track to explore complete week-by-week curriculum modules, tools, trending topics, and prerequisites.
          </motion.p>

          {/* Search bar with instant filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all 20 domains (e.g. Next.js, AI, Cyber, IoT, Game, Big Data)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-violet-200 focus:outline-none focus:border-white/50 focus:bg-white/20 text-sm transition-all shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Domain Filter Chips */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1">Filter Domain:</span>
              {domains.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    selectedDomain === d
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105'
                      : 'bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-violet-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Difficulty:</span>
              {levels.map(l => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedLevel === l
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter & Statement */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Showing <strong className="text-gray-900 dark:text-white">{filtered.length} of 20</strong> trending programs in <strong className="text-violet-600">{selectedDomain}</strong>
          </p>
          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800">
            <CheckCircle size={14} className="text-emerald-500" /> Industry Accredited Syllabus &amp; Live Mentorship
          </span>
        </div>

        {/* 20 DOMAIN CARDS GRID WITH IMAGES & ANIMATIONS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prog, i) => (
            <motion.div
              key={prog.id || i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:border-violet-400/80 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Domain Hero Image with Hover Zoom Animation */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveCourseModal(prog)}>
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Tag and Level Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      {prog.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-semibold border border-white/20">
                      {prog.level}
                    </span>
                  </div>

                  {/* Domain Pill bottom left */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      {prog.domain} Track
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3
                    onClick={() => setActiveCourseModal(prog)}
                    className="text-lg font-black text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {prog.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prog.skills.slice(0, 4).map((skill, j) => (
                      <span key={j} className="text-[10px] px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium">
                        {skill}
                      </span>
                    ))}
                    {prog.skills.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-gray-400">+{prog.skills.length - 4}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1"><Clock size={12} /> {prog.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {prog.enrolled}+ learners</span>
                    <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {prog.rating}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-0 space-y-3">
                <button
                  onClick={() => setActiveCourseModal(prog)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-[#1A1A36] text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-violet-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <BookOpen size={14} className="group-hover/btn:animate-bounce" /> View Modules &amp; Syllabus
                  <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <Link to="/pricing" className="btn-primary !py-2.5 w-full !justify-center !text-xs shadow-md">
                  Enroll Now <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No programs found matching your search.</p>
            <button onClick={() => { setSearch(''); setSelectedDomain('All'); setSelectedLevel('All Levels') }} className="mt-4 text-violet-600 font-semibold hover:underline">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* DETAILED INTERACTIVE MODULE SYLLABUS MODAL */}
      <AnimatePresence>
        {activeCourseModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setActiveCourseModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.90, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.90, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#13132B] rounded-3xl max-w-3xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl relative my-8 overflow-hidden"
            >
              {/* Modal Banner Header */}
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  src={activeCourseModal.image}
                  alt={activeCourseModal.title}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13132B] via-[#13132B]/60 to-transparent" />

                {/* Animated floating glow */}
                <div className="absolute top-4 right-20 w-32 h-32 rounded-full bg-violet-500/20 blur-2xl animate-pulse" />

                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full cursor-pointer z-20 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <motion.span
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30"
                  >
                    {activeCourseModal.domain} SPECIALIZATION
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-black text-white mt-1.5 mb-1"
                  >
                    {activeCourseModal.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-4 text-xs text-violet-200"
                  >
                    <span>⏱️ <strong>{activeCourseModal.duration}</strong></span>
                    <span>⭐ <strong>{activeCourseModal.rating} / 5.0</strong></span>
                    <span>👥 <strong>{activeCourseModal.enrolled}+ students</strong></span>
                  </motion.div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 max-h-[58vh] overflow-y-auto scrollbar-hide">

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {activeCourseModal.description}
                </motion.p>

                {/* Skills row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2"
                >
                  {activeCourseModal.skills.map((sk, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 + sIdx * 0.04 }}
                      className="text-[11px] px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-semibold"
                    >
                      {sk}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Prerequisites & Capstone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1A36] border border-gray-200 dark:border-gray-800"
                  >
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Prerequisites</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{activeCourseModal.prerequisites}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40"
                  >
                    <p className="text-[10px] font-black uppercase text-violet-700 dark:text-violet-300 mb-1">Capstone Deliverable</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{activeCourseModal.capstone}</p>
                  </motion.div>
                </div>

                {/* Modules breakdown — ANIMATED */}
                <div>
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                  >
                    <Layers size={16} className="text-violet-600" /> Learning Modules &amp; Trending Topics
                  </motion.h4>

                  <div className="space-y-3">
                    {activeCourseModal.modules.map((mod, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.32 + idx * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
                        whileHover={{ scale: 1.015, boxShadow: '0 4px 32px rgba(108,62,244,0.12)' }}
                        className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-[#1A1A36] dark:to-[#16163A] overflow-hidden relative group/mod transition-all duration-200"
                      >
                        {/* Left accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-violet-500 to-indigo-500 opacity-0 group-hover/mod:opacity-100 transition-opacity" />

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {/* Animated module number badge */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow"
                            >
                              {idx + 1}
                            </motion.div>
                            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                              Module {idx + 1} · {mod.week}
                            </span>
                          </div>
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                            <Sparkles size={9} /> Trending
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-3 group-hover/mod:text-violet-600 dark:group-hover/mod:text-violet-400 transition-colors">
                          {mod.title}
                        </h5>

                        <ul className="grid sm:grid-cols-2 gap-2">
                          {mod.topics.map((topic, tIdx) => (
                            <motion.li
                              key={tIdx}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 + tIdx * 0.04 }}
                              className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300"
                            >
                              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-md bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                                <CheckCircle size={10} className="text-violet-500" />
                              </span>
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* What's Included — no fee */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2">
                    ✦ Everything Included in This Program:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                    {[
                      `All ${activeCourseModal.modules.length} Modules & Video Lessons`,
                      'Weekly Live Mentor Sessions',
                      'Capstone Project Evaluation',
                      'Official MIVEXO Certificate',
                      'Interactive Practice Simulator',
                      'Placement Support & Referrals'
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.05 }}
                        className="flex items-center gap-1.5"
                      >
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Modal Footer — no price */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-6 bg-gray-50 dark:bg-[#1A1A36] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Register to unlock full access — training, internship, stipend &amp; placement support.
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => setActiveCourseModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                  <Link to="/pricing" className="btn-primary !py-2.5 !px-6 !text-xs shadow-md">
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
