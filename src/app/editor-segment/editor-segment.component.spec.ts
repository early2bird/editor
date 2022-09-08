import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSegmentComponent } from './editor-segment.component';

describe('EditorSegmentComponent', () => {
  let component: EditorSegmentComponent;
  let fixture: ComponentFixture<EditorSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
