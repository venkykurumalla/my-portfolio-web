// Venkatesh Kurumalla Portfolio Data - Single Source of Truth
// Critical: All resume details are preserved exactly as provided.
// Note: Placeholders are provided for social and project links where actual URLs were not in the resume.

export const portfolioData = {
  personalInfo: {
    name: "Venkatesh Kurumalla",
    title: "Aspiring Software Engineer | Full-Stack & AI/LLM",
    resume: "/resume.pdf",
    phone: "+91 8074455377",
    email: "venkykurumalla7@gmail.com",
    location: "Jaggampeta, Andhra Pradesh",
    socials: {
      github: "https://github.com/venkykurumalla", // PLACEHOLDER: Update with actual GitHub URL
      linkedin: "https://linkedin.com/in/venkykurumalla", // PLACEHOLDER: Update with actual LinkedIn URL
      portfolio: "#" // PLACEHOLDER: Update with actual Portfolio URL if different
    }
  },

  hero: {
    headline: "Aspiring Software Engineer",
    supportingHeadline: "Full-Stack Web Development, AI, and Modern Applications.",
    roles: ["Full-Stack Developer", "React Developer", "AI / LLM Enthusiast"],
    objective: "Aspiring Software Engineer with hands-on experience in Java, JavaScript, React.js, Node.js, MongoDB, and full-stack web development. Experienced in developing real-world web applications, REST APIs, and a government website for AP Forest Academy. Seeking an internship to apply technical skills and contribute to impactful, scalable applications."
  },

  about: {
    description: [
      "Aspiring Software Engineer with hands-on experience in Java, JavaScript, React.js, Node.js, MongoDB, and full-stack web development.",
      "Experienced in developing real-world web applications, REST APIs, and a government website for AP Forest Academy.",
      "Seeking an internship to apply technical skills and contribute to impactful, scalable applications."
    ],
    highlights: [
      "Full-Stack Web Application Development",
      "Artificial Intelligence & LLM Integration",
      "Robust API Design & Database Management",
      "Core Computer Science & System Design"
    ]
  },

  skills: [
    { category: "Languages", items: ["Java", "JavaScript"] },
    { category: "Frontend", items: ["HTML", "CSS", "React.js"] },
    { category: "Backend", items: ["Node.js", "Express.js", "Spring Boot", "REST APIs"] },
    { category: "Database", items: ["MongoDB", "SQL"] },
    { category: "Core Computer Science", items: ["DSA", "System Design", "Computer Networks"] },
    { category: "AI / LLM", items: ["Prompt Engineering", "LLMs"] },
    { category: "Tools", items: ["Git", "GitHub", "Postman"] },
    { category: "Mobile", items: ["Flutter"] }
  ],

  projects: [
    {
      id: "ap-forest",
      title: "AP Forest Academy Government Web",
      description: "Developed and deployed a production-ready government website for the A.P. State Forest Academy, providing a centralized platform for academy information and training resources. Built responsive web components and structured navigation for administration, officer training programs, syllabi, training materials, facilities, government orders, news, gallery, results, and contact information. Implemented interactive UI sections, responsive layouts, PDF/document viewing, and organized resource navigation to improve accessibility and usability. Managed frontend development, asset integration, production builds, and deployment for desktop and mobile platforms.",
      technologies: ["React.js", "HTML", "CSS", "JavaScript", "Frontend Development", "Production Build"],
      link: "https://www.apsfarjy.com/",
      images: [
        "/projects/ap-forest.webp",
        "/projects/ap-forest-1.webp",
        "/projects/ap-forest-2.webp",
        "/projects/ap-forest-3.webp",
        "/projects/ap-forest-4.webp",
        "/projects/ap-forest-5.webp"
      ]
    },
    {
      id: "smart-exam-portal",
      title: "Smart Examination Portal",
      description: "Developed and deployed a web-based examination platform to digitize the online assessment process. Implemented structured question presentation, online test workflows, answer submission, question management, and automated result evaluation. Designed responsive and interactive interfaces for smooth examination experiences across desktop and mobile devices, reducing manual evaluation and streamlining assessment.",
      technologies: ["React.js", "Web Development", "Interactive UI"],
      link: "https://smartexamportel.vercel.app/",
      images: [
        "/projects/smart-exam.webp",
        "/projects/smart-exam-1.webp",
        "/projects/smart-exam-2.webp",
        "/projects/smart-exam-3.webp",
        "/projects/smart-exam-4.webp"
      ]
    },
    {
      id: "ai-tutor-app",
      title: "AI Tutor App",
      description: "Built an AI-powered learning platform for 6th to 10th grade students that provides instant answers to academic questions, personalized guidance, and an interactive learning experience through a user-friendly interface.",
      technologies: ["AI/LLM", "Prompt Engineering", "Interactive UI", "EdTech"],
      link: "https://drive.google.com/file/d/1WGssZPjbpGkxTz3TrkBBDpSKCw0gsDwt/view",
      images: []
    },
    {
      id: "riet-crt",
      title: "RIET CRT Learning Portal",
      description: "Developed and deployed a web-based learning portal for RIET College to support Campus Recruitment Training (CRT) classes. Created a centralized platform for students to access course modules, learning materials, practice resources, and assessments, helping streamline the delivery of CRT training and student preparation.",
      technologies: ["Web Development", "Learning Management", "Frontend"],
      link: "https://riet-collegelms.vercel.app/",
      images: [
        "/projects/riet-crt.webp",
        "/projects/riet-crt-1.webp",
        "/projects/riet-crt-2.webp",
        "/projects/riet-crt-3.webp",
        "/projects/riet-crt-4.webp"
      ]
    },
    {
      id: "smart-ambulance",
      title: "On-Demand Smart Ambulance Mobile Application",
      description: "Developed a Flutter-based mobile application for emergency ambulance booking with real-time location tracking. Designed a user-friendly interface to improve coordination and response time during emergencies.",
      technologies: ["Flutter", "Mobile UI Design", "Real-time Tracking", "Geolocation"],
      link: "https://drive.google.com/drive/folders/1hB9qKNbolIEDHHv9xrcqJ95VzIpWskKQ"
    },
    {
      id: "student-api",
      title: "Student Management API using Node.js and MongoDB",
      description: "Designed and developed REST APIs using Node.js, Express.js, and MongoDB. Implemented CRUD operations, database integration, and scalable backend architecture for efficient data management.",
      technologies: ["Node.js", "Express.js", "MongoDB", "RESTful API", "CRUD Operations"],
      link: "https://github.com/venkykurumalla/mongo-DB"
    }
  ],

  experience: [
    {
      role: "Frontend Developer",
      company: "IT GLOBE",
      type: "",
      duration: "Jan 2026 – Aug 2026",
      description: "Developed and maintained responsive web applications using HTML, CSS, JavaScript, and React.js. Built reusable UI components, implemented responsive designs, and integrated REST APIs to deliver interactive and user-friendly web experiences."
    },
    {
      role: "Web Development Intern",
      company: "Cantilever",
      type: "Virtual Internship",
      duration: "Oct 2025 – Dec 2025",
      description: "Worked on web development, API integration, and RESTful services. Assisted in building and testing web applications while improving debugging and problem-solving skills."
    }
  ],

  education: [
    {
      degree: "B.Tech, Electronics and Communication Engineering",
      institution: "Godavari Institute of Engineering & Technology",
      duration: "2023 – 2027",
      description: "7.33 CGPA"
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      duration: "2021 – 2023",
      description: ""
    }
  ],

  certifications: [
    {
      name: "Certiport Networking Certification",
      issuer: "Certiport",
      link: "#" // PLACEHOLDER: Update with verification link
    },
    {
      name: "Oracle Certified Foundations Associate – Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle",
      link: "/certs/oracle-certification.pdf"
    }
  ]
};
