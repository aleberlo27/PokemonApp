import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'; //toSignal para pasar de un observable a una señal
import { delay, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public isLoading = signal<boolean>(true);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1: +page)), //Si la página no es un número ponerle el 1 y sino ponerle el número de página
      map(page => Math.max(1, page))
    ),
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  });

  // ngOnInit(): void {
  //   this.loadPokemons();
  // }

  public loadPokemons( page = 1){
    const pageToLoad = this.currentPage()! + page;
    this.isLoading.set(true);
    this.pokemonService.loadPage(pageToLoad)
    .pipe(
      // tap(() => this.router.navigate([], {queryParams: {page: pageToLoad}})),
      tap(() => this.title.setTitle(`Pokémon SSR - Page ${pageToLoad}`)),
      delay(1000),
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    })
  }


  //ANTERIOR

  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // });

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.isLoading.set(false);
  //   }, 5000);
  // }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }


}
