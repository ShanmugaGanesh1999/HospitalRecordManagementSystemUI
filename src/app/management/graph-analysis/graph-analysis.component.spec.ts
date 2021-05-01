import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnalysisComponent } from './graph-analysis.component';

describe('GraphAnalysisComponent', () => {
  let component: GraphAnalysisComponent;
  let fixture: ComponentFixture<GraphAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
