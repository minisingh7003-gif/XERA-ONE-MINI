// ============================================
// Studios World - Main Component
// ============================================

import { studiosData } from '@/data/studios';
import { CinematicBackground } from '@/components/effects';
import { StudiosHeader } from '@/components/layout';
import { SEO, createWorldSEO } from '@/components/seo';
import {
  StudiosHero,
  StudiosAbout,
  StudiosServices,
  StudiosPortfolio,
  StudiosProcess,
  StudiosTeam,
  StudiosTestimonials,
  StudiosFAQ,
  StudiosContact,
  StudiosEnquiry,
} from './';

export function StudiosWorld() {
  const { hero, about, services, portfolio, process, team, testimonials, faq, contact, enquiry } = studiosData;

  const seoConfig = createWorldSEO(
    'studios',
    'X-ERA Studios',
    'Creative storytelling and media production. We craft compelling visual content that captivates audiences and drives results.'
  );

  return (
    <>
      {/* SEO */}
      <SEO {...seoConfig} />

      {/* World Header with Navigation */}
      <StudiosHeader />

      <div className="relative min-h-screen overflow-hidden">
        {/* Cinematic Background - static, no heavy animation */}
        <CinematicBackground worldId="studios" />

        {/* Main Content */}
        <div className="relative z-10 pt-28">
          {/* Hero Section */}
          <StudiosHero {...hero} />

          {/* Content Sections */}
          <div id="about">
            <StudiosAbout {...about} />
          </div>

          <div id="services">
            <StudiosServices {...services} />
          </div>

          <div id="portfolio">
            <StudiosPortfolio {...portfolio} />
          </div>

          <div id="process">
            <StudiosProcess {...process} />
          </div>

          <div id="team">
            <StudiosTeam {...team} />
          </div>

          <div id="testimonials">
            <StudiosTestimonials {...testimonials} />
          </div>

          <div id="faq">
            <StudiosFAQ {...faq} />
          </div>

          <div id="contact">
            <StudiosContact {...contact} />
          </div>

          <StudiosEnquiry {...enquiry} />

          {/* Footer */}
          <footer className="py-16 border-t border-neutral-800">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6">
                <span className="text-2xl font-bold text-studios-primary">X-ERA Studios</span>
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

export default StudiosWorld;
