import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStaffComponent } from './modalStaff.component';

describe('ModalStaffComponent', () => {
  let component: ModalStaffComponent;
  let fixture: ComponentFixture<ModalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
