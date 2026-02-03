import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalaabhishekamInvitationComponent } from './mandalaabhishekam-invitation.component';

describe('MandalaabhishekamInvitationComponent', () => {
  let component: MandalaabhishekamInvitationComponent;
  let fixture: ComponentFixture<MandalaabhishekamInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MandalaabhishekamInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandalaabhishekamInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
