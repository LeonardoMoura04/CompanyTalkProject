import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoDadosComponent } from './edicao-dados.component';

describe('EdicaoDadosComponent', () => {
  let component: EdicaoDadosComponent;
  let fixture: ComponentFixture<EdicaoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
