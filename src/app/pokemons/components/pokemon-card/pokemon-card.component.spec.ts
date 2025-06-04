import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCard Component', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    // console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img')!;
    //Vamos a ver si se ha creado la imagen porque hemos puesto que llega si o si a la variable con !
    expect(image).toBeDefined();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image.src).toBe(imageUrl);
    expect(compiled.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('should have de proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');
    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemons,${mockPokemon.id}`);
  });
});
