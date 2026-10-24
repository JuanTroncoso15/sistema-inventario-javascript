(function (global) {
  const DEFAULT_THRESHOLD = 5;

  function normalizeText(value) {
    return String(value ?? '').trim();
  }

  function parseNumber(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : Number.NaN;
  }

  function hasDuplicateName(products, currentName, currentId) {
    const normalizedName = normalizeText(currentName).toLowerCase();

    return products.some((product) => {
      const sameName = normalizeText(product.nombre).toLowerCase() === normalizedName;
      return sameName && product.id !== currentId;
    });
  }

  function validateProduct(data, products, currentId = null) {
    const name = normalizeText(data.nombre);
    const rawPrice = parseNumber(data.precio);
    const rawQuantity = parseNumber(data.cantidad);

    if (!name) {
      throw new Error('El nombre del producto es obligatorio.');
    }

    if (hasDuplicateName(products, name, currentId)) {
      throw new Error('Ya existe un producto con ese nombre.');
    }

    if (!Number.isFinite(rawPrice) || rawPrice < 0) {
      throw new Error('El precio debe ser un número válido y no negativo.');
    }

    if (!Number.isFinite(rawQuantity) || rawQuantity < 0) {
      throw new Error('La cantidad debe ser un número válido y no negativa.');
    }

    return {
      nombre: name,
      categoria: normalizeText(data.categoria) || 'General',
      precio: Number(rawPrice.toFixed(2)),
      cantidad: Number(rawQuantity),
      fechaRegistro: normalizeText(data.fechaRegistro) || new Date().toISOString().slice(0, 10)
    };
  }

  function createProduct(products, productData) {
    const normalized = validateProduct(productData, products);
    const nextId = products.length === 0 ? 1 : Math.max(...products.map((product) => Number(product.id) || 0)) + 1;

    return {
      id: nextId,
      ...normalized
    };
  }

  function updateProduct(products, productId, productData) {
    const productIndex = products.findIndex((product) => Number(product.id) === Number(productId));

    if (productIndex === -1) {
      throw new Error('No se encontró el producto a actualizar.');
    }

    const product = products[productIndex];
    const normalized = validateProduct({
      ...product,
      ...productData
    }, products, Number(productId));

    return {
      ...product,
      ...normalized,
      id: Number(product.id)
    };
  }

  function deleteProduct(products, productId) {
    return products.filter((product) => Number(product.id) !== Number(productId));
  }

  function searchProducts(products, query) {
    const searchTerm = normalizeText(query).toLowerCase();

    if (!searchTerm) {
      return [...products];
    }

    return products.filter((product) => {
      const haystack = `${product.nombre} ${product.categoria}`.toLowerCase();
      return haystack.includes(searchTerm);
    });
  }

  function getTotalInventoryValue(products) {
    return products.reduce((total, product) => total + product.precio * product.cantidad, 0);
  }

  function getTotalProducts(products) {
    return products.length;
  }

  function getLowStockProducts(products, threshold = DEFAULT_THRESHOLD) {
    return products.filter((product) => Number(product.cantidad) <= Number(threshold));
  }

  const inventory = {
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getTotalInventoryValue,
    getTotalProducts,
    getLowStockProducts,
    validateProduct,
    normalizeText
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = inventory;
  }

  global.InventoryManager = inventory;
})(typeof window !== 'undefined' ? window : globalThis);
