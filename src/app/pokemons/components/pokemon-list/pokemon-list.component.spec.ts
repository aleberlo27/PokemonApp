import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { PokemonListComponent } from './pokemon-list.component';

const mockPokemons: SimplePokemon[] = [
  {id: '1', name: 'bulbasaur'},
  {id: '2', name: 'ivysaur'}
];

describe('PokemonList Component', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with length of component-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect( compiled.querySelectorAll('pokemon-card').length ).toBe(mockPokemons.length);
  });

  it('should render "No hay pokémons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect( compiled.querySelector('div')?.textContent ).toContain('No hay pokémons');
  });
});
