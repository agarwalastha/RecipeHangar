import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsAddedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsAddedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (value: Ingredient[]) => this.ingredients = value
    )
  }

  onEditItem(index: number) {
    this.shoppingListService.editShoppingItemIndex.next(index);
  }

  ngOnDestroy() {
    this.ingredientsAddedSub.unsubscribe();
  }


}
