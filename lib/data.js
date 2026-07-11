export const profile = {
  name: "Tanveer Singh Dhanjal",
  firstName: "Tanveer",
  role: "Full-Stack Web Developer",
  subrole: "B.Tech IT Student",
  location: "Ludhiana, Punjab, India",
  email: "tanveerdhanjal7@gmail.com",
  phone: "+91-7837124365",
  whatsapp: "https://wa.me/917837124365",
  github: "https://github.com/TanveerSingh07",
  githubUser: "TanveerSingh07",
  linkedin: "https://linkedin.com/in/tanveer-singh-dhanjal-07677b371",
  leetcode: "https://leetcode.com/u/Tanveer07",
  leetcodeUser: "Tanveer07",
  resumeFile: "/Tanveer_Singh_Dhanjal_Resume.pdf",
  // Get a free access key at https://web3forms.com (no signup fee, just your email)
  // and paste it here — the contact form POSTs directly to Web3Forms, which
  // forwards the message straight to your inbox. No backend/server needed.
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  tagline:
    "Third-year B.Tech IT student who turns ideas into real, working products — from cybersecurity dashboards to full checkout flows.",
  about:
    "I build full-stack web applications end to end — the database schema, the API, and the last pixel of the UI. I like problems that force me to learn something new: how OAuth actually works, why a socket connection drops, how to make a checkout flow feel trustworthy. Currently exploring how AI fits into the products I build next.",
  titles: [
    "Full Stack Developer",
    "Problem Solver",
    "Building Real Products",
    "Open to Freelance Projects",
  ],
};

export const stats = [
  { label: "CGPA", value: 9.73, suffix: "", decimals: 2 },
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 18, suffix: "+" },
  { label: "Hackathons", value: 5, suffix: "+" },
  { label: "Leadership Roles", value: 2, suffix: "" },
  { label: "DSA Problems Solved", value: 300, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "" },
];

export const journey = [
  {
    year: "2021",
    icon: "code",
    title: "Wrote my first line of code",
    detail:
      "Started with C and C++ in school, mostly out of curiosity about how software actually worked under the hood.",
  },
  {
    year: "2022",
    icon: "globe",
    title: "Discovered web development",
    detail:
      "Fell into HTML, CSS and JavaScript — the instant feedback loop of the browser hooked me immediately.",
  },
  {
    year: "2023",
    icon: "graduation",
    title: "Started B.Tech in Information Technology",
    detail:
      "Joined Guru Nanak Dev Engineering College, Ludhiana, and began formalising everything I'd taught myself.",
  },
  {
    year: "2023 – 24",
    icon: "branch",
    title: "Went full-stack with the MERN stack",
    detail:
      "Learned React, Node.js, Express and MongoDB, and started shipping small full-stack projects end to end.",
  },
  {
    year: "2024",
    icon: "users",
    title: "Became Student Coordinator, T&P Cell",
    detail:
      "Took on leadership at the Training & Placement Cell and joined the Student Council at GNDEC.",
  },
  {
    year: "2024 – 25",
    icon: "rocket",
    title: "Built real products",
    detail:
      "Shipped ScamSense, PeerConnect and Makhaana — three full-stack products solving real, different problems.",
  },
  {
    year: "2025",
    icon: "trophy",
    title: "Competed in hackathons",
    detail:
      "Took part in Smart India Hackathon (SIH) and several college hackathons, building under pressure with a team.",
  },
  {
    year: "Now",
    icon: "sparkles",
    title: "Exploring AI-driven products",
    detail:
      "Currently learning how to weave AI and automation into full-stack applications rather than building around it.",
  },
];

