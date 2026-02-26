import { ChangeDetectorRef, Component, ElementRef, ViewChild, effect } from '@angular/core';
import { Grid } from "../../shared/grid/grid";
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonService } from '../../services/pokemon.service.';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Button } from "../../shared/button/button";
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  imports: [Grid, AsyncPipe, Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pokemon$ = new BehaviorSubject<PokemonDTO[]>([]);
  currentOffset: number = 0;
  observerStrarted: boolean = false;
  isLoadingMore: boolean = false;
  showBackToTop: boolean = false;
  isSearching: boolean = false;
  isNameSearch: boolean = false;
  isTypeSearch: boolean = false;

  @ViewChild('homeSentinel') homeSentinelElement!: ElementRef;
  @ViewChild('navSentinel') navSentinelElement!: ElementRef;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef, private searchService: SearchService) {
    effect(() => {
      const params = this.searchService.searchParams();
      if (params && params.searchTerm) {
        this.isNameSearch = false;
        this.isTypeSearch = false;

        this.isLoadingMore = true;
        this.pokemon$.next([]);

        if (params.searchBy === 'name') {
          this.isNameSearch = true;
          this.loadSinglePokemon(params.searchTerm);
        } else {
          this.isTypeSearch = true;
          this.loadPokemonByType(params.searchTerm);
        }
      } else {
        this.isNameSearch = false;
        this.isTypeSearch = false;
        this.isLoadingMore = false;
        this.currentOffset = 0;
        this.pokemon$.next([]);
        this.pokemonService.getPokemonPaginated(0).subscribe(pokemon => {
          this.pokemon$.next(pokemon);
        })
      }
    });
  }

  ngOnInit() {
    this.pokemonService.getPokemonPaginated(0).subscribe(pokemon => {
      this.pokemon$?.next(pokemon);
    });
  }

  ngAfterViewInit() {
    if (this.homeSentinelElement && this.navSentinelElement && !this.observerStrarted) {
      this.startLoadMoreIntersectionObserver();
      this.startNavIntersectionObserver();
      this.observerStrarted = true;
    }
  }

  startLoadMoreIntersectionObserver() {
    const observer = new IntersectionObserver(sentinel => {
      sentinel.forEach(s => {
        if (s.isIntersecting) {
          this.loadMorePokemon();
        }
      });
    });

    if (this.homeSentinelElement) {
      observer.observe(this.homeSentinelElement.nativeElement);
    }
  }

  startNavIntersectionObserver() {
    const observer = new IntersectionObserver(sentinel => {
      sentinel.forEach(s => {
        if (!s.isIntersecting) {
          this.showButtonToTop();
        } else {
          this.hideButtonToTop();
        }
      })
    });

    if (this.navSentinelElement) {
      observer.observe(this.navSentinelElement.nativeElement);
    }
  }

  showButtonToTop() {
    this.showBackToTop = true;
    this.cdr.detectChanges();
  }

  hideButtonToTop() {
    this.showBackToTop = false;
    this.cdr.detectChanges();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  loadMorePokemon() {
    if (this.isNameSearch || this.isTypeSearch) return;
    if (this.isLoadingMore || this.isSearching) return;

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

  loadSinglePokemon(name: string) {
    this.isLoadingMore = true;
    this.pokemon$.next([]);
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (pokemon) => {
        if (pokemon) {
          this.pokemon$.next([pokemon]);
          this.isNameSearch = false;
        } else {
          this.pokemon$.next([]);
        }
        this.currentOffset = 0;
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.pokemon$.next([]);
        this.isLoadingMore = false;
      }
    })

  }

  loadPokemonByType(type: string) {
    this.isLoadingMore = true;
    this.pokemon$.next([]);
    this.pokemonService.getPokemonByType(type).subscribe(pokemon => {
      this.pokemon$.next(pokemon);
      this.currentOffset = 0;
      this.isLoadingMore = false;
    });
  }

}
