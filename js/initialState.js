import StorageController from './StorageController';

const storage = new StorageController();

export const INITIAL_STATE = Object.freeze({
  items: storage.getItemsFromStorage(),
  currentItem: null,
  totalCalories: 0
});
