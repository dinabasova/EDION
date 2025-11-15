import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import SocialMediaSection from "../app/components/SocialMediaSection";
import CoursesSection from "../app/components/CoursesSection";
import TeachersSection from "../app/components/TeachersSection";
import FAQSection from "../app/components/FAQSection";
import CTAFormSection from "../app/components/CTAFormSection";
import Footer from "../app/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#fffaef] text-[#3b3c55]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24">
        <section id="home">
          <Hero />
        </section>

        <section id="social-media" className="py-20">
          <SocialMediaSection />
        </section>

        <section id="courses" className="py-20">
          <CoursesSection />
        </section>

        <section id="teachers" className="py-20">
          <TeachersSection />
        </section>

        <section id="faq" className="py-20">
          <FAQSection />
        </section>

        <section id="contact" className="py-20">
          <CTAFormSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
