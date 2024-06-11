import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuyenteComponent } from './contribuyente.component';

describe('ContribuyenteComponent', () => {
  let component: ContribuyenteComponent;
  let fixture: ComponentFixture<ContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
