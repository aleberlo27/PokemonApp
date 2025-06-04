import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
  "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
    ],
}


const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon  = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonList Component', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      // expect(true).toBeFalse();
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      // expect(true).toBeFalse();
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon(mockPokemon.id).subscribe((pokemon: any) => {
      expect(pokemon).toBe(mockPokemon)
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${mockPokemon.id}`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by name', () => {
    service.loadPokemon(mockPokemon.name).subscribe((pokemon: any) => {
      expect(pokemon).toBe(mockPokemon)
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  //! DISPARAR ERRORES
  it('should render "Pokemon not found"', () => {
    const pokemonName = 'pokemon-no-existente';

    service.loadPokemon(pokemonName)
    .pipe(
      catchError( err => {
        expect(err.message).toContain('Pokemon not found');
        return [];
      }),
    )
    .subscribe((pokemon: any) => {
      expect(pokemon).toBe(mockPokemon)
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');
    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not found'
    });
  });
});
