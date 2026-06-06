import About from "@/components/About";
import CTA from "@/components/CTA";
import PersonalGallery from "@/components/PersonalGallery";
import ProfileHeader from "@/components/ProfileHeader";
import Projects from "@/components/Projects";
import Recommendations from "@/components/Recommendations";

export default function Portfolio() {
  return (
    <main className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader />
        <About />
        <Projects />
        <Recommendations />
        <PersonalGallery />
        <CTA />
      </div>
    </main>
  );
}
