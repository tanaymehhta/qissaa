import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { href: '#stories', label: 'Scent stories' },
  { href: '#formats', label: 'The collection' },
  { href: '#about', label: 'Our point of view' },
];

function BrandStamp() {
  return <img className="stamp-mark" src="/images/qissaa-mark-alpha.png" alt="" width={40} height={40} />;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="qissaa">
      <header className="site-header" data-testid="section-site-header">
        <a className="brand-lockup" href="#home" onClick={closeMenu} aria-label="Qissaa home" data-testid="link-brand-home">
          <BrandStamp />
          <span className="brand-name">QISSAA</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-toggle-navigation"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="primary-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#collection" onClick={closeMenu} data-testid="link-nav-explore">Explore the collection <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title" data-testid="section-home">
          <div className="hero-copy">
            <p className="eyebrow reveal">A home fragrance house with a story to tell</p>
            <h1 id="hero-title" className="reveal">Every smell <em>has a story.</em></h1>
            <p className="hero-deck reveal">Familiar sensory memories, retold for the rooms we call our own.</p>
            <a className="button-link reveal" href="#stories" data-testid="link-hero-discover">Find your story <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-visual">
            <img src="/images/dilli-ki-sardi.webp" alt="Dilli Ki Sardi reed diffuser and illustrated storybook packaging" width="1532" height="1027" fetchPriority="high" data-testid="img-hero-dilli" />
            <span className="hero-stamp" aria-hidden="true">STORIES<br />PACKED<br />FOR HOME</span>
            <span className="hero-caption">Qissaa · Home fragrance</span>
          </div>
        </section>

        <section className="manifesto" id="about" aria-labelledby="manifesto-title" data-testid="section-manifesto">
          <span className="thread one" aria-hidden="true" />
          <span className="thread two" aria-hidden="true" />
          <p className="section-kicker">A little feeling, brought home</p>
          <h2 id="manifesto-title">Stories, <span>packed</span><br />for home.</h2>
          <p>Qissaa makes reed diffusers, room fresheners and incense rooted in the sensory memories that feel familiar. A small story for the space around you.</p>
        </section>

        <section className="stories" id="stories" aria-labelledby="stories-title" data-testid="section-scent-stories">
          <div className="story-heading">
            <div>
              <p className="section-kicker">Turn the page</p>
              <h2 id="stories-title" className="section-title">A scent can<br />take you places.</h2>
            </div>
            <p>Meet two stories from the Qissaa world. Each one starts with a name you can almost hear.</p>
          </div>
          <div className="story-grid">
            <article className="story-card" data-testid="card-story-dilli-ki-sardi">
              <img className="story-photo" src="/images/dilli-ki-sardi.webp" alt="Blue Dilli Ki Sardi diffuser bottle framed by illustrated packaging" width="1532" height="1027" loading="lazy" data-testid="img-story-dilli" />
              <div className="story-info">
                <span className="story-number">01</span>
                <p className="story-mini">A Qissaa scent story</p>
                <h3>Dilli Ki Sardi</h3>
                <p>A familiar winter-day feeling, told through a diffuser and a cast of hand-drawn characters.</p>
              </div>
            </article>
            <article className="story-card" data-testid="card-story-raat-rani">
              <img className="story-photo" src="/images/raat-rani.webp" alt="Raat Rani reed diffuser in a softly lit, deep-wine room" width="941" height="1672" loading="lazy" data-testid="img-story-raat-rani" />
              <div className="story-info">
                <span className="story-number">02</span>
                <p className="story-mini">A Qissaa scent story</p>
                <h3>Raat Rani</h3>
                <p>A late-night chapter for the home, with its own distinct mood and a story all its own.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="format-section" id="formats" aria-labelledby="formats-title" data-testid="section-formats">
          <div className="format-intro">
            <div>
              <p className="section-kicker">Ways to bring a story home</p>
              <h2 className="section-title" id="formats-title">Choose your<br />kind of ritual.</h2>
            </div>
            <p>Three ways to fill a room with a feeling. Find the form that belongs in your everyday.</p>
          </div>
          <div className="format-list">
            <article className="format-row" data-testid="item-format-diffusers">
              <span className="format-index">01</span><h3>Reed diffusers</h3>
              <p>A steady presence for the rooms where you pause, gather, and begin again.</p><span className="format-arrow" aria-hidden="true">↗</span>
            </article>
            <article className="format-row" data-testid="item-format-room-fresheners">
              <span className="format-index">02</span><h3>Room fresheners</h3>
              <p>A little refresh for the moments that could use a change of scene.</p><span className="format-arrow" aria-hidden="true">↗</span>
            </article>
            <article className="format-row" data-testid="item-format-incense">
              <span className="format-index">03</span><h3>Incense</h3>
              <p>A familiar home-fragrance ritual, made part of your own story.</p><span className="format-arrow" aria-hidden="true">↗</span>
            </article>
          </div>
        </section>

        <section className="range" id="collection" aria-labelledby="collection-title" data-testid="section-collection">
          <div className="range-image">
            <img src="/images/home-fragrance-range.webp" alt="A still life of reed diffusers and room-freshener bottles from the home fragrance range" width="1536" height="1024" loading="lazy" data-testid="img-fragrance-range" />
          </div>
          <div className="range-copy">
            <p className="section-kicker">Objects for home, stories for heart</p>
            <h2 id="collection-title">Let the room<br />tell its story.</h2>
            <p>From reed diffusers to room fresheners and incense, Qissaa brings home fragrance into a world of familiar memories and playful illustration.</p>
            <a className="button-link" href="#stories" data-testid="link-collection-stories">Meet the scent stories <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="chapter" aria-labelledby="chapter-title" data-testid="section-closing-callout">
          <p className="section-kicker">Every smell has a story</p>
          <h2 id="chapter-title">Which one feels like home?</h2>
          <a className="button-link" href="#stories" data-testid="link-cta-find-story">Read the scent stories <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="closing" data-testid="section-footer">
        <div>
          <a className="brand-lockup closing-brand" href="#home" data-testid="link-footer-home">
            <BrandStamp /><span className="brand-name">QISSAA</span>
          </a>
          <p className="closing-note">Stories, packed for home.<br />A contemporary Indian home-fragrance house.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#stories" data-testid="link-footer-stories">Scent stories</a>
          <a href="#formats" data-testid="link-footer-collection">The collection</a>
          <a href="#about" data-testid="link-footer-about">Our point of view</a>
          <a href="#home" data-testid="link-back-to-top">Back to top ↑</a>
        </nav>
        <div className="footer-bottom">
          <span>Qissaa · Every smell has a story</span>
          <span>Made for the stories we bring home</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
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
