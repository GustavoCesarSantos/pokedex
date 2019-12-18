import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NameValidatorService } from './name.validator.service';
import { CreatePokemonService } from './create-pokemon.service';
import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';
import { Type } from 'src/app/pokemons/pokemon/type';

@Component({
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css'],
  providers: [ CreatePokemonService, NameValidatorService ]
})
export class CreatePokemonComponent implements OnInit{
  createPokemonForm : FormGroup;
  types: Type[] = [];
  arrayOfAddedTypes: string[] = [];
  arrayOfAddedWeaknesses: string[] = [];
  @ViewChild('addedTypes', { static:false }) private ulTypes: ElementRef<HTMLUListElement>;
  @ViewChild('addedWeaknesses', { static:false }) private ulWeaknesses: ElementRef<HTMLUListElement>;

  constructor(private _formBuilder: FormBuilder,
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
      ]
    });

    this.addTypesInComboBox();
  };

  addTypesInComboBox(){
    this._createPokemonService.listCreatedPokemonTypes().subscribe(res => {
      this.types = res;
    });
  }

  addValue(typeToMessage: string, valueOfTypeSelected: string, classNameForQuery: string, arrayOfAddedValues: string[], ulToAppend: ElementRef<HTMLUListElement>){
    if(valueOfTypeSelected === '')
      return false;
    
    if(arrayOfAddedValues.includes(valueOfTypeSelected))
    return false;

    const teste: ElementRef<HTMLSelectElement> = document.querySelector('#selectTypes');
    teste.nativeElement.selectedIndex = 1;
    

    const response = confirm(`Deseja realmente adicionar um(a) ${typeToMessage} neste pokemon ?`);
    if(response){
      ulToAppend.nativeElement.innerHTML = '';
  
      const result = valueOfTypeSelected;
      
      arrayOfAddedValues.push(result);
      arrayOfAddedValues.map( type => {
        let li = document.createElement('li');
        li.classList.add(classNameForQuery);
        let text = document.createTextNode(type)
        li.appendChild(text);
        ulToAppend.nativeElement.appendChild(li);
      });
    }
  };

  addNewInputTypes(valueOfTypeSelected){
    this.addValue('Type', valueOfTypeSelected, 'types-pokemon', this.arrayOfAddedTypes, this.ulTypes);
  };

  addNewInputWeaknesses(valueOfTypeSelected){
    this.addValue('Weaknesse', valueOfTypeSelected, 'weaknesses-pokemon', this.arrayOfAddedWeaknesses, this.ulWeaknesses);
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
    this._createPokemonService.createPokemon(pokemon).subscribe(
      () => {
        this.goToHome();
      },
      err => {
        console.log(err.error);
      }
    );
  };

  goToHome(){
    this._router.navigate(['']);
  };
};