// weight controls bubble size in the tech constellation: lg > md > sm
export const techStack = [
  {
    name: "React",
    category: "Frontend",
    weight: "lg",
    usage: "Component architecture for ScamSense, PeerConnect and Makhaana — all three UIs are built on React.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    weight: "md",
    usage: "Powers Makhaana E-Commerce — App Router, server components and API routes for a full storefront.",
  },
  {
    name: "JavaScript",
    category: "Language",
    weight: "lg",
    usage: "The language every project shares — from DOM interactions to Node.js backends.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    weight: "md",
    usage: "Design system for PeerConnect's dashboards and this very portfolio — utility-first, fully responsive.",
  },
  {
    name: "Node.js",
    category: "Backend",
    weight: "lg",
    usage: "Runtime behind every REST API I've shipped — ScamSense's scanning engine runs on it.",
  },
  {
    name: "Express.js",
    category: "Backend",
    weight: "md",
    usage: "Routing and middleware layer for ScamSense and PeerConnect's APIs, including JWT auth middleware.",
  },
  {
    name: "MongoDB",
    category: "Database",
    weight: "lg",
    usage: "Primary datastore for ScamSense, PeerConnect and Makhaana — schemas for users, scans, posts and orders.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    weight: "sm",
    usage: "Used in coursework and side projects needing relational integrity and complex joins.",
  },
  {
    name: "Python",
    category: "Language",
    weight: "md",
    usage: "Scripting, automation and problem-solving — also the language behind my Python Foundation certification.",
  },
  {
    name: "Java",
    category: "Language",
    weight: "md",
    usage: "Core DSA practice and OOP fundamentals — most of my 300+ solved problems started here.",
  },
  {
    name: "Git",
    category: "Tooling",
    weight: "sm",
    usage: "Version control on every project — branching, PRs and history I actually keep clean.",
  },
  {
    name: "REST APIs",
    category: "Tooling",
    weight: "sm",
    usage: "Designed and documented REST APIs for all three flagship projects, tested via Postman.",
  },
];

export const projects = [
  {
    id: "scamsense",
    name: "ScamSense",
    tagline: "A cybersecurity platform that helps people recognise scams before they fall for them.",
    year: "2024 – 25",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Google OAuth"],
    github: "https://github.com/TanveerSingh07/ScamSense",
    demo: null,
    color: "#4A6CF7",
    problem:
      "Everyday users have no fast, reliable way to check whether a suspicious file, email, or link is actually a scam — by the time they realise, the damage is done.",
    solution:
      "ScamSense scans files and emails for risk signals and gives users a clear, personalised risk analysis in seconds, backed by a dashboard that tracks their exposure over time.",
    features: [
      "File and email scanning with automated risk scoring",
      "JWT authentication alongside Google OAuth for fast, secure sign-in",
      "Personalised analytics dashboard showing risk history",
      "Browser activity monitoring to flag suspicious behaviour in real time",
      "Community-driven scam reporting so users protect each other",
      "A scam-awareness game that teaches recognition patterns through play",
    ],
    architecture:
      "A MERN application: a React SPA talks to an Express/Node REST API, which handles scanning logic, OAuth/JWT-based auth, and persists users, scans and reports in MongoDB. Browser activity signals are captured client-side and sent to the risk engine for scoring.",
    challenges:
      "Balancing false positives against real detection meant iterating on the risk-scoring logic repeatedly, and wiring JWT sessions alongside Google OAuth cleanly without duplicating user records took careful backend design.",
  },
  {
    id: "peerconnect",
    name: "PeerConnect",
    tagline: "A student networking platform built for real-time peer connection, not passive scrolling.",
    year: "2024",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/TanveerSingh07/PeerConnect",
    demo: "#",
    color: "#3552C6",
    problem:
      "Students on campus had scattered, disconnected ways to find peers with shared interests, projects, or study needs — mostly group chats that go nowhere.",
    solution:
      "PeerConnect gives students real profiles, a peer-connection system, and real-time messaging in one responsive platform, so finding and reaching the right person takes seconds, not scrolling.",
    features: [
      "Full profile management with skills, interests and activity",
      "Peer connection system to find and add relevant classmates",
      "Real-time messaging and interaction built on Socket.io",
      "Post-based engagement feed for updates and discussions",
      "Responsive dashboards tailored to each user's activity",
    ],
    architecture:
      "MERN stack with a Socket.io layer bridging the React client and Express server for live messaging. Tailwind CSS drives a fully responsive UI, while MongoDB stores profiles, connections, posts and message threads.",
    challenges:
      "Keeping Socket.io connections stable and in sync with REST-driven state (so a message never appears twice or drops on reconnect) required a careful client-side connection and event-cleanup strategy.",
  },
  {
    id: "makhaana",
    name: "Makhaana E-Commerce",
    tagline: "A full-featured e-commerce storefront, from product browsing to a real payment checkout.",
    year: "2024 – 25",
    stack: ["Next.js", "MongoDB", "Razorpay", "REST APIs"],
    github: "https://github.com/TanveerSingh07/Makhaana",
    demo: "#",
    color: "#8AA0F2",
    problem:
      "Small product businesses need an online store that feels trustworthy end to end — browsing, cart, checkout and payment — not just a product listing page.",
    solution:
      "Makhaana is a complete storefront built on Next.js: product browsing, cart management, order handling, and a real Razorpay-powered checkout, wrapped in a responsive, fast UI.",
    features: [
      "Product browsing with category and search flows",
      "Cart management with persistent state across sessions",
      "Order handling and shipment tracking for every purchase",
      "Razorpay payment gateway integrated for secure checkout",
      "Authentication to keep orders and carts tied to the right user",
      "Fully responsive UI across mobile, tablet and desktop",
    ],
    architecture:
      "Built on Next.js using the App Router for both pages and API routes, with MongoDB storing products, carts and orders. Razorpay handles payment intents and webhooks confirm order status server-side before releasing shipment tracking.",
    challenges:
      "Getting the Razorpay checkout flow to be both secure and seamless — validating payments server-side via webhooks rather than trusting the client — was the trickiest part of the build.",
  },
];

