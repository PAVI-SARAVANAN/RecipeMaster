import { Injectable, input, signal } from "@angular/core";

import type { recipe,recipeInput } from "./data.model";
import { recipes } from "./recipedata";


@Injectable({
    providedIn: "root"
})

export class recipeService{
     recipeData = signal(recipes);
     allrecipes = this.recipeData.asReadonly;
     SelectedRecipe:recipe[] = [];

   addRecipe(addedRecipe:recipeInput){
     const currentRecipe = this.recipeData();
     const newRecipe:recipe = {
        ...addedRecipe,
        id: ((currentRecipe.length) + 1 ).toString()
     }
     this.recipeData.update((oldRecipe)=> [...oldRecipe, newRecipe]);
   }
   editRecipe(id:string, editedRecipe:recipe){
     const recipeDataCopy = this.recipeData();
     const index = recipeDataCopy.findIndex((updatedRecipe) => (updatedRecipe.id === id))
     if(index !== -1){
       recipeDataCopy[index] = editedRecipe;
     }
     this.recipeData.set(recipeDataCopy);
   }
   deleteRecipe(id:string){
      this.recipeData.update((recipesData) => recipesData.filter((recipedata) => (recipedata.id !== id)) );
   }
   viewSelectedRecipe(id:string){
      const recipeDataCopy = this.recipeData();
      this.SelectedRecipe = recipeDataCopy.filter((selectedRecipe) => (selectedRecipe.id === id));       
   }

}