import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import FooterSection from "@/components/sections/FooterSection";
import PersonalGallery from "@/components/sections/PersonalGallery";
import ProfileHeader from "@/components/sections/ProfileHeader";
import Projects from "@/components/sections/Projects";
import Recommendations from "@/components/sections/Recommendations";
import BotWidget from "@/components/ui/BotWidget";

export default function Portfolio() {
  return (
    <main className="animate-fade-in">
      <BotWidget />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader />
        <About />
        <Projects />
        <Recommendations />
        <PersonalGallery />
        <CTA />
        <FooterSection />
      </div>
    </main>
  );
}
