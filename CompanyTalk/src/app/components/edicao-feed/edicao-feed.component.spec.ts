import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoFeedComponent } from './edicao-feed.component';

describe('EdicaoFeedComponent', () => {
  let component: EdicaoFeedComponent;
  let fixture: ComponentFixture<EdicaoFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
