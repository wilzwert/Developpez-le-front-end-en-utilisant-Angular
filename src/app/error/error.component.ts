import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ErrorService } from '../core/services/error.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {

  error$!: Observable<Error|null>;

  constructor(private router: Router, private errorService: ErrorService){
    this.error$ = this.errorService.error$;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof NavigationStart) {
            this.errorService.reset();
          }
        })
      )
      .subscribe();
  }

}
