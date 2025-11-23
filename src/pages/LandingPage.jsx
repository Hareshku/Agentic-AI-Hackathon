import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import RecentProjects from "../components/landing/RecentProjects";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";

function LandingPage({ onStart, onDemo }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 lg:px-8">
          <Navbar onGetStarted={onStart} onTryDemo={onDemo} />
          <HeroSection onGetStarted={onStart} onTryDemo={onDemo} />
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentProjects />
            <HowItWorks />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
