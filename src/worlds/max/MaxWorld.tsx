// ============================================
// Max World - Main Component
// ============================================

import { maxData } from '@/data/max';
import { CinematicBackground } from '@/components/effects';
import { MaxHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import {
  MaxHero,
  MaxAbout,
  MaxEcosystem,
  MaxSolutions,
  MaxPortfolio,
  MaxPartnerships,
  MaxDistribution,
  MaxAnalytics,
  MaxCaseStudies,
  MaxGrowth,
  MaxTestimonials,
  MaxFAQ,
  MaxContact,
  MaxEnquiry,
} from './';

export function MaxWorld() {
  const {
    hero,
    about,
    ecosystem,
    solutions,
    partnerships,
    distribution,
    analytics,
    caseStudies,
    growth,
    testimonials,
    faq,
    contact,
    enquiry,
  } = maxData;

  const seoConfig = createWorldSEO(
    'max',
    'X-ERA Max',
    'Digital media ecosystem and content distribution platform. Maximize your reach with data-driven media strategies.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <MaxHeader />

      <div className="relative min-h-screen overflow-hidden" style={{ background: '#020814' }}>
        {/* Cinematic Background - static, no heavy animation */}
        <CinematicBackground worldId="max" />

        {/* Main Content */}
        <div className="relative z-10 pt-28">
          {/* Hero Section */}
          <MaxHero {...hero} />

          {/* Content Sections */}
          <div id="about">
            <MaxAbout {...about} />
          </div>

          <div id="ecosystem">
            <MaxEcosystem {...ecosystem} />
          </div>

          <div id="solutions">
            <MaxSolutions {...solutions} />
          </div>

          <div id="portfolio">
            <MaxPortfolio />
          </div>

          <MaxPartnerships {...partnerships} />

          <div id="distribution">
            <MaxDistribution {...distribution} />
          </div>

          <MaxAnalytics {...analytics} />

          <div id="case-studies">
            <MaxCaseStudies {...caseStudies} />
          </div>

          <MaxGrowth {...growth} />

          <div id="testimonials">
            <MaxTestimonials {...testimonials} />
          </div>

          <div id="faq">
            <MaxFAQ {...faq} />
          </div>

          <div id="contact">
            <MaxContact {...contact} />
          </div>

          <MaxEnquiry {...enquiry} />

          {/* Footer */}
          <footer className="py-16 border-t border-neutral-800" style={{ background: '#020814' }}>
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold" style={{ color: '#00BFFF' }}>
                  X-ERA Max
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

export default MaxWorld;
