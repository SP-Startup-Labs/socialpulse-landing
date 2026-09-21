'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLocale } from './LocaleProvider';

type NavbarProps = {
  links: readonly { label: string; href: string }[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  onContact: () => void;
};

export function Navbar({ links, onNavigate, onContact }: NavbarProps) {
  const { t, path } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    let currentExpanded = false;
    const updateScroll = () => {
      frame = 0;
      // Separate enter/leave thresholds avoid flickering near the top.
      const nextExpanded = window.scrollY > (currentExpanded ? 12 : 24);
      if (nextExpanded !== currentExpanded) {
        currentExpanded = nextExpanded;
        setExpanded(nextExpanded);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    // Measure only on resize, never while scrolling. contentRect also respects
    // the site's desktop CSS zoom, unlike viewport-width calculations.
    const observer = new ResizeObserver(([entry]) => {
      const inset = Math.max(0, (entry.contentRect.width - 1240) / 2);
      shell.style.setProperty('--navbar-inset', `${inset}px`);
    });
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    onNavigate(event, href);
  };

  return (
    <header
      className="site-navbar"
      data-expanded={expanded}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div ref={shellRef} className="landing-shell navbar-shell">
        <a href="#hero" onClick={(event) => navigate(event, '#hero')} aria-label={t('Back to top')} className="navbar-brand">
          <Image src="/logos/logo_banner_fondo_oscuro.webp" alt="SocialPulse" fill priority sizes="(max-width: 639px) 140px, (max-width: 767px) 190px, 230px" className="object-contain" />
        </a>

        <nav className="navbar-links" aria-label={t('Main navigation')}>
          {links.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)}>{t(item.label)}</a>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link href={path('/login')} className="navbar-login">
            <UserRound className="h-[18px] w-[18px] text-[#8A85AE]" />
            <span>{t('Log in')}</span>
          </Link>
          <span className="navbar-divider" aria-hidden="true" />
          <button type="button" onClick={() => { setMenuOpen(false); onContact(); }} className="navbar-cta-button navbar-contact">
            <span>{t('Get in Touch')}</span>
            <span className="navbar-investors">{t('For Investors')}</span>
            <ArrowRight className="navbar-contact-arrow h-4 w-4 shrink-0" />
          </button>
          <button ref={menuButtonRef} type="button" className="navbar-menu-toggle" aria-label={t(menuOpen ? 'Close navigation' : 'Open navigation')} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className="landing-shell navbar-mobile" aria-label={t('Mobile navigation')} hidden={!menuOpen}>
        {links.map((item) => (
          <a key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)}>{t(item.label)}</a>
        ))}
        <Link href={path('/login')} onClick={() => setMenuOpen(false)}>{t('Log in')}</Link>
      </nav>
    </header>
  );
}
