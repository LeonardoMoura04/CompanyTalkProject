import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoReuniaoComponent } from './edicao-reuniao.component';

describe('EdicaoReuniaoComponent', () => {
  let component: EdicaoReuniaoComponent;
  let fixture: ComponentFixture<EdicaoReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoReuniaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
