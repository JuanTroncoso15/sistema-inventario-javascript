const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
  getTotalInventoryValue,
  getLowStockProducts,
  validateProduct
} = require('../src/js/inventario.js');

function buildProducts() {
  return [
    { id: 1, nombre: 'Teclado', categoria: 'Tecnología', precio: 1500, cantidad: 8, fechaRegistro: '2026-10-01' },
    { id: 2, nombre: 'Mouse', categoria: 'Tecnología', precio: 900, cantidad: 3, fechaRegistro: '2026-10-02' },
    { id: 3, nombre: 'Monitor', categoria: 'Periféricos', precio: 4500, cantidad: 10, fechaRegistro: '2026-10-03' }
  ];
}

test('debe agregar un producto con datos válidos', () => {
  const products = buildProducts();
  const created = createProduct(products, { nombre: 'Impresora', categoria: 'Oficina', precio: 3200, cantidad: 4 });

  assert.equal(created.nombre, 'Impresora');
  assert.equal(created.precio, 3200);
  assert.equal(created.cantidad, 4);
  assert.equal(products.length + 1, products.concat(created).length);
});

test('debe eliminar un producto por su id', () => {
  const products = buildProducts();
  const result = deleteProduct(products, 2);

  assert.equal(result.length, 2);
  assert.equal(result.some((product) => product.id === 2), false);
});

test('debe actualizar un producto existente', () => {
  const products = buildProducts();
  const updated = updateProduct(products, 1, { nombre: 'Teclado gamer', categoria: 'Tecnología', precio: 1800, cantidad: 12 });

  assert.equal(updated.nombre, 'Teclado gamer');
  assert.equal(updated.precio, 1800);
  assert.equal(updated.cantidad, 12);
});

test('debe calcular correctamente el valor total del inventario', () => {
  const products = buildProducts();
  const total = getTotalInventoryValue(products);

  assert.equal(total, 1500 * 8 + 900 * 3 + 4500 * 10);
});

test('no debe aceptar cantidades negativas', () => {
  assert.throws(() => {
    validateProduct({ nombre: 'Cable HDMI', categoria: 'Accesorios', precio: 200, cantidad: -1 }, []);
  }, /cantidad/i);
});

test('no debe aceptar precios negativos', () => {
  assert.throws(() => {
    validateProduct({ nombre: 'Cable USB', categoria: 'Accesorios', precio: -50, cantidad: 2 }, []);
  }, /precio/i);
});

test('debe permitir buscar productos por nombre o categoría', () => {
  const products = buildProducts();
  const result = searchProducts(products, 'tec');

  assert.equal(result.length, 2);
  assert.ok(result.every((product) => product.nombre.toLowerCase().includes('tec') || product.categoria.toLowerCase().includes('tec')));
});

test('debe identificar productos con pocas existencias', () => {
  const products = buildProducts();
  const lowStock = getLowStockProducts(products, 5);

  assert.equal(lowStock.length, 1);
  assert.equal(lowStock[0].nombre, 'Mouse');
});
