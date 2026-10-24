# Entregable Semana 1 - Sistema de Inventario Básico

## Objetivo

Desarrollar un sistema de inventario básico con JavaScript para registrar, consultar, editar y eliminar productos, aplicando almacenamiento local con `localStorage` y pruebas automatizadas con Node.js.

## Funcionalidades principales

- Registro de productos con nombre, categoría, precio y cantidad.
- Visualización de productos en tabla.
- Búsqueda por nombre o categoría.
- Edición y eliminación de registros.
- Cálculo automático del valor total del inventario.
- Notificación de productos con pocas existencias.
- Validaciones para evitar nombres vacíos, precios negativos y cantidades negativas.

## Estructura del proyecto

- `src/index.html`: interfaz de usuario.
- `src/css/styles.css`: estilos del sistema.
- `src/js/inventario.js`: lógica de negocio del inventario.
- `src/js/storage.js`: persistencia local con `localStorage`.
- `src/js/app.js`: conexión entre lógica y elementos del DOM.
- `tests/inventario.test.js`: pruebas automatizadas.
- `.github/workflows/ci.yml`: configuración de integración continua.

## Cómo probarlo

1. Instalar dependencias con `npm install`.
2. Ejecutar `npm start`.
3. Abrir la dirección local mostrada en el navegador.
4. Ejecutar `npm test` para validar la lógica de negocio.

## Observaciones

Este proyecto está desarrollado sin servicios de pago y usa almacenamiento local del navegador para una simulación realista del inventario.
