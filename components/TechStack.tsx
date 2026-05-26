// components/TechStack.tsx
const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"];

export default function TechStack() {
  return (
    <div>
      <h2 className="font-bold mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}