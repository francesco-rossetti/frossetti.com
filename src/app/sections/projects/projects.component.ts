import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.model';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslocoModule, AnimateOnScrollModule, TagModule],
  template: `
    <section
      id="projects"
      class="projects-section"
      role="region"
      aria-labelledby="projects-title"
      *transloco="let t"
    >
      <div class="section-container">
        <span class="section-label">{{ t('project.label') }}</span>
        <h2 class="section-title" id="projects-title">{{ t('project.title') }}</h2>
        <p class="section-subtitle">{{ t('project.sub') }}</p>

        <div class="bento-grid">
          @for (project of projects(); track project.name; let i = $index) {
            <article
              class="glass-card project-card bento-card"
              [ngClass]="getBentoClass(i)"
              pAnimateOnScroll
              enterClass="animate-fade-in-up"
            >
              <div class="bento-content">
                <div class="project-card__header">
                  <i class="pi pi-folder-open project-card__icon" aria-hidden="true"></i>
                  @if (t(project.url).trim()) {
                    <a
                      [href]="t(project.url)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="project-card__ext-link"
                      aria-label="Open project"
                    >
                      <i class="pi pi-external-link"></i>
                    </a>
                  }
                </div>
                <h3 class="project-card__name">{{ t(project.name) }}</h3>
                <p class="project-card__desc">{{ t(project.description) }}</p>
                <div class="project-card__tags">
                  @for (tech of project.technologies; track tech) {
                    <p-tag
                      [value]="t(tech)"
                      [rounded]="true"
                      severity="secondary"
                    />
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .projects-section {
      position: relative;
    }



    .project-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
    }

    .project-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .project-card__icon {
      font-size: 2rem;
      color: #f1f5f9;
      text-shadow: 0 0 12px rgba(226, 232, 240, 0.2);
    }

    .project-card__ext-link {
      color: #cbd5e1;
      font-size: 1.1rem;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      text-decoration: none;
    }

    .project-card__ext-link:hover {
      color: #ffffff;
      background: rgba(148, 163, 184, 0.24);
      box-shadow: 0 0 0 1px rgba(226, 232, 240, 0.35);
    }

    .project-card__name {
      font-size: 1.2rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 12px;
    }

    .project-card__desc {
      font-size: 0.9rem;
      line-height: 1.65;
      color: #94a3b8;
      margin: 0;
      flex: 1;
    }

    .project-card__tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    @media (max-width: 640px) {
      .bento-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(DataService);

  projects = signal<Project[]>([]);

  ngOnInit() {
    this.dataService.getProjects().subscribe((data) => this.projects.set(data));
  }

  getBentoClass(index: number): string {
    const patterns = [
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide',
      'bento-card--wide'
    ];

    // const patterns = [
    //   'bento-card--wide',
    //   'bento-card--small',
    //   'bento-card--tall',
    //   'bento-card--large',
    //   'bento-card--small',
    //   'bento-card--wide'
    // ];

    return patterns[index % patterns.length];
  }
}
