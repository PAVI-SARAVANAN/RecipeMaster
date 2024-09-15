import { Component, inject, input, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import type { recipeInput } from '../../shared/data.model';
import { recipeService } from '../../shared/recipe.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [FormsModule, NgIf, ButtonComponent],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  cancel = output();
  formSubmit = output();
  
  recipeservice = inject(recipeService);
  private formdata = viewChild.required<NgForm>('form');

  enteredRecipe = '';
  enteredMethod = '';
  enteredCategory = '';
  enteredDuration = '';
  enteredImage = '';

  OnSubmit(recipe:string, method:string,  category:string, duration:string, imageURL:string){
    this.enteredRecipe = recipe;
    this.enteredMethod = method;
    this.enteredDuration = duration;
    this.enteredCategory = category;
    this.enteredImage = imageURL;

    const addedRecipe:recipeInput = {
      name:this.enteredRecipe,
      method:this.enteredMethod,
      category:this.enteredCategory,
      duration:this.enteredDuration,
      imageURL:this.enteredImage
    };
    this.formdata().form.reset();
    this.recipeservice.addRecipe(addedRecipe);
    this.formSubmit.emit();
  }
  OnCancel(){
    this.cancel.emit();
  }
 

}
