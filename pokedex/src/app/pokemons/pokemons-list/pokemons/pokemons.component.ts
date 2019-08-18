import { Component, Input } from '@angular/core';

import { Pokemon } from '../../pokemon/pokemon';

@Component({
  selector: 'p-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent {
  @Input() pokemons: Pokemon[] = [];
};
