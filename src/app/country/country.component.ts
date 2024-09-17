import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic.interface';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participation } from '../core/models/Participation.interface';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterModule, NgxChartsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

  olympic: Olympic | null = null;
  chartData: Array<Object> = [];
  totalMedals: number = 0;
  totalAthletes: number = 0;

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute
  ) { }

  getOlympic(): void {
    const olympicId = this.route.snapshot.params['id'];
    this.olympic = this.olympicService.getOlympic(olympicId);
  }

  buildData(): void {
    this.totalMedals = 0;
    this.totalAthletes = 0;
    this.chartData = [];

    if (this.olympic) {
      // compute data for number cards,  build data for line chart, 
      const series: Array<Object> = [];
      this.olympic.participations.forEach((participation: Participation) => {
        this.totalMedals += participation.medalsCount;
        this.totalAthletes += participation.athleteCount;
        series.push({ name: "" + participation.year, value: participation.medalsCount });
      });
      this.chartData.push({ name: this.olympic.country, series: series });
    }
  }

  update(): void {
    this.getOlympic();
    this.buildData();
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((res) => {
      this.update();
    });
  }
}
