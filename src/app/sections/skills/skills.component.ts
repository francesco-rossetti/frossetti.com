import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '../../services/data.service';
import { Skill } from '../../models/skill.model';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, TranslocoModule, AnimateOnScrollModule],
  template: `
    <section
      id="skills"
      class="skills-section"
      role="region"
      aria-labelledby="skills-title"
      *transloco="let t"
    >
      <div class="section-container">
        <span class="section-label">{{ t('skill.label') }}</span>
        <h2 class="section-title" id="skills-title">{{ t('skill.title') }}</h2>
        <p class="section-subtitle">{{ t('skill.sub') }}</p>

        <div class="bento-grid">
          @for (skill of skills(); track skill.title; let i = $index) {
            <article
              class="glass-card skill-card bento-card"
              [ngClass]="getBentoClass(i)"
              pAnimateOnScroll
              enterClass="animate-fade-in-up"
              [attr.aria-label]="t(skill.title)"
            >
              <img
                *ngIf="skill.image"
                [src]="'/assets/domain/logo/' + skill.image"
                class="bento-watermark"
                aria-hidden="true"
              />
              <div class="bento-content">
                <div class="skill-card__header">
                  <div class="skill-card__icon-wrapper">
                    <img
                      [src]="'/assets/domain/logo/' + skill.image"
                      [alt]="t(skill.title) + ' logo'"
                      class="skill-card__icon"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                  </div>
                  <h3 class="skill-card__title">{{ t(skill.title) }}</h3>
                </div>
                <p class="skill-card__description">{{ t(skill.description) }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills-section {
      position: relative;
    }

    .skill-card {
      padding: 32px;
    }

    .skill-card__icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(148, 163, 184, 0.14);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      transition: background 0.3s;
    }

    .skill-card:hover .skill-card__icon-wrapper {
      background: rgba(148, 163, 184, 0.24);
    }

    .skill-card__icon {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .skill-card__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 12px;
    }

    .skill-card__description {
      font-size: 0.9rem;
      line-height: 1.65;
      color: #94a3b8;
      margin: 0;
    }

    @media (max-width: 640px) {
      .bento-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class SkillsComponent implements OnInit {
  private dataService = inject(DataService);

  skills = signal<Skill[]>([]);

  ngOnInit() {
    this.dataService.getSkills().subscribe((data) => this.skills.set(data));
  }

  getBentoClass(index: number): string {
    const patterns = [
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide'
    ];

    // const patterns = [
    //   'bento-card--large',
    //   'bento-card--tall',
    //   'bento-card--small',
    //   'bento-card--wide',
    //   'bento-card--small',
    //   'bento-card--small',
    //   'bento-card--wide'
    // ];

    return patterns[index % patterns.length];
  }
}
