import { Component, OnInit } from '@angular/core';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    document.body.removeChild(document.body.getElementsByClassName('page-overlay')[0]);
    document.body.classList.remove('app-loading');
    this.olympicService.loadInitialData().subscribe();
  }
}
