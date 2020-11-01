import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list/shoppingList.service';

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('test',
            'this is test',
            'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
            [
                new Ingredient('Chesse', 1),
                new Ingredient('Flour', 1),
                new Ingredient('Tomato', 4)
            ]),
        new Recipe('test1',
            'this is test1',
            'https://images.immediate.co.uk/production/volatile/sites/2/2016/02/20501.jpg?quality=90&crop=1px%2C328px%2C597px%2C257px&resize=597%2C254',
            [
                new Ingredient('Test', 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipeToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.onIngredientsAdded(ingredients);
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(id: number, newRecipe: Recipe){
        this.recipes[id] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number){
        this.recipes.splice(id, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}

