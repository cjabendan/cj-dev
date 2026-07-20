import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import PersonalGallery from "@/components/sections/PersonalGallery";
import ProfileHeader from "@/components/sections/ProfileHeader";
import Projects from "@/components/sections/Projects";
import Recommendations from "@/components/sections/Recommendations";
import Footer from "@/components/layout/Footer";

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
        <Footer />
      </div>
    </main>
  );
}
