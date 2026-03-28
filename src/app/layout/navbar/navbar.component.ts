import {
  Component,
  inject,
  signal,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface LangOption {
  label: string;
  value: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslocoModule, ButtonModule, DrawerModule, SelectModule, FormsModule],
  template: `
    <nav
      class="navbar"
      [class.navbar--scrolled]="scrolled()"
      role="navigation"
      aria-label="Main navigation"
      *transloco="let t"
    >
      <div class="navbar__inner">
        <!-- Logo -->
        <a href="#hero" class="navbar__logo" aria-label="Home">
          <img src="assets/domain/logo/brand/logo.png" alt="FR Logo" class="navbar__logo-img" />
        </a>

        <!-- Desktop nav links -->
        <ul class="navbar__links" role="menubar">
          @for (link of navLinks; track link.fragment) {
            <li role="none">
              <a
                [href]="'#' + link.fragment"
                class="navbar__link"
                role="menuitem"
              >
                {{ t(link.labelKey) }}
              </a>
            </li>
          }
        </ul>

        <!-- Right side: lang selector + mobile toggle -->
        <div class="navbar__actions">
          <p-select
            [options]="langs"
            [(ngModel)]="selectedLang"
            optionLabel="flag"
            optionValue="value"
            (onChange)="changeLang($event.value)"
            class="navbar__lang-select"
            aria-label="Select language"
          />

          <button
            class="navbar__hamburger"
            (click)="drawerVisible.set(true)"
            aria-label="Open menu"
            pButton
            [text]="true"
            icon="pi pi-bars"
            severity="secondary"
          ></button>
        </div>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <p-drawer
      [(visible)]="drawerVisible"
      position="right"
      [style]="{ width: '280px' }"
      styleClass="mobile-drawer-theme"
      header="Menu"
    >
      <ng-template #content>
        <ul class="drawer-links" *transloco="let t">
          @for (link of navLinks; track link.fragment) {
            <li>
              <a
                [href]="'#' + link.fragment"
                class="drawer-link"
                (click)="drawerVisible.set(false)"
              >
                {{ t(link.labelKey) }}
              </a>
            </li>
          }
        </ul>
      </ng-template>
    </p-drawer>
  `,
  styles: `
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .navbar:not(.navbar--scrolled) {
      padding: 24px 32px;
      background: transparent;
      border: 1px solid transparent;
    }

    .navbar--scrolled {
      background: rgba(10, 15, 26, 0.7);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      margin: 16px auto;
      max-width: 1200px;
      border-radius: 100px;
      padding: 12px 24px;
      border: 1px solid rgba(148, 163, 184, 0.22);
      box-shadow: 0 12px 44px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(226, 232, 240, 0.22);
      left: 16px;
      right: 16px;
    }

    .navbar__inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar__logo {
      text-decoration: none;
    }

    .navbar__logo-img {
      height: 52px;
      width: auto;
      border-radius: 8px;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    }

    .navbar__logo:hover .navbar__logo-img {
      transform: scale(1.08) rotate(-2deg);
      box-shadow: 0 0 24px rgba(241, 245, 249, 0.4);
    }

    .navbar__links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 8px;
    }

    .navbar__link {
      padding: 8px 16px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 8px;
      transition: color 0.2s, background 0.2s;
    }

    .navbar__link:hover {
      color: #ffffff;
      background: rgba(148, 163, 184, 0.24);
    }

    .navbar__actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .navbar__hamburger {
      display: none !important;
    }

    .navbar__lang-select {
      width: 80px;
      border-radius: 8px;
    }

    /* Drawer styles */
    .drawer-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .drawer-link {
      display: block;
      padding: 14px 16px;
      color: #e2e8f0;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .drawer-link:hover {
      background: rgba(148, 163, 184, 0.24);
    }

    :host ::ng-deep .mobile-drawer-theme.p-drawer {
      background: rgba(10, 15, 26, 0.95);
      color: #e2e8f0;
      border-left: 1px solid rgba(148, 163, 184, 0.2);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    :host ::ng-deep .mobile-drawer-theme .p-drawer-header {
      background: transparent;
      color: #f8fafc;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    }

    :host ::ng-deep .mobile-drawer-theme .p-drawer-content {
      background: transparent;
      color: inherit;
    }

    :host ::ng-deep .mobile-drawer-theme .p-drawer-close-button {
      color: #e2e8f0;
    }

    :host ::ng-deep .mobile-drawer-theme .p-drawer-close-button:hover {
      background: rgba(148, 163, 184, 0.28);
    }

    :host ::ng-deep .navbar__hamburger .pi {
      color: #f1f5f9;
    }

    @media (max-width: 768px) {
      .navbar__logo-img {
        height: 32px;
      }
      .navbar__lang-select {
        width: 90px;
      }
      .navbar__actions {
        gap: 6px;
      }
      .navbar__links {
        display: none;
      }
      .navbar__hamburger {
        display: flex !important;
      }
      .navbar:not(.navbar--scrolled) {
         padding: 16px 24px;
      }
      .navbar--scrolled {
         margin: 12px 16px;
         padding: 12px 16px;
         max-width: calc(100% - 32px);
      }
    }
  `,
})
export class NavbarComponent {
  private translocoService = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  drawerVisible = signal(false);

  langs: LangOption[] = [
    { label: 'Italiano', value: 'it', flag: '🇮🇹' },
    { label: 'English', value: 'en', flag: '🇬🇧' },
  ];

  selectedLang = signal(this.translocoService.getActiveLang());

  navLinks = [
    { fragment: 'skills', labelKey: 'nav.skills' },
    { fragment: 'experience', labelKey: 'nav.experience' },
    { fragment: 'education', labelKey: 'nav.education' },
    { fragment: 'certifications', labelKey: 'nav.certifications' },
    { fragment: 'projects', labelKey: 'nav.projects' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 50);
    }
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.selectedLang.set(lang);
  }
}
