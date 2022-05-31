import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayOrdersFinalizedPage } from './display-orders-finalized.page';

describe('DisplayOrdersFinalizedPage', () => {
  let component: DisplayOrdersFinalizedPage;
  let fixture: ComponentFixture<DisplayOrdersFinalizedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOrdersFinalizedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayOrdersFinalizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
