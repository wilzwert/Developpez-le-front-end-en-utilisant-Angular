import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSubject = new Subject<Error|null>();
  error$: Observable<Error|null> = this.errorSubject.asObservable();

  constructor() { }

  handleError(error: Error) :void {
    this.errorSubject.next(error);
  }

  reset(): void {
    this.errorSubject.next(null);/*
    this.errorSubject.complete();
    this.errorSubject = new Subject<Error>();
    this.error$ = this.errorSubject.asObservable();*/
  }
}
