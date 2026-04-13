import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

/* ─────────────────────────────────────────────
   Immersive cosmic star field
   ───────────────────────────────────────────── */
function Stars() {
  // Three layers: distant tiny stars, mid-field, and bright close stars
  const layers = useRef([
    // Layer 1 — distant, many, faint, slow twinkle
    Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.4 + 0.15,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 6,
      layer: 'distant',
    })),
    // Layer 2 — mid-field stars
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      layer: 'mid',
    })),
    // Layer 3 — bright close stars with glow
    Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 2,
      opacity: Math.random() * 0.4 + 0.6,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      layer: 'bright',
    })),
  ]).current;

  // Shooting stars
  const shootingStars = useRef(
    Array.from({ length: 4 }, (_, i) => ({
      delay: i * 6 + Math.random() * 4,
      duration: Math.random() * 1.2 + 0.6,
      top: Math.random() * 50 + 5,
      left: Math.random() * 40 + 10,
    }))
  ).current;

  const allStars = layers.flat();

  return (
    <div className="stars">
      {allStars.map((s, i) => (
        <div
          key={i}
          className={`star star--${s.layer}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      {shootingStars.map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Fade-in on scroll hook
   ───────────────────────────────────────────── */
function useFadeIn() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   Main App
   ───────────────────────────────────────────── */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useFadeIn();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Stars />

      {/* ─── NAVIGATION ─── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={() => scrollTo('hero')}>
          <img src="/images/logo-glow.jpg" alt="Meridian" />
          <span className="nav-logo-text">Meridian</span>
        </a>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={() => scrollTo('about')}>About</a></li>
          <li><a href="#capabilities" onClick={() => scrollTo('capabilities')}>Capabilities</a></li>
          <li><a href="#ecosystem" onClick={() => scrollTo('ecosystem')}>Ecosystem</a></li>
          <li><a href="#contact" onClick={() => scrollTo('contact')}>Contact</a></li>
        </ul>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="/images/eclipse-bg.jpg" alt="" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Meridian</h1>
          <p className="hero-subtitle">MEV Infrastructure & High-Frequency Trading</p>
          <p className="hero-description">
            Building production-grade blockchain infrastructure at the frontier
            of decentralized finance. Operating from the dark side of the
            moon — where precision meets opportunity.
          </p>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="section about" id="about">
        <div className="section-inner">
          <div className="fade-in">
            <span className="section-label">01 / About</span>
            <h2 className="section-title">
              The Invisible Force Behind<br />On-Chain Efficiency
            </h2>
            <div className="section-divider" />
          </div>

          <div className="about-grid">
            <div className="about-image-wrapper fade-in">
              <img
                src="/images/logo-glow.jpg"
                alt="Meridian Eclipse"
                className="about-image"
              />
            </div>
            <div className="about-text fade-in">
              <p>
                <strong>Meridian</strong> is a specialized MEV and blockchain
                infrastructure team building production-grade systems that
                operate at the cutting edge of decentralized finance. We design,
                develop, and deploy latency-sensitive trading infrastructure
                that captures value across the most competitive on-chain
                environments.
              </p>
              <p>
                Our name draws from the concept of a meridian — an invisible
                line that defines structure and orientation. Like the far side
                of the moon, our systems work beyond the visible surface of
                blockchain networks, processing data in sub-millisecond
                timeframes to ensure efficient markets and optimal
                execution.
              </p>
              <p>
                Founded by experienced engineers specializing in
                <strong> Rust systems programming</strong>,
                <strong> Solana and EVM internals</strong>,
                <strong> QUIC networking</strong>,
                <strong> DeFi protocol analysis</strong>, and
                <strong> automated trading systems</strong> — Meridian operates
                at the intersection of high-performance computing and
                blockchain innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="section capabilities" id="capabilities">
        <div className="section-inner">
          <div className="fade-in">
            <span className="section-label">02 / Core Capabilities</span>
            <h2 className="section-title">What We Build</h2>
            <p className="section-description">
              Our technology stack spans the full spectrum of MEV extraction and
              blockchain infrastructure — from raw data ingestion to
              millisecond-precision trade execution.
            </p>
            <div className="section-divider" />
          </div>

          <div className="capabilities-grid">
            <div className="cap-card fade-in">
              <span className="cap-icon">&#9670;</span>
              <h3>Cross-DEX Atomic Arbitrage</h3>
              <p>
                Simultaneous arbitrage execution across Orca, Raydium (AMM, CLMM, CPMM),
                Meteora (DLMM, DAMM), and PumpSwap — capturing price inefficiencies
                within a single transaction for risk-free profit extraction.
              </p>
            </div>

            <div className="cap-card fade-in">
              <span className="cap-icon">&#9681;</span>
              <h3>High-Frequency Token Sniping</h3>
              <p>
                Custom shred decoding and direct QUIC TPU submission for
                ultra-low-latency token launches. Our pipeline detects, analyzes,
                and executes within milliseconds of pool creation events.
              </p>
            </div>

            <div className="cap-card fade-in">
              <span className="cap-icon">&#9673;</span>
              <h3>Local DEX Simulation</h3>
              <p>
                Full on-chain swap math replicated locally without RPC calls.
                Sub-millisecond quoting enables real-time opportunity evaluation
                across hundreds of liquidity pools simultaneously.
              </p>
            </div>

            <div className="cap-card fade-in">
              <span className="cap-icon">&#10038;</span>
              <h3>Multi-Path Transaction Delivery</h3>
              <p>
                Redundant submission via Astralane, Helius, Jito, ZeroSlot,
                Nozomi, and direct TPU connections. Optimized routing ensures
                maximum inclusion probability with minimal latency overhead.
              </p>
            </div>

            <div className="cap-card fade-in">
              <span className="cap-icon">&#9678;</span>
              <h3>Real-Time Geyser gRPC Monitoring</h3>
              <p>
                Streaming account monitoring through Geyser gRPC for instant
                price and liquidity tracking. Every state change is captured,
                parsed, and made actionable in microseconds.
              </p>
            </div>

            <div className="cap-card fade-in">
              <span className="cap-icon">&#9686;</span>
              <h3>Dark Pool Protocol Research</h3>
              <p>
                Reverse engineering and analysis of private DEX implementations
                on Solana. Understanding hidden liquidity venues to build a
                comprehensive view of true market depth and flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM ─── */}
      <section className="section ecosystem" id="ecosystem">
        <div className="section-inner">
          <div className="fade-in">
            <span className="section-label">03 / Ecosystem Vision</span>
            <h2 className="section-title">Expanding Horizons</h2>
            <p className="section-description">
              Beyond Solana — Meridian is building for the next generation of
              high-performance blockchains, with a particular focus on
              ecosystems that demand HFT-grade infrastructure.
            </p>
            <div className="section-divider" />
          </div>

          <div className="eco-grid">
            <div className="eco-card fade-in">
              <span className="eco-number">01</span>
              <h3>Validator Operations</h3>
              <p>
                Ready to deploy validators on next-generation networks using
                our existing bare-metal infrastructure. Our hardware
                significantly exceeds standard requirements, and our team has
                extensive experience with validator lifecycle management, uptime
                guarantees, and delegation programs.
              </p>
            </div>

            <div className="eco-card fade-in">
              <span className="eco-number">02</span>
              <h3>MEV Tooling & Analytics</h3>
              <p>
                Porting our cross-DEX arbitrage engine to support Uniswap V4,
                Curve, and native DEXs on emerging chains. Integrating with
                structured block-space auction protocols and developing mempool
                analytics for real-time opportunity detection across parallel
                execution environments.
              </p>
            </div>

            <div className="eco-card fade-in">
              <span className="eco-number">03</span>
              <h3>Open-Source Contributions</h3>
              <p>
                We believe in giving back to the ecosystems we operate in.
                Our roadmap includes public tools for block propagation
                benchmarking, DEX pool state monitoring, transaction simulation
                frameworks, and latency measurement utilities — available for
                the entire community.
              </p>
            </div>

            <div className="eco-card fade-in">
              <span className="eco-number">04</span>
              <h3>Research & Collaboration</h3>
              <p>
                Actively engaging with MEV research groups and protocol teams
                to build fair, transparent, and efficient block-space markets.
                We are committed to working within ecosystem frameworks rather
                than engaging in adversarial extraction — ensuring sustainable
                value for all participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="section tech-stack">
        <div className="section-inner">
          <div className="fade-in">
            <span className="section-label">04 / Technology</span>
            <h2 className="section-title">Our Stack</h2>
            <div className="section-divider" />
          </div>
          <div className="tech-tags fade-in">
            {[
              'Rust',
              'Solana',
              'EVM',
              'QUIC Protocol',
              'gRPC',
              'Geyser',
              'AMD EPYC',
              'Bare Metal',
              'Jito',
              'Helius',
              'Astralane',
              'ZeroSlot',
              'Nozomi',
              'Raydium',
              'Orca',
              'Meteora',
              'PumpSwap',
              'Uniswap V4',
              'Curve',
              'NVMe Gen5',
              'DDR5',
              'Frankfurt DE',
              'Low Latency',
              'MEV',
            ].map((tag) => (
              <span className="tech-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-left fade-in">
            <h2>Contact Us</h2>
            <p>
              Ready to collaborate? Reach out through our social channels — we're
              always open to discussing infrastructure partnerships, MEV
              solutions, and ecosystem contributions.
            </p>
          </div>
          <div className="contact-right fade-in">
            <div className="contact-socials">
              <a
                href="https://discord.com/users/onlineonline11_21910"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                title="Discord"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Discord</span>
              </a>
              <a
                href="https://t.me/AV_0011"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Telegram</span>
              </a>
            </div>
            <div className="contact-info-row">
              <div className="contact-item">
                <span className="contact-item-label">Location</span>
                <span className="contact-item-value">Frankfurt, Germany</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-label">Specialization</span>
                <span className="contact-item-value">MEV, HFT, Validator Ops</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <span className="footer-text">
            &copy; {new Date().getFullYear()} Meridian. All rights reserved.
          </span>
          <div className="footer-links">
            <a href="#about" onClick={() => scrollTo('about')}>About</a>
            <a href="#capabilities" onClick={() => scrollTo('capabilities')}>Capabilities</a>
            <a href="#ecosystem" onClick={() => scrollTo('ecosystem')}>Ecosystem</a>
          </div>
        </footer>
      </section>
    </>
  );
}

export default App;
