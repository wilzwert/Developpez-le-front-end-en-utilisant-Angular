import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic.interface';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participation } from '../../core/models/Participation.interface';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterModule, NgxChartsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>;
  olympic$!: Observable<Olympic|undefined>;
  chartData: Array<Object> = [];
  totalMedals: number = 0;
  totalAthletes: number = 0;

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute
  ) { }
  
  buildData(olympic: Olympic): void {
    this.totalMedals = 0;
    this.totalAthletes = 0;
    this.chartData = [];

    if(olympic) {
      // compute data for number cards,  build data for line chart, 
      const series: Array<Object> = [];
      olympic.participations.forEach((participation: Participation) => {
        this.totalMedals += participation.medalsCount;
        this.totalAthletes += participation.athleteCount;
        series.push({ name: "" + participation.year, value: participation.medalsCount });
      });
      this.chartData.push({ name: olympic.country, series: series });
    }
  }

  update(o: Olympic): void {
    this.buildData(o);
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    const olympicId: number = parseInt(this.route.snapshot.params['id']);
    this.olympic$ = this.olympicService.getOlympicByiD(olympicId).pipe(
      // unsubscribe on component destruction
      takeUntil(this.destroy$), 
      tap((value) => {if(value) {this.update(value);}})
    );
    this.olympic$.subscribe();
  }

  ngOnDestroy(): void {
    // emit to Subject to unsubscribe from olympic service observable
    this.destroy$.next(true);
  }
}
