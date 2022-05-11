import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeituraCodigoDeBarrasPage } from './leitura-codigo-de-barras.page';

describe('LeituraCodigoDeBarrasPage', () => {
  let component: LeituraCodigoDeBarrasPage;
  let fixture: ComponentFixture<LeituraCodigoDeBarrasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeituraCodigoDeBarrasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeituraCodigoDeBarrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
