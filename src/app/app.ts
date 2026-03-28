import { Component, inject, OnInit, DOCUMENT } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <a class="skip-link" href="#main-content">Vai al contenuto principale</a>
    <router-outlet />
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `,
})
export class App implements OnInit {
  private translocoService = inject(TranslocoService);
  private document = inject(DOCUMENT);

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe((lang) => {
      this.document.documentElement.lang = lang;
    });
  }
}
