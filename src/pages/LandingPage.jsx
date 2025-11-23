import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import RecentProjects from "../components/landing/RecentProjects";
import HowItWorks from "../components/landing/HowItWorks";

function LandingPage({ onStart, onDemo }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-8 lg:px-8">
      <Navbar onGetStarted={onStart} onTryDemo={onDemo} />
      <HeroSection onGetStarted={onStart} onTryDemo={onDemo} />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects />
        <HowItWorks />
      </div>
    </div>
  );
}

export default LandingPage;
