import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NameValidatorService } from './name.validator.service';
import { TypeValidatorService } from './type.validator.service';
import { CreatePokemonService } from './create-pokemon.service';
import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';

@Component({
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit{
  createPokemonForm : FormGroup;
  arrayOfAddedTypes: string[] = [];
  arrayOfAddedWeaknesses: string[] = [];
  @ViewChild('typesPokemons', { static:false }) private divTypes: ElementRef<HTMLDivElement>;
  @ViewChild('addedTypes', { static:false }) private ulTypes: ElementRef<HTMLUListElement>;
  @ViewChild('weaknessesPokemons', { static:false }) private divWeaknesses: ElementRef<HTMLDivElement>;
  @ViewChild('addedWeaknesses', { static:false }) private ulWeaknesses: ElementRef<HTMLUListElement>;

  constructor(private _formBuilder: FormBuilder,
    private _nameValidatorService: NameValidatorService,
    private _typeValidatorService: TypeValidatorService,
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
        [
          Validators.required
        ],
        this._typeValidatorService.verifyIfTypeAlreadyExist()
      ],
      'weaknesses': [
        '',
        [
          Validators.required
        ],
        this._typeValidatorService.verifyIfTypeAlreadyExist()
      ]
    });
  };

  addValue(typeToMessage: string, divToAppend: ElementRef<HTMLDivElement>, classNameForQuery: string, arrayOfAddedValues: string[], ulToAppend: ElementRef<HTMLUListElement>){
    const response = confirm(`Deseja realmente adicionar um(a) ${typeToMessage} neste pokemon ?`);
    if(response){
      ulToAppend.nativeElement.innerHTML = '';
  
      const result = divToAppend.nativeElement.querySelector<HTMLInputElement>(`.${classNameForQuery}`).value;
      arrayOfAddedValues.push(result);
      arrayOfAddedValues.map( type => {
        let li = document.createElement('li');
        li.classList.add(classNameForQuery);
        let text = document.createTextNode(type)
        li.appendChild(text);
        ulToAppend.nativeElement.appendChild(li);
      });
    }
    return false;
  };

  addNewInputTypes(){
    this.addValue('Type', this.divTypes, 'types-pokemon', this.arrayOfAddedTypes, this.ulTypes);
  };

  addNewInputWeaknesses(){
    this.addValue('Weaknesse', this.divWeaknesses, 'weaknesses-pokemon', this.arrayOfAddedWeaknesses, this.ulWeaknesses);
  };

  createPokemon(){
    const pokemon = this.createPokemonForm.getRawValue() as Pokemon;
    const arrayTypes: string[] = [];
    const arrayWeaknesses: string[] = [];

    this.ulTypes.nativeElement.querySelectorAll<HTMLLIElement>('.types-pokemon')
      .forEach(input => arrayTypes.push(input.textContent.toLowerCase()));
    
    this.ulWeaknesses.nativeElement.querySelectorAll<HTMLLIElement>('.weaknesses-pokemon')
      .forEach(input => arrayWeaknesses.push(input.textContent.toLowerCase()));
    
    pokemon.types = arrayTypes;
    pokemon.weaknesses = arrayWeaknesses;
    console.log(pokemon)
    this._createPokemonService.createPokemon(pokemon).subscribe(
      () => {
        this._router.navigate([''])
      },
      err => {
        console.log(err.error);
      }
    );
  };
};