import { Component, inject, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../../shared/button/button.component';
import { recipeService } from '../../../shared/recipe.service';
import type { recipe, recipeInput } from '../../../shared/data.model';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, NgIf, ButtonComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {

  enteredRecipe = '';
  enteredMethod = '';
  enteredCategory = '';
  enteredDuration = '';
  enteredImage = '';
  recipeservice = inject(recipeService)
  SelectedRecipe = this.recipeservice.SelectedRecipe;

  ngOnInit(){
    this.enteredRecipe = this.SelectedRecipe[0].name;
    this.enteredCategory = this.SelectedRecipe[0].category;
    this.enteredDuration = this.SelectedRecipe[0].duration;
    this.enteredMethod = this.SelectedRecipe[0].method;
  }
  cancel = output();
  formSubmit = output();
  

  private formdata = viewChild.required<NgForm>('form');

  OnSave(recipe:string, method:string,  category:string, duration:string){
    this.enteredRecipe = recipe;
    this.enteredMethod = method;
    this.enteredDuration = duration;
    this.enteredCategory = category;

    const editedRecipe:recipe = {
      id: this.SelectedRecipe[0].id,
      name:this.enteredRecipe,
      method:this.enteredMethod,
      category:this.enteredCategory,
      duration:this.enteredDuration,
      imageURL:this.SelectedRecipe[0].imageURL
    };
    this.formdata().form.reset();
    this.recipeservice.editRecipe(this.SelectedRecipe[0].id ,editedRecipe);
    this.formSubmit.emit();
  }

  OnCancel(){
    this.cancel.emit();
  }

}
