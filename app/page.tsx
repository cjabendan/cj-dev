
import About from "@/components/About";
import ProfileHeader from "@/components/ProfileHeader";


export default function Portfolio() {
  return (
    <main className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader />
        <About />
      </div>
    </main>
  );
}
