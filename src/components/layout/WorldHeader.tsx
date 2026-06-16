// ============================================
// World Header Component
// Navigation header for X-ERA worlds with tabs
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUniverseStore } from '@/store';
import { cn } from '@/utils';

// ============================================
// World Tabs Configuration
// ============================================

const worldTabs = [
  { id: 'studios', label: 'Studios', color: '#FF2A2A', href: '#studios' },
  { id: 'max', label: 'Max', color: '#00BFFF', href: '#max' },
  { id: 'infinity', label: 'Infinity', color: '#39FF88', href: '#infinity' },
] as const;

// ============================================
// World Header Component
// ============================================

interface WorldHeaderProps {
  currentWorld: 'studios' | 'max' | 'infinity';
  subSections?: { id: string; label: string }[];
  className?: string;
}

export function WorldHeader({ currentWorld, subSections, className }: WorldHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      if (subSections) {
        for (const section of [...subSections].reverse()) {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subSections]);

  const currentTab = worldTabs.find((tab) => tab.id === currentWorld);

  const navigateToWorld = (worldId: 'studios' | 'max' | 'infinity') => {
    const url = new URL(window.location.href);
    url.searchParams.set('world', worldId);
    window.location.href = url.pathname + '?' + url.searchParams.toString();
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Navigation - World Tabs */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            aria-label="X-ERA ONE Home"
          >
            <span className="text-xl font-bold text-white group-hover:opacity-80 transition-opacity">
              X-ERA
            </span>
            <span className="text-xs text-white/50">ONE</span>
          </a>

          {/* World Tabs */}
          <nav className="flex items-center gap-1" role="navigation" aria-label="World navigation">
            {worldTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateToWorld(tab.id as 'studios' | 'max' | 'infinity')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  currentWorld === tab.id
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                )}
                style={{
                  backgroundColor: currentWorld === tab.id ? `${tab.color}20` : 'transparent',
                  color: currentWorld === tab.id ? tab.color : undefined,
                }}
                aria-current={currentWorld === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: currentTab?.color, color: '#000' }}
          >
            Get Started
          </a>
        </div>

        {/* Sub Navigation - Section Links */}
        {subSections && subSections.length > 0 && (
          <div className="border-t border-white/10 py-2 overflow-x-auto">
            <nav
              className="flex items-center gap-4 text-sm"
              role="navigation"
              aria-label="Section navigation"
            >
              {subSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'whitespace-nowrap py-1 transition-colors',
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  )}
                  style={{
                    color: activeSection === section.id ? currentTab?.color : undefined,
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================
// World-Specific Header Exports
// ============================================

const studiosSections = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'team', label: 'Team' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const maxSections = [
  { id: 'about', label: 'About' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const infinitySections = [
  { id: 'about', label: 'About' },
  { id: 'ai-solutions', label: 'AI Solutions' },
  { id: 'products', label: 'Products' },
  { id: 'research', label: 'Research' },
  { id: 'automation', label: 'Automation' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export function StudiosHeader() {
  return <WorldHeader currentWorld="studios" subSections={studiosSections} />;
}

export function MaxHeader() {
  return <WorldHeader currentWorld="max" subSections={maxSections} />;
}

export function InfinityHeader() {
  return <WorldHeader currentWorld="infinity" subSections={infinitySections} />;
}

export default WorldHeader;
