import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Grid } from "../../shared/grid/grid";
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonService } from '../../services/PokemonService';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Grid, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pokemon$ = new BehaviorSubject<PokemonDTO[]>([]);
  currentOffset: number = 0;
  observerStrarted: boolean = false;
  isLoadingMore: boolean = false;

  @ViewChild('sentinel') sentinelElement!: ElementRef;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.pokemonService.getPokemonPaginated(0).subscribe(pokemon => {
      this.pokemon$?.next(pokemon);
    });
  }

  ngAfterViewChecked() {
    if (this.sentinelElement && !this.observerStrarted) {
      this.startIntersectionObserver();
      this.observerStrarted = true;
    }
  }

  startIntersectionObserver() {
    const observer = new IntersectionObserver(sentinel => {
      sentinel.forEach(s => {
        if (s.isIntersecting) {
          this.loadMorePokemon();
        }
      });
    });

    if (this.sentinelElement) {
      observer.observe(this.sentinelElement.nativeElement);
    }
  }

  loadMorePokemon() {
    if (this.isLoadingMore) return;

    this.isLoadingMore = true;
    this.cdr.detectChanges();

    const nextOffset: number = this.currentOffset + 52;
    this.pokemonService.getPokemonPaginated(nextOffset).subscribe({
      next: (newPokemonList => {
        this.pokemon$.next([...(this.pokemon$.value ?? []), ...newPokemonList]);
        this.currentOffset = nextOffset;
        this.isLoadingMore = false;
      }),
      error: () => {
        this.isLoadingMore = false;
      }
    });
  }

}
