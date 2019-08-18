import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  @Input() picture: string = '';
  @Input() name: string = '';
};
