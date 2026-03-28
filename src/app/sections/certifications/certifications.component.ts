import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '../../services/data.service';
import { Certification } from '../../models/certification.model';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-certifications',
  imports: [TranslocoModule, AnimateOnScrollModule, ButtonModule],
  template: `
    <section
      id="certifications"
      class="certifications-section"
      role="region"
      aria-labelledby="certifications-title"
      *transloco="let t"
    >
      <div class="section-container">
        <span class="section-label">{{ t('certification.label') }}</span>
        <h2 class="section-title" id="certifications-title">{{ t('certification.title') }}</h2>
        <p class="section-subtitle">{{ t('certification.sub') }}</p>

        <div class="cert-grid">
          @for (cert of certifications(); track cert.title) {
            <article
              class="glass-card cert-card"
              pAnimateOnScroll
              enterClass="animate-fade-in-up"
            >
              <div class="cert-card__badge" aria-hidden="true">
                <i class="pi pi-verified"></i>
              </div>
              <div class="cert-card__body">
                <span class="cert-card__date">{{ t(cert.dates) }}</span>
                <h3 class="cert-card__title">{{ t(cert.title) }}</h3>
                <p class="cert-card__desc">{{ t(cert.description) }}</p>
                <a
                  [href]="t(cert.url)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cert-card__link"
                  pButton
                  [text]="true"
                  severity="secondary"
                  [label]="t('certification.learnmore')"
                  icon="pi pi-external-link"
                ></a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .certifications-section {
      position: relative;
      background: rgba(17, 24, 39, 0.4);
    }

    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }

    .cert-card {
      padding: 32px;
      display: flex;
      gap: 20px;
    }

    .cert-card__badge {
      flex-shrink: 0;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(203, 213, 225, 0.25), rgba(71, 85, 105, 0.3));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #f8fafc;
    }

    .cert-card__body {
      flex: 1;
      min-width: 0;
    }

    .cert-card__date {
      font-size: 0.8rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .cert-card__title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 8px 0 10px;
      line-height: 1.3;
    }

    .cert-card__desc {
      font-size: 0.85rem;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 16px;
    }

    .cert-card__link {
      text-decoration: none;
      font-size: 0.85rem;
      color: #e2e8f0 !important;
    }

    .cert-card__link:hover {
      color: #ffffff !important;
    }

    @media (max-width: 640px) {
      .cert-grid {
        grid-template-columns: 1fr;
      }
      .cert-card {
        flex-direction: column;
      }
    }
  `,
})
export class CertificationsComponent implements OnInit {
  private dataService = inject(DataService);

  certifications = signal<Certification[]>([]);

  ngOnInit() {
    this.dataService.getCertifications().subscribe((data) => this.certifications.set(data));
  }
}
