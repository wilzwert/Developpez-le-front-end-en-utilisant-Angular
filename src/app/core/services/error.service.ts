import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSubject = new Subject<Error>();
  error$: Observable<Error> = this.errorSubject.asObservable();

  constructor() { }

  handleError(error: Error) :void {
    this.errorSubject.next(error);
  }
}
