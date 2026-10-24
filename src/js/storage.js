(function (global) {
  const STORAGE_KEY = 'inventario.productos';

  function getProducts() {
    try {
      const products = localStorage.getItem(STORAGE_KEY);
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('No se pudieron leer los productos guardados:', error);
      return [];
    }
  }

  function saveProducts(products) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return true;
    } catch (error) {
      console.error('No se pudieron guardar los productos:', error);
      return false;
    }
  }

  const storageApi = {
    STORAGE_KEY,
    getProducts,
    saveProducts
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = storageApi;
  }

  global.InventoryStorage = storageApi;
})(typeof window !== 'undefined' ? window : globalThis);
