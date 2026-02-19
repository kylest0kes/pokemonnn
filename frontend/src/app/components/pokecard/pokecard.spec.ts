import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pokecard } from './pokecard';

describe('Pokecard', () => {
  let component: Pokecard;
  let fixture: ComponentFixture<Pokecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pokecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pokecard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
