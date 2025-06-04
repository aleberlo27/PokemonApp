import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private httpClient = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    // {{page}} para la paginación, el offset del endpoint
    if (page != 0) {
      //porque la paginación en la api empieza por 0, si le mandas un 1 debería empezar por 0
      --page;
    }

    page = Math.max(0, page);

    return this.httpClient
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          // Ordenar alfabéticamente por nombre
          simplePokemons.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
          return simplePokemons;
        })
        //tap( pokemons => console.log({pokemons}))
      );
  }

  public loadPokemon(id: string) {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    if( error.status === 0 ){
      console.log('An error ocurred:', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body:`, error.error);
    }

    const errorMessage = error.error ?? 'An error ocurred';
    return throwError(() => new Error(errorMessage));
  }
}
