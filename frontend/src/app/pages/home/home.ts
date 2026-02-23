import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Grid } from "../../shared/grid/grid";
import { PokemonDTO } from '../../models/pokemon-dto.interface';
import { PokemonService } from '../../services/PokemonService';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Button } from "../../shared/button/button";

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

  @ViewChild('homeSentinel') homeSentinelElement!: ElementRef;
  @ViewChild('navSentinel') navSentinelElement!: ElementRef;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {}

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
