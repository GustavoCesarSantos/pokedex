import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

import { PokemonService } from '../../pokemon/pokemon.service';
import { Pokemon } from '../../pokemon/pokemon';
import { PlatformDetectionService } from 'src/app/core/platform-detection/platform-detection.service';

@Component({
  selector: 'p-search-in-api',
  templateUrl: './search-in-api.component.html',
  styleUrls: ['./search-in-api.component.css']
})
export class SearchInApiComponent{
  @ViewChild('pokemonName', { static: false}) inputValue: ElementRef<HTMLInputElement>;
  @Output() onClickSearch = new EventEmitter<Pokemon[]>();
  @Output() onClickBack = new EventEmitter<Pokemon[]>();
  @Input() currentPage: number = 1;

  constructor(
    private _pokemonService: PokemonService,
    private _platformDetection: PlatformDetectionService){ }

  searchInApi(pokemonName: string){
    return this._pokemonService.listFromPokemonName(pokemonName).subscribe( pokemon => {
      (!pokemon) ? console.error('Pokemon não encontrado'): this.onClickSearch.emit(pokemon);
      console.log(pokemon);
        this.inputValue.nativeElement.value = '';
        this._platformDetection.isPlatformBrowser() && 
          this.inputValue.nativeElement.focus();
      },
      err => console.error('ERROR :', err)
    );
  };

  backToNormalPage(){
    return this._pokemonService.listFromPokedexPaginated(this.currentPage).subscribe( pokemons => {
        this.onClickBack.emit(pokemons);
        this.inputValue.nativeElement.value = '';
        this._platformDetection.isPlatformBrowser() && 
          this.inputValue.nativeElement.focus();
      },
      err => console.error('ERROR :', err));
  };
};