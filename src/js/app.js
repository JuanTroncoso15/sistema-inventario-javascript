(function () {
  const inventory = window.InventoryManager;
  const storage = window.InventoryStorage;

  const form = document.querySelector('#product-form');
  const tableBody = document.querySelector('#product-table-body');
  const searchInput = document.querySelector('#search-input');
  const totalProducts = document.querySelector('#total-products');
  const inventoryValue = document.querySelector('#inventory-value');
  const lowStockCount = document.querySelector('#low-stock-count');
  const cancelEditButton = document.querySelector('#cancel-edit');
  const submitButton = document.querySelector('#submit-btn');
  const toast = document.querySelector('#toast');

  const state = {
    products: storage.getProducts(),
    editingId: null
  };

  function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast visible ${type}`;
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      toast.className = 'toast';
    }, 2200);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  }

  function renderStats() {
    const total = inventory.getTotalProducts(state.products);
    const value = inventory.getTotalInventoryValue(state.products);
    const lowStock = inventory.getLowStockProducts(state.products).length;

    totalProducts.textContent = String(total);
    inventoryValue.textContent = formatCurrency(value);
    lowStockCount.textContent = String(lowStock);
  }

  function renderTable() {
    const query = inventory.normalizeText(searchInput.value);
    const visibleProducts = inventory.searchProducts(state.products, query);

    if (visibleProducts.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="7" class="empty-state">No hay productos que coincidan con la búsqueda.</td></tr>';
      return;
    }

    const rows = visibleProducts.map((product) => {
      const lowStock = Number(product.cantidad) <= 5;
      const rowClass = lowStock ? 'low-stock' : '';

      return `
        <tr class="${rowClass}">
          <td>${product.id}</td>
          <td>${product.nombre}</td>
          <td>${product.categoria}</td>
          <td>${formatCurrency(product.precio)}</td>
          <td>${product.cantidad}</td>
          <td>${product.fechaRegistro}</td>
          <td>
            <div class="actions">
              <button class="action-btn edit-btn" data-action="edit" data-id="${product.id}">Editar</button>
              <button class="action-btn delete-btn" data-action="delete" data-id="${product.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = rows.join('');
  }

  function refreshView() {
    renderStats();
    renderTable();
  }

  function resetForm() {
    form.reset();
    state.editingId = null;
    submitButton.textContent = 'Guardar producto';
    cancelEditButton.classList.add('hidden');
  }

  function fillForm(product) {
    document.querySelector('#product-name').value = product.nombre;
    document.querySelector('#product-category').value = product.categoria;
    document.querySelector('#product-price').value = product.precio;
    document.querySelector('#product-quantity').value = product.cantidad;
    state.editingId = product.id;
    submitButton.textContent = 'Actualizar producto';
    cancelEditButton.classList.remove('hidden');
  }

  function saveProducts() {
    storage.saveProducts(state.products);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      nombre: formData.get('nombre'),
      categoria: formData.get('categoria'),
      precio: formData.get('precio'),
      cantidad: formData.get('cantidad')
    };

    try {
      if (state.editingId !== null) {
        const updated = inventory.updateProduct(state.products, state.editingId, payload);
        const index = state.products.findIndex((product) => Number(product.id) === Number(state.editingId));
        state.products[index] = updated;
        showToast('Producto actualizado correctamente.', 'success');
      } else {
        const created = inventory.createProduct(state.products, payload);
        state.products.push(created);
        showToast('Producto registrado correctamente.', 'success');
      }

      saveProducts();
      resetForm();
      refreshView();
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  function handleTableAction(event) {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) {
      return;
    }

    const productId = Number(actionButton.dataset.id);
    const action = actionButton.dataset.action;

    if (action === 'delete') {
      const product = state.products.find((item) => Number(item.id) === productId);
      if (!product) {
        return;
      }

      state.products = inventory.deleteProduct(state.products, productId);
      saveProducts();
      refreshView();
      showToast(`Se eliminó ${product.nombre}.`, 'success');

      if (state.editingId === productId) {
        resetForm();
      }
      return;
    }

    if (action === 'edit') {
      const product = state.products.find((item) => Number(item.id) === productId);
      if (product) {
        fillForm(product);
      }
    }
  }

  function handleSearch(event) {
    renderTable();
  }

  function init() {
    form.addEventListener('submit', handleSubmit);
    searchInput.addEventListener('input', handleSearch);
    tableBody.addEventListener('click', handleTableAction);
    cancelEditButton.addEventListener('click', resetForm);
    refreshView();
  }

  init();
})();
