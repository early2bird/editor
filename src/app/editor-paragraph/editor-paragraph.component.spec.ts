import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorParagraphComponent } from './editor-paragraph.component';

describe('EditorParagraphComponent', () => {
  let component: EditorParagraphComponent;
  let fixture: ComponentFixture<EditorParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
