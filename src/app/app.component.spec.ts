import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { OlympicService } from './core/services/olympic.service';
import { BehaviorSubject, of } from 'rxjs';
import { Olympic } from './core/models/Olympic.interface';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [provideHttpClient()],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO : write test to check data loading
  it('should load olympics data', () => {
    const app = fixture.componentInstance;
    /*app.olympicService.getOlympics().subscribe(olympics => {
      expect(olympics.length).toBe(5);
    });*/
  });

});
