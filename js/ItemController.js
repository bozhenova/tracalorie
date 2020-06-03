import { INITIAL_STATE } from './initialState';
import { Item } from './Item';

export default class ItemController {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
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
    debugger;
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
    const ids = this.state.items.map(item => {
      return item.id;
    });
    const index = ids.indexOf(id);
    this.state.items.splice(index, 1);
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
