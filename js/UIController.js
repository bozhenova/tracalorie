export default class UIController {
  constructor() {
    this.UISelectors = {
      itemList: '#item-list',
      listItems: '#item-list li',
      clearBtn: '.clear-btn',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
    };
  }

  updateItemsList(items) {
    let html = '';
    if (items.length) {
      items.forEach(
        item =>
          (html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`)
      );
    }

    document.querySelector(this.UISelectors.itemList).innerHTML = html;
  }

  getSelectors() {
    return this.UISelectors;
  }

  getItemInput() {
    return {
      name: document.querySelector(this.UISelectors.itemNameInput).value,
      calories: document.querySelector(this.UISelectors.itemCaloriesInput).value
    };
  }

  clearInput() {
    document.querySelector(this.UISelectors.itemNameInput).value = '';
    document.querySelector(this.UISelectors.itemCaloriesInput).value = '';
  }

  addItemToForm(currentItem) {
    document.querySelector(this.UISelectors.itemNameInput).value =
      currentItem.name;
    document.querySelector(this.UISelectors.itemCaloriesInput).value =
      currentItem.calories;
    this.showEditState();
  }

  hideList() {
    document.querySelector(this.UISelectors.itemList).style.display = 'none';
  }

  addListItem(item) {
    document.querySelector(this.UISelectors.itemList).style.display = 'block';
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.id = `item-${item.id}`;
    li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
    document
      .querySelector(this.UISelectors.itemList)
      .insertAdjacentElement('beforeend', li);
  }

  updateListItem(item) {
    let listItems = document.querySelectorAll(this.UISelectors.listItems);
    [...listItems].forEach(listItem => {
      const itemID = listItem.getAttribute('id');
      if (itemID === `item-${item.id}`) {
        document.querySelector(
          `#${itemID}`
        ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
      }
    });
  }

  deleteListItem(id) {
    const itemID = `#item-${id}`;
    const item = document.querySelector(itemID);
    if (!item.previousSibling && !item.nextSibling) {
      this.hideList();
    }
    item.remove();
  }

  clearEditState() {
    this.clearInput();

    document.querySelector(this.UISelectors.updateBtn).style.display = 'none';
    document.querySelector(this.UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(this.UISelectors.backBtn).style.display = 'none';
    document.querySelector(this.UISelectors.addBtn).style.display = 'inline';
  }

  showEditState() {
    document.querySelector(this.UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(this.UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(this.UISelectors.backBtn).style.display = 'inline';
    document.querySelector(this.UISelectors.addBtn).style.display = 'none';
  }

  showTotalCalories(totalCalories) {
    document.querySelector(
      this.UISelectors.totalCalories
    ).textContent = totalCalories;
  }
}
