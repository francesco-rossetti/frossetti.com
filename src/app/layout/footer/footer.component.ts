import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoModule],
  template: `
    <footer class="footer" role="contentinfo" *transloco="let t">
      <div class="footer__inner">
        <div class="footer__top">
          <!-- Logo & tagline -->
          <div class="footer__brand">
            <img src="assets/domain/logo/brand/logo.png" alt="FR Logo" class="footer__logo-img" />
            <p class="footer__tagline">Francesco Rossetti — Full Stack Developer</p>
          </div>

          <!-- Social links -->
          <div class="footer__social" role="list" aria-label="Social links">
            <a
              href="https://github.com/francesco-rossetti"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              role="listitem"
              aria-label="GitHub"
            >
              <i class="pi pi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/francescorossetti19"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              role="listitem"
              aria-label="LinkedIn"
            >
              <i class="pi pi-linkedin"></i>
            </a>
          </div>
        </div>

        <div class="footer__divider"></div>

        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ currentYear }} Francesco Rossetti. {{ t('footer.rights') }}
          </p>
          <p class="footer__built">
            {{ t('footer.built') }} <span class="gradient-text">Angular</span>,
            <span class="gradient-text">PrimeNG</span> &
            <span class="gradient-text">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      background: rgba(10, 15, 26, 0.95);
      border-top: 1px solid rgba(148, 163, 184, 0.08);
      padding: 48px 24px 32px;
    }

    .footer__inner {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;
    }

    .footer__logo-img {
      height: 48px;
      width: auto;
      margin-bottom: 8px;
    }

    .footer__tagline {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 0.9rem;
    }

    .footer__social {
      display: flex;
      gap: 12px;
    }

    .footer__social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(30, 41, 59, 0.6);
      color: #ffffff;
      text-decoration: none;
      font-size: 1.8rem;
      transition: background 0.2s, color 0.2s, transform 0.2s;
    }

    .footer__social-link:hover {
      background: rgba(220, 38, 38, 0.2);
      color: #ef4444;
      transform: translateY(-2px);
    }

    .footer__divider {
      height: 1px;
      background: rgba(148, 163, 184, 0.08);
      margin: 32px 0;
    }

    .footer__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer__copyright,
    .footer__built {
      margin: 0;
      font-size: 0.85rem;
      color: #475569;
    }

    @media (max-width: 640px) {
      .footer__top,
      .footer__bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
