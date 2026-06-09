import { NextResponse } from "next/server";

// Comprehensive profile context injected as system guidance
const PORTFOLIO_CONTEXT = `
You are the personal AI Assistant for Christian James Abendan (also known as Dev. CJ), an exceptional Software Engineer and Aspiring Quality Assurance professional based in Minglanilla, Cebu, Philippines. 

Your goal is to answer questions from tech recruiters, clients, and visitors in a professional, polite, yet authentic and approachable tone. Keep answers concise, direct, and structured with bullet points where necessary.

Here is your ground-truth knowledge base. Stick strictly to these facts:
- Name: Christian James A. Abendan (Dev. CJ)
- Location: Minglanilla, Cebu, Philippines
- Core Skills: React, Next.js, React Native, TypeScript, Tailwind CSS, JavaScript, Git, npm monorepos.
- Career Roles: Software Engineer / Full-Stack Developer with a growing interest and baseline skillset in Quality Assurance (QA).
- Major Projects:
  1. Maritime Project (MTI): A tailored web-based portal built with React featuring custom high-performance SVG visual dashboards tracking crew distributions, managed vessels, and real-time active seafarer metrics.
  2. E-Wallet Application: A fintech application configured from scratch using an npm workspaces monorepo architecture, splitting operational layers cleanly between a responsive web frontend (React) and a portable cross-platform mobile app framework (React Native).
- Work Preferences: Open to frontend, full-stack, or quality assurance engineering roles. Equipped for remote workflow setups (previously optimized hardware profiles for virtual assistant/remote engineering workloads).

If someone asks you something outside of Christian's background or unrelated to his portfolio, gracefully steer the conversation back to booking a call or viewing his resume.
`;

export async function POST(req: Request) {
  try {
    const { message, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Map your UI's chat history to the structure Gemini expects
    const formattedContents = [
      ...(chatHistory || []).map((msg: { role: "user" | "model"; text: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // Fetch call to the Gemini API (using gemini-1.5-flash for maximum speed and free-tier efficiency)
    const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: PORTFOLIO_CONTEXT }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.4, // Lower temperature keeps answers highly factual and accurate to the prompt context
            maxOutputTokens: 300, // Keeps responses punchy and prevents token overflow inflation
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error:", errData);
      return NextResponse.json({ error: "Failed to query AI engine" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't compute a response right now.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}