export const services = [
  {
    step: "Discover",
    title: "Understand the problem",
    detail: "I start by understanding who this is for and what 'done' actually looks like — not just the feature list.",
  },
  {
    step: "Design",
    title: "Plan the structure",
    detail: "Data models, API contracts and UI flows get sketched before a single component is built.",
  },
  {
    step: "Build",
    title: "Ship full-stack",
    detail: "Frontend, backend and database come together as one working product, iterated in small, testable pieces.",
  },
  {
    step: "Test",
    title: "Break it on purpose",
    detail: "I test edge cases, auth flows and failure states before a user ever gets the chance to find them.",
  },
  {
    step: "Deploy",
    title: "Take it live",
    detail: "CI-friendly deployments with environment configs, monitoring and a rollback plan in place.",
  },
  {
    step: "Support",
    title: "Stick around",
    detail: "Bugs get fixed and features get added after launch — I don't disappear once it ships.",
  },
];

export const achievements = [
  {
    category: "Leadership",
    title: "Student Coordinator, Training & Placement Cell",
    org: "GNDEC, Ludhiana",
    detail: "Coordinated placement drives and communication between students and the T&P Cell.",
  },
  {
    category: "Leadership",
    title: "Student Council Member",
    org: "GNDEC, Ludhiana",
    detail: "Represented student interests and helped organise technical events and fests.",
  },
  {
    category: "Hackathon",
    title: "Smart India Hackathon (SIH)",
    org: "Government of India initiative",
    detail: "Built under real time pressure alongside a team, from problem statement to working prototype.",
  },
  {
    category: "Hackathon",
    title: "Multiple college hackathons",
    org: "GNDEC & peer institutions",
    detail: "Repeated hackathon participation sharpened fast prototyping and team collaboration.",
  },
  {
    category: "Certification",
    title: "Web Development Bootcamp",
    org: "Udemy",
    detail: "Full-stack fundamentals across the modern web development toolchain.",
  },
  {
    category: "Certification",
    title: "Angular & React",
    org: "Infosys Springboard",
    detail: "Comparative, hands-on frontend framework training.",
  },
  {
    category: "Certification",
    title: "Python Foundation",
    org: "Infosys Springboard",
    detail: "Core Python fundamentals, later applied to scripting and problem-solving.",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech), Information Technology",
    school: "Guru Nanak Dev Engineering College, Ludhiana",
    period: "2023 – 2027 (Expected)",
    detail: "Current CGPA: 9.73",
  },
  {
    degree: "Class 12, State Board",
    school: "R.S. Model Senior Secondary School, Ludhiana",
    period: "2023",
    detail: "Percentage: 98.4%",
  },
];
