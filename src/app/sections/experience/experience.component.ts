import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models/experience.model';
import { TimelineModule } from 'primeng/timeline';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-experience',
  imports: [TranslocoModule, TimelineModule, AnimateOnScrollModule],
  template: `
    <section
      id="experience"
      class="experience-section"
      role="region"
      aria-labelledby="experience-title"
      *transloco="let t"
    >
      <div class="section-container">
        <span class="section-label">{{ t('experience.label') }}</span>
        <h2 class="section-title" id="experience-title">{{ t('experience.title') }}</h2>
        <p class="section-subtitle">{{ t('experience.sub') }}</p>

        <p-timeline [value]="experiences()" align="alternate" styleClass="custom-timeline">
          <ng-template #content let-exp>
            <article
              class="glass-card timeline-card"
              pAnimateOnScroll
              enterClass="animate-fade-in-up"
            >
              <span class="timeline-card__period">{{ t(exp.period) }}</span>
              <h3 class="timeline-card__company">{{ t(exp.title) }}</h3>
              <span class="timeline-card__role">{{ t(exp.position) }}</span>
              <p class="timeline-card__desc">{{ t(exp.description) }}</p>
            </article>
          </ng-template>
          <ng-template #marker>
            <span class="timeline-marker">
              <i class="pi pi-briefcase"></i>
            </span>
          </ng-template>
        </p-timeline>
      </div>
    </section>
  `,
  styles: `
    .experience-section {
      position: relative;
      background: rgba(17, 24, 39, 0.4);
    }

    .timeline-card {
      padding: 28px;
      margin-bottom: 8px;
    }

    .timeline-card__period {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #e2e8f0;
      background: rgba(100, 116, 139, 0.25);
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }

    .timeline-card__company {
      font-size: 1.2rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 8px 0 4px;
    }

    .timeline-card__role {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: 500;
      color: #cbd5e1;
      margin-bottom: 12px;
    }

    .timeline-card__desc {
      font-size: 0.9rem;
      line-height: 1.65;
      color: #94a3b8;
      margin: 0;
    }

    .timeline-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #cbd5e1, #475569);
      color: #fff;
      font-size: 1rem;
      box-shadow: 0 0 22px rgba(203, 213, 225, 0.35);
    }

    /* Mobile: stack timeline vertically */
    @media (max-width: 768px) {
      :host ::ng-deep .p-timeline-event {
        flex-direction: row !important;
      }
      :host ::ng-deep .p-timeline-event:nth-child(even) {
        flex-direction: row !important;
      }
      :host ::ng-deep .p-timeline-event-opposite {
        display: none !important;
        flex: 0 !important;
      }
      :host ::ng-deep .p-timeline-event-content {
        text-align: left !important;
      }
      :host ::ng-deep .p-timeline {
        padding: 0;
      }
    }
  `,
})
export class ExperienceComponent implements OnInit {
  private dataService = inject(DataService);

  experiences = signal<Experience[]>([]);

  ngOnInit() {
    this.dataService.getExperiences().subscribe((data) => this.experiences.set(data));
  }
}
