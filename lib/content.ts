/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  This file is the site's "database". Content is typed, colocated, and
 *  statically inlined at build time — no runtime queries, no CMS latency,
 *  every page ships as static HTML. To change anything a visitor reads,
 *  edit it here; components never hardcode copy.
 *
 *  Adding a project here automatically creates its case-study page at
 *  /work/<slug>, its OG image, and its sitemap entry.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Rehan Ashraf",
  role: "Senior Full-Stack Developer & AI Engineer",
  headline: "Senior Full-Stack Developer & AI Engineer",
  subheadline:
    "I build production-grade web applications, AI-powered systems, and scalable backends for startups and growing businesses. 5+ years shipping real products across SaaS, fintech, healthcare, and AI.",
  shortBio:
    "Senior full-stack developer and AI engineer based in Islamabad. 5+ years building SaaS platforms, RAG pipelines, voice AI systems, and fintech backends. Available for freelance and contract work.",
  location: "Islamabad, Pakistan",
  timezone: "GMT+5",
  yearsExperience: "5+",
  // Canonical site URL — drives sitemap, canonical tags, and OG images.
  // Override with NEXT_PUBLIC_SITE_URL in your environment / host settings.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rehan-ashraf.netlify.app",
} as const;

// ── Contact / profiles ───────────────────────────────────────────────────
export const socials = {
  email: "m.rd7447@gmail.com",
  github: "https://github.com/rehan7447",
  agency: "https://aventrexdigital.com",
  // [ADD] paste your public Upwork profile URL here and it appears everywhere.
  upwork: "",
  linkedin: "https://www.linkedin.com/in/rehan-ashraf-a3a264221/",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

// ── Proof strip (hero) ───────────────────────────────────────────────────
// Every number here is verifiable. Don't add one that isn't.
export const stats = [
  { value: "5+", label: "Years shipping production software" },
  { value: "100%", label: "Job Success Score on Upwork" },
  { value: "13+", label: "Contracts delivered" },
  { value: "1,400+", label: "Hours billed" },
] as const;

// ── About ────────────────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    "I'm a senior full-stack developer and AI engineer based in Islamabad, Pakistan with over 5 years of experience building production software. I've shipped SaaS platforms, fintech backends, AI-powered systems, and consumer mobile apps across industries including healthcare, real estate, and financial services.",
    "I'm the founder of Aventrex Digital, a product-focused software development agency, and I freelance independently on Upwork with a 100% Job Success Score across 13+ contracts.",
    "I work across the full stack — from database schema design to cloud deployment — and I integrate AI into real products, not demos. I use Claude Code and Cursor as primary development tools and ship faster because of it.",
    "When I'm not building, I'm thinking about system design, real estate investment, and financial markets.",
  ],
  facts: [
    { label: "Based in", value: "Islamabad, PK" },
    { label: "Timezone", value: "GMT+5 · US/EU overlap" },
    { label: "Founder of", value: "Aventrex Digital" },
    { label: "Currently", value: "Senior Platform Engineer, SobrietyHub" },
  ],
} as const;

// ── What I do ────────────────────────────────────────────────────────────
export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "ai",
    index: "01",
    title: "AI & LLM Systems",
    blurb:
      "Applied AI that holds up in production — grounded, evaluated, and wired into real product flows.",
    points: [
      "RAG pipelines with pgvector, embedding generation, and structured output validation",
      "Claude and OpenAI integrations with prompt engineering and explainable outputs",
      "Voice AI on Retell, Twilio, ElevenLabs, and Deepgram with sub-second latency",
    ],
  },
  {
    id: "product",
    index: "02",
    title: "Full-Stack Product",
    blurb:
      "End-to-end product engineering, from schema design to deploy. Typed, tested, and maintainable.",
    points: [
      "Multi-tenant SaaS on Next.js, NestJS, Spring Boot, and PostgreSQL",
      "React Native apps shipped to the App Store and Play Store at scale",
      "Payments, auth, and third-party integrations: Stripe, OAuth, DocuSign, Zoom",
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend & Infrastructure",
    blurb:
      "The systems underneath: event-driven, fault-tolerant, and built for compliance-grade workloads.",
    points: [
      "Microservices, queue systems (BullMQ, RabbitMQ), and event-driven architecture",
      "AWS and Azure infrastructure with Docker, Kubernetes, Terraform, and CI/CD",
      "Banking-grade pipelines: SFTP processing, reconciliation, and audit trails",
    ],
  },
];

