import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public numberOfJos: number = 0;
  public numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  chartData:Array<Object> = [];

  update(olympics: Olympic[]) :void {
    if(olympics.length) {
      this.chartData = olympics.map(
        (olympic: Olympic) => {
          return {
            name: olympic.country, 
            value: olympic.participations.reduce((total, participation: Participation) => {return total + participation.medalsCount}, 0), 
            extra: {id: olympic.id}
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

  onChartClick(event?: any) :void {
    console.log('navigate to '+event.extra?.id);
    console.log(typeof event, event);
    try {
      this.router.navigateByUrl('country/'+event.extra?.id);
    }
    // TODO : improve error handling
    catch(e) {
      console.log(e);
    }
  }
  

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((res) => {
      this.update(res);
    });
  }
}
