// Venkatesh Kurumalla Portfolio Data - Single Source of Truth
// Critical: All resume details are preserved exactly as provided.
// Note: Placeholders are provided for social and project links where actual URLs were not in the resume.

export const portfolioData = {
  personalInfo: {
    name: "Venkatesh Kurumalla",
    title: "Aspiring Software Developer & ECE Student",
    phone: "+91 8074455377",
    email: "venkykurumalla.90@gmail.com",
    location: "Jaggampeta, Andhra Pradesh",
    socials: {
      github: "https://github.com/venkykurumalla", // PLACEHOLDER: Update with actual GitHub URL
      linkedin: "https://linkedin.com/in/venkykurumalla", // PLACEHOLDER: Update with actual LinkedIn URL
      portfolio: "#" // PLACEHOLDER: Update with actual Portfolio URL if different
    }
  },

  hero: {
    headline: "Aspiring Software Developer",
    supportingHeadline: "Interested in AI, Large Language Models, and Full-Stack Web Development.",
    objective: "Motivated ECE student with knowledge of Java and experience in Flutter development. Seeking an internship to apply problem-solving skills, gain industry exposure, and contribute to real-world software solutions."
  },

  about: {
    description: [
      "I am an aspiring Software Developer with a strong interest in Artificial Intelligence, Large Language Models (LLMs), and Full-Stack Web Development.",
      "I specialize in applying modern software engineering principles and technologies including JavaScript, React, Node.js, MongoDB, and modern AI architectures to create robust solutions.",
      "Driven by a passion for continuous learning and innovation, I am eager to apply my technical skills, gain hands-on industry experience, and contribute to impactful software engineering initiatives."
    ],
    highlights: [
      "Artificial Intelligence & LLM Integration",
      "Full-Stack Web Application Development",
      "Mobile App Development with Flutter",
      "Robust API Design & Database Management"
    ]
  },

  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React.js"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js"]
    },
    {
      category: "Database",
      items: ["MongoDB", "SQL"]
    },
    {
      category: "Programming",
      items: ["Java", "JavaScript"]
    },
    {
      category: "AI / LLM",
      items: ["Prompt Engineering", "Large Language Models (LLMs)", "AI Chatbot Development"]
    },
    {
      category: "Mobile Development",
      items: ["Flutter"]
    },
    {
      category: "IoT",
      items: ["Internet of Things (IoT)"]
    },
    {
      category: "Networking",
      items: ["TCP/IP", "OSI Model", "Routing & Switching", "DNS", "DHCP", "Network Troubleshooting"]
    },
    {
      category: "Cloud",
      items: ["Oracle Cloud Infrastructure (OCI)"]
    },
    {
      category: "Tools & Utilities",
      items: ["Git", "GitHub", "Postman", "Cisco Packet Tracer", "Wireshark"]
    }
  ],

  projects: [
    {
      id: "ap-forest",
      title: "Andhra Pradesh State Forest Academy Portal (AP Forest)",
      description: "Developed a comprehensive training and resource portal for the A.P. State Forest Academy (APSFA), Rajamahendravaram. Features customized learning dashboards for Forest Range Officer (FRO) and Forest Beat Officer (FBO) trainees, interactive syllabus hubs, and a RAG-based AI chatbot trained on forestry manuals to resolve student questions instantly.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Python", "RAG", "Vector Store", "Node.js", "Express.js"],
      link: "https://ap-forest.vercel.app/"
    },
    {
      id: "smart-exam-portal",
      title: "Smart Exam Portal",
      description: "Designed and built a secure online examination and proctoring dashboard for students and educators. Features web-based proctoring protections including real-time video/audio monitoring, tab-switching detection using the Page Visibility API, and clipboard restrictions to prevent copy-paste actions during active tests.",
      technologies: ["React.js", "Tailwind CSS", "WebRTC", "Page Visibility API", "Firebase", "Node.js", "Express.js", "MongoDB"],
      link: "https://smartexamportel.vercel.app/"
    },
    {
      id: "smart-ambulance",
      title: "On-Demand Smart Ambulance Mobile Application",
      description: "Designed and developed a mobile-based on-demand ambulance application using Flutter to reduce emergency response time and improve access to medical services. The application allows users to request an ambulance instantly by sharing their live location. Implemented real-time tracking to display ambulance movement on the application interface, enabling patients and hospitals to monitor arrival status. The system improves coordination between users, ambulance drivers, and hospitals, ensuring faster decision-making during emergency situations. This project strengthened skills in mobile UI development, application flow design, and real-world problem solving.",
      technologies: ["Flutter", "Dart", "Mobile UI Design", "Real-time Tracking", "Geolocation"],
      link: "https://drive.google.com/drive/folders/1hB9qKNbolIEDHHv9xrcqJ95VzIpWskKQ?usp=sharing"
    },
    {
      id: "ai-tutor-app",
      title: "AI Tutor App",
      description: "Built an AI-powered learning platform for 6th to 10th grade students that provides instant answers to academic questions, personalized guidance, and an interactive learning experience through a user-friendly interface.",
      technologies: ["AI/LLM", "Prompt Engineering", "Interactive UI", "EdTech"],
      link: "https://drive.google.com/file/d/1WGssZPjbpGkxTz3TrkBBDpSKCw0gsDwt/view?usp=sharing"
    },
    {
      id: "ai-tutor-web",
      title: "AI Tutor Web",
      description: "Developed an AI-powered educational platform leveraging LLMs for personalized tutoring and intelligent doubt-solving. Implemented student login and a user-friendly interface to improve learning outcomes and engagement.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "LLMs", "AI Integration", "User Auth"],
      link: "#" // PLACEHOLDER: Update with actual Project URL
    },
    {
      id: "student-api",
      title: "Student Management API using Node.js and MongoDB",
      description: "Developed a RESTful Student Management API using Node.js, Express.js, and MongoDB with CRUD operations and Postman-tested endpoints.",
      technologies: ["Node.js", "Express.js", "MongoDB", "RESTful API", "Postman", "CRUD Operations"],
      link: "#" // PLACEHOLDER: Update with actual Project URL
    }
  ],

  experience: [
    {
      role: "Web Development Intern",
      company: "Cantilever",
      type: "Virtual Internship",
      duration: "Oct 2025 — Dec 2025",
      description: "Worked on web development and backend implementation, gaining experience in API integration and RESTful services. Assisted in building and testing web applications while enhancing debugging and problem-solving skills."
    },
    {
      role: "Techwing frontend intern",
      company: "Techwing",
      type: "Internship",
      duration: "Dec 2025 — Feb 2026",
      description: "" // Critically left empty as no description is provided in the resume
    }
  ],

  education: [
    {
      degree: "B.Tech, Electronics and Communication Engineering",
      institution: "Godavari Institute of Engineering & Technology",
      duration: "2023 – 2027",
      description: "" // No grades or subjects added to prevent fabrication
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      duration: "2021 – 2023",
      description: "" // No grades or subjects added to prevent fabrication
    }
  ],

  certifications: [
    {
      name: "Certiport Networking Certification",
      issuer: "Certiport",
      link: "#" // PLACEHOLDER: Update with verification link
    },
    {
      name: "Oracle Certified Foundations Associate",
      issuer: "Oracle",
      link: "#" // PLACEHOLDER: Update with verification link
    },
    {
      name: "Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle",
      link: "#" // PLACEHOLDER: Update with verification link
    }
  ]
};
