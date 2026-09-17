import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F4F2F1]">
        <main>
          <HeroSection />
          <section className="flex min-h-[40vh] items-center justify-center px-6 text-center text-[#5c534c]/70">
            <p className="max-w-md font-display text-2xl tracking-[-0.02em]">
              COMING SOON
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
