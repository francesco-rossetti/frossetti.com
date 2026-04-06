import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { AboutComponent } from '../../sections/about/about.component';
import { SkillsComponent } from '../../sections/skills/skills.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { EducationComponent } from '../../sections/education/education.component';
import { CertificationsComponent } from '../../sections/certifications/certifications.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    CertificationsComponent,
    ProjectsComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-education />
      <app-certifications />
      <app-projects />
    </main>
    <app-footer />
  `,
  styles: `
    main {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding-bottom: 80px;
    }
  `
})
export class HomeComponent {}
