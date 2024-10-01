import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { ChartEvent } from 'src/app/core/models/ChartEvent.interface';
import { Participation } from 'src/app/core/models/Participation.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  public olympics$: Observable<Olympic[]> = of([]);
  public numberOfJos: number = 0;
  public numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) { }

  chartData: Array<Object> = [];
  view!: [number, number];

  update(olympics: Olympic[]): void {
    if (olympics.length) {
      this.chartData = olympics.map(
        (olympic: Olympic) => {
          return {
            name: olympic.country,
            value: olympic.participations.reduce((total, participation: Participation) => { return total + participation.medalsCount }, 0),
            extra: { id: olympic.id }
          }
        }
      );
      this.numberOfJos = olympics[0].participations.length;
      this.numberOfCountries = this.chartData.length;
    }
    else {
      this.chartData = [];
      this.numberOfJos = this.numberOfCountries = 0;
    }
  }

  onChartClick(event?: ChartEvent): void {
    this.router.navigateByUrl('country/' + event?.extra?.id);
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      // unsubscribe on component destruction
      takeUntil(this.destroy$), 
      tap(res => this.update(res))
    ).subscribe();
  }

  ngOnDestroy(): void {
    // emit to Subject to unsubscribe from olympic service observable
    this.destroy$.next(true);
  }
}
