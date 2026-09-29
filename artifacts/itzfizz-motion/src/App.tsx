import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import carAsset from '../generated_images/hero-hypercar.png';

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

const metrics = [
  { value: '01:24', label: 'Time to first frame', note: 'Illustrative studio metric' },
  { value: '60', label: 'Frames per second', note: 'Illustrative motion target' },
  { value: '4.8×', label: 'Perceived momentum', note: 'Illustrative experience signal' },
  { value: '360°', label: 'Point of view', note: 'Illustrative visual range' },
];

function MotionHome() {
  const stageRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const sideNoteRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const pin = pinRef.current;
    const car = carRef.current;
    if (!stage || !pin || !car) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(car, { clearProps: 'transform' });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from(navRef.current, { y: -18, opacity: 0, duration: 0.8 })
        .from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.45')
        .from(car, { x: -90, opacity: 0, scale: 0.86, duration: 1.3 }, '-=0.8')
        .from([sideNoteRef.current, scrollCueRef.current], { opacity: 0, duration: 0.65 }, '-=0.4');

      const scene = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          pin,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.round(self.progress * 100);
            setProgress(next);
            if (progressRef.current) {
              progressRef.current.style.height = `${Math.max(4, next)}%`;
            }
          },
        },
      });

      scene
        .to(car, { xPercent: 21, yPercent: 4, rotation: 2, scale: 0.91, ease: 'none', duration: 0.35 })
        .to(car, { xPercent: 43, yPercent: 21, rotation: 7, scale: 0.73, ease: 'none', duration: 0.65 });

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        });
      });
    }, stage);

    return () => context.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="motion-page">
      <div className="grain" aria-hidden="true" />
      <header ref={navRef} className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
          ITZFIZZ <small>/ MOTION</small>
        </a>
        <nav className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <a className="nav-link" href="#manifesto" onClick={closeMenu}>Manifesto</a>
          <a className="nav-link" href="#impact" onClick={closeMenu}>Impact</a>
          <a className="nav-link" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="nav-index"><i aria-hidden="true" /> 001 / 004</div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className="scroll-progress" aria-label={`Page progress ${progress}%`}>
        <span ref={progressRef} />
        <b>{String(progress).padStart(2, '0')}</b>
      </div>

      <section id="top" ref={stageRef} className="hero-stage" aria-labelledby="hero-title">
        <div ref={pinRef} className="hero-pin">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow animate-in">WELCOME ITZFIZZ</p>
            <h1 id="hero-title" className="hero-title animate-in delay-1">
              <span>FITZ</span>
              <span className="outline">MOTION</span>
            </h1>
            <p className="hero-subtitle animate-in delay-2">
              <b>Move beyond the ordinary.</b><br />
              A moving image for objects that refuse to sit still.
            </p>
          </div>

          <div ref={carRef} className="hero-car-wrap">
            <span className="speed-line one" />
            <span className="speed-line two" />
            <span className="speed-line three" />
            <span className="car-shadow" />
            <img className="hero-car" src={carAsset} alt="Graphite concept hypercar with an electric-lime accent, shown in motion" />
          </div>
          <p ref={sideNoteRef} className="hero-side-note">
            <strong>Motion study / 01</strong>
            Light, line, velocity<br />Captured in one continuous take.
          </p>
          <div ref={scrollCueRef} className="scroll-cue"><span className="line" /> Scroll to enter</div>
        </div>
      </section>

      <section id="manifesto" className="section manifesto" aria-labelledby="manifesto-title">
        <div className="manifesto-inner reveal">
          <div className="section-kicker"><span>What moves us</span></div>
          <h2 id="manifesto-title">The detail is the <em>difference.</em></h2>
          <div className="manifesto-foot">
            <p>We choreograph light, sound and speed into a single point of view — made for brands with something to prove.</p>
            <a href="#impact">Read the signal</a>
          </div>
        </div>
      </section>

      <section id="impact" className="section impact" aria-labelledby="impact-title">
        <div className="impact-head reveal">
          <div>
            <div className="section-kicker"><span>Signal / studio language</span></div>
            <h2 id="impact-title">Measured<br />in motion.</h2>
          </div>
          <p>Four illustrative signals from the Fitz Motion system. Not business results — just a sharper way to see the work.</p>
        </div>
        <div className="metrics reveal" aria-label="Illustrative impact metrics">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <span className="metric-label">{metric.label}</span>
              <strong className="metric-value">{metric.value}</strong>
              <span className="metric-note">{metric.note}</span>
            </div>
          ))}
        </div>
        <div className="metric-foot"><span>Optics / performance / feeling</span><i aria-hidden="true" /><span>Readout complete</span></div>
      </section>

      <section id="contact" className="section closing" aria-labelledby="closing-title">
        <div className="closing-inner reveal">
          <h2 id="closing-title">Make<br /><span>an entrance.</span></h2>
          <div className="closing-aside">
            <p>Have a surface that deserves to move? Bring us the first frame.</p>
            <a className="contact-link" href="mailto:studio@itzfizz.com">Start a conversation</a>
          </div>
        </div>
      </section>
      <footer className="footer"><span>ITZFIZZ Motion © 2024</span><span>Built for the moving image</span><span>SF / LDN / Everywhere</span></footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={MotionHome} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;