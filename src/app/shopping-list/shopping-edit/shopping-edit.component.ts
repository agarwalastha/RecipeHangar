import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editShoppingItemSub: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editShoppingItemSub = this.shoppingListService.editShoppingItemIndex
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredientByIndex(index);
        this.form.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredientByIndex(this.editedItemIndex, ingredient);
    }
    else {
      this.shoppingListService.onIngredientAdded(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredientByIndex(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editShoppingItemSub.unsubscribe();
  }

}
