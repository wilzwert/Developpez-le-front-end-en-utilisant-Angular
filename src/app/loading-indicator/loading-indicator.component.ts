import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../core/services/loading.service';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { delay, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private router: Router, public loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof NavigationStart) {
            this.loadingService.loadingOn();
          } else if (event instanceof NavigationEnd) {
            this.loadingService.loadingOff();
          } else if (event instanceof NavigationCancel) {
            this.loadingService.loadingOff();
          }
        }),
        delay(10),
      )
      .subscribe();
  }
}