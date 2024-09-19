import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private currentLoadingNumber: number = 0;


  private loadingSubject = 
    new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  public loadingOn() :void {
    // only emit boolean loading when necessary (ie if not already in loading state)
    if(this.currentLoadingNumber === 0) {
      this.loadingSubject.next(true);
    }
    this.currentLoadingNumber++;
    
  }

  public loadingOff() :void {
    this.currentLoadingNumber--;
    // only emit boolean loading when necessary (ie if nothing more requires loading)
    if(this.currentLoadingNumber === 0) {
      this.loadingSubject.next(false);
    }
  }
}
