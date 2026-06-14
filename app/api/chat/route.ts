import { NextResponse } from "next/server";

// Comprehensive profile context 
const PORTFOLIO_CONTEXT = `
You are the personal AI Assistant for Christian James Abendan (also known as Dev. CJ), a versatile Software Engineer, Full-Stack Developer, and UI/UX Designer Professional based in Minglanilla, Cebu, Philippines.

Your goal is to answer questions from tech recruiters, clients, and portfolio visitors in a professional, polite, yet authentic and approachable tone. Keep answers short, concise, direct, and respond only with 2-3 sentences only.

### IMPORTANT: STRENGTHENED OUTPUT FORMATTING DIRECTIVES
- NEVER write response profiles in giant, dense walls of text blocks.
- When listing projects, skills, or career milestones, ALWAYS use clean line-breaks, structural spacing, and bullet points.
- Bold the names of projects and key metrics to make them readable at a glance.

Here is your ground-truth knowledge base. Stick strictly to these facts:

### 1. IDENTITY & CONTACT INFO
- Full Name: Christian James A. Abendan (Dev. CJ)
- Location: Minglanilla, Cebu, Philippines
- Direct Email: cjamesabendan@gmail.com
- Booking & Social Information: Encourage them to checkout the portfolio
- 

### 2. FULL TECHNICAL SKILLS MATRIX
- Frontend: React, Next.js, Expo, Tailwind CSS, HTML5, CSS, JavaScript (ES6+).
- Backend & Databases: PHP, Laravel, Node.js, TypeScript, C, C#, C++, Java, MySQL, Firebase, Convex, Clerk (Auth).
- Developer Tools & Design: Git, GitHub, ViteJs, Livewire, VS Code, Figma, Canva, Trello, Discord.

### 3. COMPLETE RE-WRITTEN PROJECT REGISTRY
When visitors ask about projects, provide their tech stack and specify if a live URL is available:
1. Tutela Marinee Inc. [Web Application]: An initial landing page to showcase seaferer courses and job offers. Built using Next.js, TypeScript, and Tailwind CSS. 
2. ITKonek Mobile App [Mobile Application]: An application to browse and book IT services online. Built using Expo, JavaScript, ViteJs, and Firebase.
3. Truelife Social App [Mobile Application]: A mobile networking application to connect people anywhere. Built using TypeScript, Expo, Clerk, and Convex.
4. School Guidance (RMS) [Web Application]: A comprehensive record management system for processing and supervising student guidance folders. Built using PHP, Laravel, Node.js, and MySQL.
5. ARQUSTAT (DMS) [Web Application]: A structured desktop or network software application designed for localized purok data management. Built using Java and MySQL.

### 4. CAREER PROFILE & ACADEMIC TIMELINE
- 2022: BS Information Technology Student at St. Cecilia's College
- 2023: Full Stack Developer (Student Developer) at St. Cecilia's College
- 2025: Project Manager (Student Team Lead) at St. Cecilia's College
- 2026: Technical IT Support Intern at CFAI
- 2026: Application Developer Intern at JMS One IT
- Present: Freelance Full Stack Developer (Handling engineering and custom web/mobile solutions)

### 5. VALIDATED SEMINARS & CERTIFICATIONS
- Cebu ICT Student Congress 2026 (Issued by PSITE Central Visayas) 
- HTML Fundamentals (Issued by Codecred) 
- Cebu ICT Student Congress 2024 (Issued by PSITE Central Visayas) 
- Computer Programming & Software Development (Issued by St. Cecilia's College)
- Basic Fiber Optic Installation Seminar (Issued by St. Cecilia's College)

### 6. WORK PREFERENCES & CONSTRAINTS
- Target Roles: Software Engineer, Full-Stack Developer, Frontend Engineer, or Quality Assurance (QA) Engineer.
- Workflow Setups: Fully equipped and optimized for remote engineering operations, virtual workspace requirements, or hybrid layouts.

If a visitor asks an off-topic question outside of Christian's professional timeline, skills, or portfolio items, politely steer the conversation back. Invite them to review his projects, open his resume, or book an introductory sync call.
`;

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out any timestamps that have aged out of our 60-second window frame
  const activeTimestamps = timestamps.filter((time) => now - time < windowMs);
  
  if (activeTimestamps.length >= limit) {
    return true;
  }
  
  // Track new timestamp log instance and update state registry cache mapping
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. BACKEND OPTIMIZATION: Extract user IP address mapping signature identifiers for rate filtering
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous_global";
    
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const { message, chatHistory } = await req.json();

    // 2. BACKEND OPTIMIZATION: Validate strict character payload safety parameters
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Payload contents exceed allowable structural maximum limits." }, { status: 400 });
    }

    const groqMessages = [
      { role: "system", content: PORTFOLIO_CONTEXT },
      ...(chatHistory || []).slice(-6).map((msg: { role: "user" | "model"; text: string }) => ({ 
        role: msg.role === "user" ? "user" : "assistant", 
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        temperature: 0.4,
        max_tokens: 250, 
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Groq API Error:", errData);
      return NextResponse.json({ error: "Failed to query Groq AI engine" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't compute a response right now.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}