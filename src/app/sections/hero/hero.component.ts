import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  imports: [TranslocoModule],
  template: `
    <section
      id="hero"
      class="hero"
      role="banner"
      aria-label="Hero section"
      *transloco="let t"
    >
      <!-- Animated modern tech background -->
      <div class="hero__grid" aria-hidden="true"></div>
      <div class="hero__glow" aria-hidden="true"></div>

      <div class="hero__content">
        <p class="hero__greeting">👋 Ciao, sono</p>
        <h1 class="hero__name gradient-text">{{ t('home.title') }}</h1>
        <div class="hero__role-wrapper">
          <p class="hero__role">
            {{ displayedText() }}<span class="hero__cursor" aria-hidden="true">|</span>
          </p>
        </div>

        <!-- Social buttons -->
        <div class="hero__socials">
          <a
            href="https://github.com/francesco-rossetti"
            target="_blank"
            rel="noopener noreferrer"
            class="glow-btn"
            aria-label="GitHub profile"
          >
            <i class="pi pi-github"></i> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/francescorossetti19"
            target="_blank"
            rel="noopener noreferrer"
            class="glow-btn"
            aria-label="LinkedIn profile"
          >
            <i class="pi pi-linkedin"></i> LinkedIn
          </a>
        </div>

        <!-- Scroll indicator -->
        <a href="#skills" class="hero__scroll" aria-label="Scroll to skills section">
          <i class="pi pi-chevron-down"></i>
        </a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 120px 24px 80px;
    }

    /* Premium Grid Background */
    .hero__grid {
      position: absolute;
      inset: -50px 0 0 0;
      background-image:
        linear-gradient(to right, rgba(124, 58, 237, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(124, 58, 237, 0.07) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
      animation: panGrid 20s linear infinite;
      z-index: 0;
    }

    .hero__glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 40%, transparent 70%);
      filter: blur(60px);
      z-index: 0;
      pointer-events: none;
    }

    @keyframes panGrid {
      from { transform: translateY(0); }
      to { transform: translateY(60px); }
    }

    .hero__content {
      position: relative;
      z-index: 1;
      text-align: center;
      max-width: 800px;
    }

    .hero__greeting {
      font-size: 1.25rem;
      color: #94a3b8;
      margin: 0 0 12px;
      animation: fadeInUp 0.6s ease forwards;
    }

    .hero__name {
      font-size: clamp(3rem, 8vw, 5.5rem);
      font-weight: 900;
      margin: 0;
      line-height: 1.05;
      letter-spacing: -0.03em;
      animation: fadeInUp 0.6s ease 0.15s forwards;
      opacity: 0;
    }

    .hero__role-wrapper {
      margin-top: 16px;
      animation: fadeInUp 0.6s ease 0.3s forwards;
      opacity: 0;
    }

    .hero__role {
      font-size: clamp(1.25rem, 3vw, 1.75rem);
      color: #cbd5e1;
      margin: 0;
      font-weight: 300;
      min-height: 2.2em;
    }

    .hero__cursor {
      animation: blink 1s step-end infinite;
      color: #8b5cf6;
      font-weight: 300;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    .hero__socials {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 40px;
      animation: fadeInUp 0.6s ease 0.45s forwards;
      opacity: 0;
    }

    .hero__scroll {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin-top: 64px;
      color: #64748b;
      font-size: 1.25rem;
      text-decoration: none;
      animation: bounce 2s ease infinite 1.5s, fadeInUp 0.6s ease 0.6s forwards;
      opacity: 0;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(8px); }
      60% { transform: translateY(4px); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class HeroComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  displayedText = signal('');

  private fullText = 'Full Stack Developer';
  private charIndex = 0;
  private isDeleting = false;
  private typingSpeed = 100;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.typeEffect(), 800);
    } else {
      this.displayedText.set(this.fullText);
    }
  }

  private typeEffect() {
    if (!this.isDeleting) {
      this.charIndex++;
      this.displayedText.set(this.fullText.slice(0, this.charIndex));

      if (this.charIndex === this.fullText.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.typeEffect();
        }, 3000);
        return;
      }
      this.typingSpeed = 80 + Math.random() * 40;
    } else {
      this.charIndex--;
      this.displayedText.set(this.fullText.slice(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.typingSpeed = 500;
      } else {
        this.typingSpeed = 40;
      }
    }

    setTimeout(() => this.typeEffect(), this.typingSpeed);
  }
}
