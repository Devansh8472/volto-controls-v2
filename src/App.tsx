import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";

import ClientsSection from "@/components/ClientsSection";
import ExportsSection from "@/components/ExportsSection";
import QualitySection from "@/components/QualitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function Home() {
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [isHeroContentVisible, setIsHeroContentVisible] = useState(false);
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);

  useEffect(() => {
    if (isHeroVideoReady) return;

    // Fallback so users are never blocked if autoplay or video loading is restricted.
    const fallbackTimer = window.setTimeout(() => {
      setIsHeroVideoReady(true);
    }, 3200);

    return () => window.clearTimeout(fallbackTimer);
  }, [isHeroVideoReady]);

  useEffect(() => {
    if (!isHeroVideoReady) return;

    const heroContentTimer = window.setTimeout(() => {
      setIsHeroContentVisible(true);
    }, 220);

    return () => window.clearTimeout(heroContentTimer);
  }, [isHeroVideoReady]);

  useEffect(() => {
    if (!isHeroContentVisible) return;

    const mainContentTimer = window.setTimeout(() => {
      setIsMainContentVisible(true);
    }, 360);

    return () => window.clearTimeout(mainContentTimer);
  }, [isHeroContentVisible]);

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only fixed left-3 top-3 z-[100] rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#0A1628] shadow-md focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection
          showContent={isHeroContentVisible}
          onVideoReady={() => setIsHeroVideoReady(true)}
        />

        {isMainContentVisible ? (
          <>
            <ClientsSection />
            <ProductsSection />
            <QualitySection />

            <ExportsSection />
            <AboutSection />
            <ContactSection />
          </>
        ) : (
          <div aria-hidden="true" className="h-14" />
        )}
      </main>

      {isMainContentVisible && <Footer />}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
