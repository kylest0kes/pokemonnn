import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pokemonpage } from './pokemonpage';

describe('Pokemonpage', () => {
  let component: Pokemonpage;
  let fixture: ComponentFixture<Pokemonpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pokemonpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pokemonpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
