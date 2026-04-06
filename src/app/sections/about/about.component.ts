import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoModule, AnimateOnScrollModule],
  template: `
    <section
      id="about"
      class="about-section"
      role="region"
      aria-labelledby="about-title"
      *transloco="let t"
      itemscope
      itemtype="https://schema.org/Person"
    >
      <div class="section-container">
        <div class="about-layout" pAnimateOnScroll enterClass="animate-fade-in-up">
          <div class="about-content">
            <span class="section-label">{{ t('about.label') }}</span>
            <h2 class="section-title" id="about-title" itemprop="name">{{ t('about.title') }}</h2>

            <p class="about-summary" itemprop="description">
              {{ t('about.summary') }}
            </p>

            <div class="about-highlights">
              <div class="about-highlight">
                <span class="about-highlight__number" itemprop="yearsOfExperience">{{ t('about.yearsValue') }}</span>
                <span class="about-highlight__label">{{ t('about.yearsLabel') }}</span>
              </div>
              <div class="about-highlight">
                <span class="about-highlight__number">{{ t('about.certsValue') }}</span>
                <span class="about-highlight__label">{{ t('about.certsLabel') }}</span>
              </div>
              <div class="about-highlight">
                <span class="about-highlight__number">{{ t('about.stackValue') }}</span>
                <span class="about-highlight__label">{{ t('about.stackLabel') }}</span>
              </div>
            </div>

            <div class="about-keywords" aria-label="Core competencies">
              @for (keyword of keywords; track keyword) {
                <span class="about-keyword" itemprop="knowsAbout">{{ t(keyword) }}</span>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Hidden structured data for ATS crawlers -->
      <meta itemprop="jobTitle" [content]="t('about.jobTitle')" />
      <meta itemprop="url" content="https://frossetti.com" />
      <link itemprop="sameAs" href="https://github.com/francesco-rossetti" />
      <link itemprop="sameAs" href="https://www.linkedin.com/in/francescorossetti19" />
    </section>
  `,
  styles: `
    .about-section {
      position: relative;
    }

    .about-layout {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .about-content {
      max-width: 800px;
    }

    .about-summary {
      font-size: 1.15rem;
      line-height: 1.85;
      color: #cbd5e1;
      margin: 0 0 40px;
      font-weight: 400;
    }

    .about-highlights {
      display: flex;
      gap: 48px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .about-highlight {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .about-highlight__number {
      font-size: 2.5rem;
      font-weight: 900;
      color: #f8fafc;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .about-highlight__label {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .about-keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .about-keyword {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 100px;
      background: rgba(148, 163, 184, 0.1);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: #e2e8f0;
      font-size: 0.85rem;
      font-weight: 500;
      transition: background 0.2s, border-color 0.2s;
    }

    .about-keyword:hover {
      background: rgba(148, 163, 184, 0.2);
      border-color: rgba(226, 232, 240, 0.4);
    }

    @media (max-width: 640px) {
      .about-highlights {
        gap: 32px;
      }
      .about-highlight__number {
        font-size: 2rem;
      }
    }
  `,
})
export class AboutComponent {
  keywords = [
    'about.kwAngular',
    'about.kwDotNet',
    'about.kwVue',
    'about.kwFlutter',
    'about.kwAzure',
    'about.kwRest',
    'about.kwSql',
    'about.kwGit',
  ];
}
