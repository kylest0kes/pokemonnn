import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatSheet } from './pokemon-stat-sheet';

describe('PokemonStatSheet', () => {
  let component: PokemonStatSheet;
  let fixture: ComponentFixture<PokemonStatSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonStatSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonStatSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
