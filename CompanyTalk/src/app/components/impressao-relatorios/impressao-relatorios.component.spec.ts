import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoRelatoriosComponent } from './impressao-relatorios.component';

describe('ImpressaoRelatoriosComponent', () => {
  let component: ImpressaoRelatoriosComponent;
  let fixture: ComponentFixture<ImpressaoRelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressaoRelatoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
