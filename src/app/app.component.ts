import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocaleListComponent } from './components/locale-list/locale-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  private _bottomSheet = inject(MatBottomSheet);

  public locale = this.setLocaleLabel($localize.locale);

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle($localize`Lunch Plans`);
  }

  setLocaleLabel(locale: string | undefined) {
    let label = "English";

    if (locale === "es") label = "Español";

    return label;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(LocaleListComponent);
  }
}
