import ItemController from './ItemController';
import UIController from './UIController';

export default class AppController {
  constructor() {
    this.itemController = new ItemController();
    this.items = this.itemController.getItems();
    this.uiController = new UIController();
    this.UISelectors = this.uiController.getSelectors();
  }

  init() {
    this.uiController.clearEditState();
    if (!this.items.length) {
      this.uiController.hideList();
    }
    this.uiController.updateItemsList(this.items);
    this.updateCalories();
    this.loadEventListeners();
  }

  loadEventListeners() {
    document
      .querySelector(this.UISelectors.addBtn)
      .addEventListener('click', e => {
        this.itemAddSubmit(e);
      });

    document.addEventListener('keypress', e => {
      const btn = document.querySelector(this.UISelectors.addBtn);
      if (e.code === 'Enter' && btn.style.display === 'none') {
        e.preventDefault();
      }
    });

    document
      .querySelector(this.UISelectors.itemList)
      .addEventListener('click', e => {
        this.itemEditClick(e);
      });

    document
      .querySelector(this.UISelectors.updateBtn)
      .addEventListener('click', e => {
        this.itemUpdateSubmit(e);
      });

    document
      .querySelector(this.UISelectors.backBtn)
      .addEventListener('click', e => {
        this.backButtonClick(e);
      });

    document
      .querySelector(this.UISelectors.deleteBtn)
      .addEventListener('click', e => {
        this.itemDeleteSubmit(e);
      });

    document
      .querySelector(this.UISelectors.clearBtn)
      .addEventListener('click', e => {
        this.clearAllItemsClick(e);
      });
  }

  backButtonClick(e) {
    e.preventDefault();
    this.uiController.clearEditState();
  }

  updateCalories() {
    const totalCalories = this.itemController.getTotalCalories();
    this.uiController.showTotalCalories(totalCalories);
  }

  itemAddSubmit(e) {
    e.preventDefault();

    const input = this.uiController.getItemInput();
    if (input.name && input.calories) {
      const newItem = this.itemController.addItem(input.name, input.calories);
      this.uiController.addListItem(newItem);
      this.uiController.clearInput();
    }
    this.updateCalories();
  }

  itemEditClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.closest('.collection-item').id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = this.itemController.getItemById(id);
      this.uiController.addItemToForm(itemToEdit);
      this.itemController.setCurrentItem(itemToEdit);
    }
  }

  itemUpdateSubmit(e) {
    e.preventDefault();

    const input = this.uiController.getItemInput();
    const updatedItem = this.itemController.updateItem(
      input.name,
      input.calories
    );
    this.uiController.updateListItem(updatedItem);
    this.updateOnChange();
  }

  itemDeleteSubmit(e) {
    e.preventDefault();

    const currentItem = this.itemController.getCurrentItem();
    this.itemController.deleteItem(currentItem.id);
    this.uiController.deleteListItem(currentItem.id);
    this.updateOnChange();
  }

  updateOnChange() {
    this.itemController.setCurrentItem(null);
    this.uiController.clearEditState();
    this.updateCalories();
  }

  clearAllItemsClick(e) {
    e.preventDefault();

    this.itemController.clearAllItems();
    const items = this.itemController.getItems();
    this.uiController.updateItemsList(items);
    this.uiController.hideList();
    this.updateCalories();
  }
}
