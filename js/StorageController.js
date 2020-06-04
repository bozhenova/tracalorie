export default class StorageController {
  storeItem(item) {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
  }

  getItemsFromStorage() {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
  }

  updateItemStorage(updatedItem) {
    let items = JSON.parse(localStorage.getItem('items'));

    items.forEach((item, index) => {
      if (updatedItem.id === item.id) {
        items.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  }

  deleteItemFromStorage(id) {
    let items = JSON.parse(localStorage.getItem('items'));
    items.forEach((item, index) => {
      if (id === item.id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  }

  clearItemsFromStorage() {
    localStorage.removeItem('items');
  }
}
