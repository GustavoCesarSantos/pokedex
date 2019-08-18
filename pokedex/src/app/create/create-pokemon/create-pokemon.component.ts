import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePokemonService } from './create-pokemon.service';
import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';
import { Router } from '@angular/router';
import { NameValidatorService } from './name.validator.service';

@Component({
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit{
  createPokemonForm : FormGroup
  @ViewChild('typesPokemons', { static:false }) private divTypes: ElementRef<HTMLDivElement>;
  @ViewChild('weaknessesPokemons', { static:false }) private divWeaknesses: ElementRef<HTMLDivElement>;

  constructor(private _formBuilder: FormBuilder, 
    private _render: Renderer2,
    private _nameValidatorService: NameValidatorService,
    private _createPokemonService: CreatePokemonService,
    private _router: Router){ }
  
  
  ngOnInit(): void {
    this.createPokemonForm = this._formBuilder.group({
      'picture': [
        '', 
        Validators.required
      ],
      'name': [
        '', 
        [
          Validators.required
        ],
        this._nameValidatorService.verifyIfNameAlreadyExist()
      ],
      'types': [
        '', 
        Validators.required
      ],
      'weaknesses': [
        '', 
        Validators.required
      ]
    });
  };

  createInput(typesOfFormControlName: string, className: string, divToAppend: ElementRef<HTMLDivElement>){
    const input = this._render.createElement('input') as HTMLInputElement;
    input.setAttribute('formControlName', typesOfFormControlName);
    input.classList.add(className);
    input.setAttribute('placeholder',  `insert pokemon ${typesOfFormControlName}`);
    return confirm(`Deseja realmente adicionar mais um(a) ${typesOfFormControlName} neste pokemon ?`) ? this._render.appendChild(divToAppend.nativeElement, input): input.remove();
  };

  addNewInputTypes(){
    this.createInput('types', 'types-pokemon', this.divTypes);
  };

  addNewInputWeaknesses(){
    this.createInput('weaknesses', 'weaknesses-pokemon', this.divWeaknesses);
  };

  createPokemon(){
    const pokemon = this.createPokemonForm.getRawValue() as Pokemon;
    const arrayTypes: string[] = [];
    const arrayWeaknesses: string[] = [];

    this.divTypes.nativeElement.querySelectorAll<HTMLInputElement>('.types-pokemon')
      .forEach(input => arrayTypes.push(input.value));
    
    this.divWeaknesses.nativeElement.querySelectorAll<HTMLInputElement>('.weaknesses-pokemon')
      .forEach(input => arrayWeaknesses.push(input.value));
    
    pokemon.types = arrayTypes;
    pokemon.weaknesses = arrayWeaknesses;
    this._createPokemonService.createPokemon(pokemon).subscribe(() => this._router.navigate(['']));
  };
};