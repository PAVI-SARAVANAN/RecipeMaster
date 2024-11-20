import { AfterContentChecked, afterRender, Component, inject, output } from '@angular/core';
import { recipeService } from '../../shared/recipe.service';
import { recipes } from '../../shared/recipedata';

import type { recipe,recipeInput } from '../../shared/data.model';
import { NgFor } from '@angular/common';
import { ViewRecipeComponent } from "./view-recipe/view-recipe.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgFor, ViewRecipeComponent, ButtonComponent, EditRecipeComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements AfterContentChecked {
  recipeList:recipe[] = [];
  SelectedRecipe = output();
  ViewRecipe:boolean = false;
  EditRecipe:boolean = false;
  
  private recipeservice = inject(recipeService);
  ngAfterContentChecked() {
    this.recipeList = this.recipeservice.recipeData(); 
}
  OnDeleteRecipe(id:string){
    this.recipeservice.deleteRecipe(id);
 }
  OnSelectingRecipe(id:string){
    this.ViewRecipe = true;
    this.recipeservice.viewSelectedRecipe(id);
  }
  OnClosingRecipe(){
    this.ViewRecipe = false;
  }
  OnEditingRecipe(id:string){
    this.EditRecipe = true;
    this.recipeservice.viewSelectedRecipe(id);
  }
  OnEditing(){
    this.EditRecipe=false;
  }
  OnClosing(){
    this.EditRecipe = false;
  }
}
