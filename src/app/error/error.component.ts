import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ErrorService } from '../core/services/error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {

  error$!: Observable<Error>;

  constructor(private errorService: ErrorService){
    this.error$ = this.errorService.error$;
  }

  ngOnInit(): void {
    /*this.error$.pipe(
      
    ).subscribe();*/
  }

}
