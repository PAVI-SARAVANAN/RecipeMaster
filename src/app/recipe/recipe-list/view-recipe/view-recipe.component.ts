import { Component, inject, output } from '@angular/core';

import { recipeService } from '../../../shared/recipe.service';
import { ButtonComponent } from "../../../shared/button/button.component";

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeservice = inject(recipeService);

  SelectedRecipe = this.recipeservice.SelectedRecipe;
  Close = output();

  OnCloseRecipe(){
    this.Close.emit();
  }

}