// ── Tech stack ───────────────────────────────────────────────────────────
export type TechGroup = { label: string; items: string[] };

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js (App Router)",
      "Vue.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Native (Expo)",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Java Spring Boot",
      "Python FastAPI",
      "Prisma",
    ],
  },
  {
    label: "AI & LLM",
    items: [
      "Claude API",
      "OpenAI API",
      "RAG pipelines",
      "pgvector",
      "LangChain",
      "Embeddings",
      "Prompt Engineering",
      "Retell AI",
      "Twilio",
      "ElevenLabs",
      "Deepgram",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "DynamoDB",
      "Firebase",
      "Supabase",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS Lambda",
      "S3",
      "ECS",
      "RDS",
      "API Gateway",
      "SES",
      "Transcribe",
      "Bedrock",
      "EventBridge",
      "Secrets Manager",
      "Azure App Services",
      "AKS",
      "Azure Functions",
      "Data Factory",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "Vercel",
      "Railway",
    ],
  },
  {
    label: "Integrations",
    items: [
      "Stripe",
      "WebSockets",
      "Webhooks",
      "REST APIs",
      "GraphQL",
      "SFTP",
      "BullMQ",
      "RabbitMQ",
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────
export type Project = {
  slug: string;
  title: string;
  type: string;
  /** One line for the card. */
  summary: string;
  /** Full paragraph for the case-study page. */
  overview: string;
  /** Concrete capabilities — each one is something that actually shipped. */
  highlights: string[];
  tags: string[];
  /** Live/store URL. Omitted for confidential work. */
  href?: string;
  /** Label for the outbound link ("View live", "Play Store", …). */
  hrefLabel?: string;
  /** Marks work that can't be linked publicly. */
  confidential?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "e-arbitrator",
    title: "E-Arbitrator",
    type: "SaaS Platform",
    summary:
      "AI-powered dispute resolution SaaS connecting arbitrators with clients, on Spring Boot microservices.",
    overview:
      "AI-powered dispute resolution SaaS platform connecting arbitrators with clients. Built with Spring Boot microservices and React. Multi-tenant architecture with a full admin dashboard.",
    highlights: [
      "Spring Boot microservices backing a React front end, deployed on AWS with Docker",
      "Role-based access control and OAuth authentication across a multi-tenant architecture",
      "Stripe payments, Zoom meeting integration, and DocuSign contract signing",
      "Claude API for AI-assisted case analysis",
      "Full admin dashboard for case, user, and billing operations",
    ],
    tags: [
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Stripe",
      "Zoom",
      "DocuSign",
      "Claude API",
      "AWS",
      "Docker",
    ],
    href: "https://app.e-arbitrator.com",
    hrefLabel: "View live",
    featured: true,
  },
  {
    slug: "holistic-researcher",
    title: "The Holistic Researcher",
    type: "AI Platform",
    summary:
      "A RAG system that aggregates and normalizes multi-source data into grounded, explainable AI output.",
    overview:
      "AI-powered RAG system that aggregates data from multiple sources, normalizes and structures it, then feeds context into Claude and OpenAI to produce grounded, explainable outputs.",
    highlights: [
      "Retrieval pipeline built on vector search with pgvector and embedding generation",
      "Multi-source ingestion with normalization and structuring before retrieval",
      "Claude and OpenAI reasoning over retrieved context for grounded answers",
      "Structured JSON output validation so downstream systems get reliable shapes",
    ],
    tags: [
      "RAG",
      "Claude API",
      "OpenAI",
      "pgvector",
      "Node.js",
      "PostgreSQL",
      "AWS",
    ],
    href: "https://www.theholisticresearcher.com",
    hrefLabel: "View live",
    featured: true,
  },
  {
    slug: "voiceos",
    title: "VoiceOS",
    type: "AI Voice Platform",
    summary:
      "Production AI voice agents for call centers, clinics, real estate, and law firms — sub-600ms latency.",
    overview:
      "Production-ready AI voice agent platform built on Retell AI, targeting call centers, clinics, real estate, and law firms.",
    highlights: [
      "Sub-600ms response latency on live inbound and outbound calls",
      "Real-time appointment booking with GoHighLevel and HubSpot integration",
      "HIPAA compliance and SOC 2 Type II on a multi-tenant architecture",
      "Performance analytics dashboard for call outcomes and agent quality",
    ],
    tags: [
      "Retell AI",
      "Voice AI",
      "Node.js",
      "Supabase",
      "Twilio",
      "GoHighLevel",
      "HIPAA",
      "Next.js",
    ],
    href: "https://voice-os-sigma.vercel.app",
    hrefLabel: "View live",
    featured: true,
  },
  {
    slug: "bayut-pro",
    title: "Bayut Pro",
    type: "Marketplace App",
    summary:
      "Large-scale real estate marketplace with Mapbox clustering and viewport queries at high traffic.",
    overview:
      "Large-scale real estate marketplace mobile application with real-time property data and a scalable backend architecture serving high-traffic usage.",
    highlights: [
      "Mapbox-powered map search with clustering and viewport-bounded queries",
      "Real-time property data with advanced multi-criteria filtering",
      "Scalable backend architecture built for sustained high-traffic usage",
      "Shipped to both iOS and Android from a single React Native codebase",
    ],
    tags: ["React Native", "Mapbox", "Node.js", "PostgreSQL", "iOS", "Android"],
    href: "https://play.google.com/store/apps/details?id=com.bayut.bayutpro",
    hrefLabel: "Play Store",
    featured: true,
  },
  {
    slug: "mad-muscles",
    title: "Mad Muscles",
    type: "Consumer Mobile App",
    summary:
      "High-traffic fitness app with personalized plans, Stripe subscriptions, and analytics at scale.",
    overview:
      "High-traffic fitness and subscription-based mobile app with personalized programming and engagement analytics at scale.",
    highlights: [
      "Personalized workout plans with AI-assisted recommendations",
      "Stripe subscription billing across the full lifecycle",
      "User engagement analytics and progress tracking at scale",
      "Cross-platform delivery on iOS and Android",
    ],
    tags: ["React Native", "Stripe", "Firebase", "Node.js", "iOS", "Android"],
    href: "https://play.google.com/store/apps/details?id=com.amomedia.madmuscles",
    hrefLabel: "Play Store",
    featured: true,
  },
  {
    slug: "rasandpay",
    title: "RasandPay",
    type: "Fintech App",
    summary:
      "Fintech mobile app with secure transaction flows, card management, and ACH/wire support.",
    overview:
      "Fintech mobile application with secure transaction flows and a reliability-first backend built for financial data integrity.",
    highlights: [
      "Secure transaction flows with card management",
      "ACH and wire transfer support",
      "Reliability-first backend designed around financial data integrity",
    ],
    tags: ["React Native", "Node.js", "PostgreSQL", "AWS", "Fintech"],
    featured: true,
  },
  {
    slug: "fintech-transaction-platform",
    title: "Fintech Transaction Platform",
    type: "Fintech Backend",
    summary:
      "ACH and wire transaction backends supporting pacs.008, camt.053, and camt.056 banking standards.",
    overview:
      "Backend systems for ACH and wire transactions supporting banking message standards (pacs.008, camt.053, camt.056).",
    highlights: [
      "SFTP-based file processing pipelines for direct banking integrations",
      "Event-driven queue systems for time-sensitive financial operations",
      "Real-time validation and reconciliation with compliance-grade audit trails",
      "Support for pacs.008, camt.053, and camt.056 message standards",
    ],
    tags: [
      "Java Spring Boot",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "SFTP",
      "Queue Systems",
    ],
    confidential: true,
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// ── Experience ───────────────────────────────────────────────────────────
export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  stack: string[];
  points: string[];
  href?: string;
  current?: boolean;
};

export const experience: Role[] = [
  {
    company: "SobrietyHub",
    title: "Senior Platform Engineer",
    period: "Jul 2025 — Present",
    location: "Remote",
    href: "https://sobrietyhub.com",
    stack: [
      "TypeScript",
      "React Native (Expo)",
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "AWS",
      "Terraform",
      "GitHub Actions",
      "Stripe",
    ],
    points: [
      "Ship features across a multi-service SaaS platform for sober living homes — a React Native resident app, a Next.js admin web app, and AWS-hosted microservices",
      "Designed and built \"Phases\", a stage-based resident progression system: four new domain entities with interval-based history for progression analytics and audit, plus per-phase curfew, visitor-policy, and requirement configuration",
      "Delivered a HIPAA Safe Harbor-compliant de-identification pipeline for account cancellation, nulling and generalizing PII and sub-state geographic identifiers while preserving row structure for aggregate analytics",
      "Rebuilt CI/CD on GitHub Actions with OIDC keyless auth, branch-to-environment routing across three AWS accounts, per-developer deployments to isolated ECS services, and fail-closed guards against misrouted deploys",
      "Stood up a greenfield AWS dev environment in Terraform mirroring staging: VPC and subnets, RDS, S3, API Gateway, four ECS Fargate services, and a Lambda WebSocket authorizer — cutting dev cost with Fargate Spot and enabling deployment circuit breakers with auto-rollback",
      "Built an automated chore rotation algorithm with offset-based fair distribution that survives mid-cycle roster changes, scheduled via Vercel cron",
      "Built a resident self-service portal with an edit-request approval workflow, feature-flagging infrastructure across three repos for staged rollouts, and Stripe ACH microdeposit verification",
    ],
    current: true,
  },
  {
    company: "AshSol",
    title: "Backend Engineer",
    period: "Jun 2024 — Present",
    location: "Islamabad, Pakistan",
    stack: ["Java", "Spring Boot", "NestJS", "TypeScript"],
    points: [
      "Designed and implemented scalable microservices for a fintech platform processing real-time ACH and wire transactions",
      "Built secure SFTP-based file processing pipelines for banking integrations, replacing manual workflows and improving efficiency by 80%",
      "Developed event-driven and queue-based systems for time-sensitive financial operations with fault tolerance",
      "Implemented KYC and compliance workflows using Spring Security",
    ],
    current: true,
  },
  {
    company: "ZIXEL Technologies",
    title: "JavaScript / TypeScript Developer",
    period: "Apr 2022 — May 2024",
    location: "Islamabad, Pakistan",
    stack: ["Vue", "JavaScript", "TypeScript", "React", "Three.js", "Node.js"],
    points: [
      "Developed scalable backend services and APIs for high-traffic SaaS and enterprise platforms including cloud-based CAD and VR tools",
      "Built real-time communication systems using WebSockets",
      "Contributed to Alibaba Cloud infrastructure including ECS provisioning, VPC configuration, OSS for 3D asset delivery, and Nginx reverse proxy setup",
      "Mentored junior developers and enforced clean architecture across the team",
    ],
  },
];

// ── Credentials ──────────────────────────────────────────────────────────
export type Certification = {
  name: string;
  issuer: string;
  href?: string;
};

export const certifications: Certification[] = [
  { name: "Java Spring Boot", issuer: "Amigoscode" },
  { name: "React Specialization", issuer: "Meta" },
  { name: "Version Control with Git", issuer: "Atlassian" },
  {
    name: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI · Coursera",
    href: "https://www.coursera.org/account/accomplishments/specialization/NTR3VGSKWLFD",
  },
];

export const education = {
  school: "COMSATS University Islamabad",
  degree: "BS, Computer Science",
  period: "2018 — 2022",
  detail: "CGPA 3.19",
  courses: ["OOP", "DSA", "DBMS", "Operating Systems", "AI", "Machine Learning"],
} as const;

// ── How I work ───────────────────────────────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Scope",
    body: "We pin down the outcome, the constraints, and what's actually in v1. You get a written plan and an estimate before any code is written.",
  },
  {
    step: "02",
    title: "Build",
    body: "Short feedback loops and working software early. You see progress every week — no black boxes, no month-long silences.",
  },
  {
    step: "03",
    title: "Ship",
    body: "Tested, deployed, and documented on real infrastructure with CI/CD, monitoring, and handover notes your team can act on.",
  },
  {
    step: "04",
    title: "Support",
    body: "I stay on after launch to monitor, fix, and extend. The codebase is structured so the next feature isn't a rewrite.",
  },
];

// ── FAQ (also emitted as FAQPage structured data) ────────────────────────
export const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Production software with a real user at the end of it: SaaS platforms, AI and RAG systems, voice AI, fintech backends, and cross-platform mobile apps. I'm most useful on projects that need both the AI layer and the product engineering around it.",
  },
  {
    q: "Do you work solo or with a team?",
    a: "Both. Most engagements I handle end to end myself. For larger scopes I bring in senior developers through Aventrex Digital, my agency, and stay directly responsible for architecture and delivery.",
  },
  {
    q: "How do you handle AI features that need to be reliable?",
    a: "Retrieval before generation, structured output validation on every response, and grounding so answers trace back to source data. That's the difference between a demo and something you can put in front of customers.",
  },
  {
    q: "What are your timezone and availability like?",
    a: "I'm in Islamabad (GMT+5) and overlap comfortably with both EU and US mornings. I'm available for freelance and contract work, and I reply to every serious inquiry — usually within a day.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Yes. A good share of my work is joining a live system: fixing what's fragile, extending what works, and leaving the architecture better documented than I found it.",
  },
  {
    q: "How do engagements usually start?",
    a: "A short call to understand the problem, then a written scope with milestones and a fixed estimate. You know the plan and the cost before the first commit.",
  },
];
