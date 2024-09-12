import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
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
    // take(1) : takes only the firts value emitted by the observable we get from olympicService
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
