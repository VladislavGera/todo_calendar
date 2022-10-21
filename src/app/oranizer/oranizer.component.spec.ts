import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OranizerComponent } from './oranizer.component';

describe('OranizerComponent', () => {
  let component: OranizerComponent;
  let fixture: ComponentFixture<OranizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OranizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OranizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
