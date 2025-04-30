import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdformComponent } from './prodform.component';

describe('ProdformComponent', () => {
  let component: ProdformComponent;
  let fixture: ComponentFixture<ProdformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
