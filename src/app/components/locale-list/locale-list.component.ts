import { Component } from '@angular/core';

@Component({
  selector: 'locale-list',
  templateUrl: './locale-list.component.html',
  styleUrl: './locale-list.component.scss',
  standalone: false
})
export class LocaleListComponent {
  public isCurrentLocale(locale: string): boolean {
    return $localize.locale === locale;
  }
}
