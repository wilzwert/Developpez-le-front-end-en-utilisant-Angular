import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { Participation } from 'src/app/core/models/Participation.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  chartData:Array<Object> = [];

  updateChart(olympics: Olympic[]) :void {
    this.chartData = olympics.map(
      (olympic: Olympic) => {
        return {
          name: olympic.country, 
          value: olympic.participations.reduce((total, participation: Participation) => {return total + participation.medalsCount}, 0), 
          extra: {id: olympic.id}
        }
      }
    );
  }

  onChartClick(event?: any) :void {
    console.log('navigate to '+event.extra.id);
  }
  

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((res) => {
      this.updateChart(res);
    });
  }
}
