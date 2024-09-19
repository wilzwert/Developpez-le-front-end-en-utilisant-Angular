import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic.interface';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  
  constructor(private http: HttpClient) {}

  loadInitialData() :Observable<Olympic[]> {
    // this.http.get returns an Observable on the HttpResponse
    // pipe : chained observers ?, except for catchError which has a different behaviour
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      // tap is used to add side effects ; as a side effect, we populate BehaviorSubject (ie value is "emitted")
      tap((value) => {this.olympics$.next(value);}),

      // catchError only listens to the error channel and ignores notifications
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() :Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicByiD(id: number) : Observable<Olympic | undefined> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => olympics.find(olympic => olympic.id === id))
    );
  }
}
