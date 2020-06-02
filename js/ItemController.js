import { INITIAL_STATE } from './initialState';
import { Item } from './Item';

export default class ItemController {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  logData() {
    console.log(this.state);
  }
  getItems() {
    return this.state.items;
  }

  getTotalCalories() {
    let total = 0;
    this.state.items.forEach(item => (total += item.calories));
    this.state.totalCalories = total;
    return this.state.totalCalories;
  }

  addItem(name, calories) {
    let ID;
    if (this.state.items.length) {
      ID = this.state.items[this.state.items.length - 1].id + 1;
    } else {
      ID = 0;
    }
    calories = parseInt(calories);
    const newItem = new Item(ID, name, calories);
    this.state.items.push(newItem);
    return newItem;
  }

  setCurrentItem(item) {
    this.state.currentItem = item;
  }

  getCurrentItem() {
    return this.state.currentItem;
  }

  updateItem(name, calories) {
    let found = null;
    this.state.items.forEach(item => {
      if (item.id === this.state.currentItem.id) {
        item.name = name;
        item.calories = parseInt(calories);
        found = item;
      }
    });
    return found;
  }

  deleteItem(id) {
    this.state.items.splice(id, 1);
  }

  clearAllItems() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  getItemById(id) {
    let found = null;
    this.state.items.forEach(item => {
      if (item.id === id) {
        found = item;
      }
    });
    return found;
  }
}
