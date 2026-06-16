// ============================================
// Infinity World - Main Component
// ============================================

import { infinityData } from '@/data/infinity';
import { CinematicBackground } from '@/components/effects';
import { InfinityHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import {
  InfinityHero,
  InfinityAbout,
  InfinityAISolutions,
  InfinityProducts,
  InfinityResearch,
  InfinityAutomation,
  InfinityPipeline,
  InfinityCaseStudies,
  InfinityRoadmap,
  InfinityPartners,
  InfinityTestimonials,
  InfinityFAQ,
  InfinityContact,
  InfinityEnquiry,
} from './';

export function InfinityWorld() {
  const {
    hero,
    about,
    aiSolutions,
    products,
    research,
    automation,
    pipeline,
    caseStudies,
    roadmap,
    partners,
    testimonials,
    faq,
    contact,
    enquiry,
  } = infinityData;

  const seoConfig = createWorldSEO(
    'infinity',
    'X-ERA Infinity',
    'AI research and automation solutions. Pushing the boundaries of intelligent systems and machine learning.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <InfinityHeader />

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Cinematic Background - static, no heavy animation */}
        <CinematicBackground worldId="infinity" />

        {/* Main Content */}
        <div className="relative z-10 pt-28">
          {/* Hero Section */}
          <InfinityHero {...hero} />

          {/* Content Sections */}
          <div id="about">
            <InfinityAbout {...about} />
          </div>

          <div id="ai-solutions">
            <InfinityAISolutions {...aiSolutions} />
          </div>

          <div id="products">
            <InfinityProducts {...products} />
          </div>

          <div id="research">
            <InfinityResearch {...research} />
          </div>

          <div id="automation">
            <InfinityAutomation {...automation} />
          </div>

          <InfinityPipeline {...pipeline} />

          <div id="case-studies">
            <InfinityCaseStudies {...caseStudies} />
          </div>

          <InfinityRoadmap {...roadmap} />
          <InfinityPartners {...partners} />

          <div id="testimonials">
            <InfinityTestimonials {...testimonials} />
          </div>

          <div id="faq">
            <InfinityFAQ {...faq} />
          </div>

          <div id="contact">
            <InfinityContact {...contact} />
          </div>

          <InfinityEnquiry {...enquiry} />

          {/* Footer */}
          <footer className="py-16 border-t border-neutral-800 bg-black">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold" style={{ color: '#39FF88' }}>
                  X-ERA Infinity
                </span>
              </div>
              <p className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} X-ERA ONE. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default InfinityWorld;
