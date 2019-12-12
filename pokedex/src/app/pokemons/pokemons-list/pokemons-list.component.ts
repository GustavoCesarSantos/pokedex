import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon/pokemon';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'p-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css'],
  providers: [ PokemonService ]
})

export class PokemonsListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filter: string = '';
  currentPage: number = 1;

  constructor(private _pokemonService: PokemonService, private _activatedRoute: ActivatedRoute){ }

  ngOnInit():void {
    this.pokemons = this._activatedRoute.snapshot.data.pokemons;
  };
  
  nextPage(){ 
    this._pokemonService.listFromPokedexPaginated(++this.currentPage).subscribe(pokemons => {
      this.filter = '';
      this.pokemons = pokemons;
    });
  };

  previousPage(){ 
    this._pokemonService.listFromPokedexPaginated(--this.currentPage).subscribe(pokemons => {
      this.filter = '';
      this.pokemons = pokemons;
    });
  };

};
