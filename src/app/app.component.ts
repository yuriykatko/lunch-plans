import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  public locale = $localize.locale;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle($localize`Lunch Plans`);
  }
}
