import { Component, output } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RecipeListComponent,NewRecipeComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
    AddRecipe:boolean = false;

    OnClick(){
      this.AddRecipe = true;
   } 
   OnCancel() {
    this.AddRecipe = false;

   }
   OnFormSubmit(){
    this.AddRecipe = false;
   }


}
