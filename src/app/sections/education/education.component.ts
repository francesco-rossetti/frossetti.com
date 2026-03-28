import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '../../services/data.service';
import { Education } from '../../models/education.model';
import { TimelineModule } from 'primeng/timeline';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-education',
  imports: [TranslocoModule, TimelineModule, AnimateOnScrollModule],
  template: `
    <section
      id="education"
      class="education-section"
      role="region"
      aria-labelledby="education-title"
      *transloco="let t"
    >
      <div class="section-container">
        <span class="section-label">{{ t('education.label') }}</span>
        <h2 class="section-title" id="education-title">{{ t('education.title') }}</h2>
        <p class="section-subtitle">{{ t('education.sub') }}</p>

        <p-timeline [value]="education()" align="left" styleClass="custom-timeline">
          <ng-template #content let-edu>
            <article
              class="glass-card education-card"
              pAnimateOnScroll
              enterClass="animate-fade-in-up"
            >
              <span class="education-card__period">{{ t(edu.period) }}</span>
              <h3 class="education-card__institution">{{ t(edu.institution) }}</h3>
              <p class="education-card__degree">{{ t(edu.degree) }}</p>
            </article>
          </ng-template>
          <ng-template #marker>
            <span class="education-marker">
              <i class="pi pi-graduation-cap"></i>
            </span>
          </ng-template>
        </p-timeline>
      </div>
    </section>
  `,
  styles: `
    .education-section {
      position: relative;
    }

    .education-card {
      padding: 28px;
      margin-bottom: 8px;
    }

    .education-card__period {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-400);
      background: rgba(37, 99, 235, 0.15);
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }

    .education-card__institution {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 8px 0 8px;
    }

    .education-card__degree {
      font-size: 0.9rem;
      line-height: 1.65;
      color: var(--accent-400);
      margin: 0;
      font-weight: 500;
    }

    .education-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
      color: #fff;
      font-size: 1rem;
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
    }
    
    @media (max-width: 768px) {
      :host ::ng-deep .p-timeline-event {
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
export class EducationComponent implements OnInit {
  private dataService = inject(DataService);

  education = signal<Education[]>([]);

  ngOnInit() {
    this.dataService.getEducation().subscribe((data) => this.education.set(data));
  }
}
