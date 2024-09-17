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
    // take(1) : takes only the first value emitted by the observable we get from olympicService, then the observable completes
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
