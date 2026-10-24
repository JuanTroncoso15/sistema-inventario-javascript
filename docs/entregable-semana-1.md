# Entregable Semana 1 - Sistema de Inventario Básico

## Datos generales

- Nombre del proyecto: Sistema de Inventario Básico con JavaScript
- Repositorio GitHub: https://github.com/JuanTroncoso15/sistema-inventario-javascript
- Estado del proyecto: finalizado y validado localmente
- Integración continua: configurada con GitHub Actions y ejecutada correctamente

## Objetivo

Desarrollar un sistema simple, funcional y visualmente moderno para gestionar un inventario de productos con JavaScript, usando almacenamiento local en el navegador y validaciones para evitar datos incorrectos.

## Tecnologías utilizadas

- JavaScript
- HTML5
- CSS3
- Node.js
- Git
- GitHub
- GitHub Actions
- localStorage

## Funcionalidades implementadas

1. Registro de productos.
2. Visualización de todos los productos almacenados.
3. Búsqueda por nombre y categoría.
4. Edición de productos existentes.
5. Eliminación de registros.
6. Registro de cantidades disponibles.
7. Registro de precios.
8. Cálculo automático del valor total del inventario.
9. Cálculo del número total de productos.
10. Identificación de productos con pocas existencias.
11. Validaciones para evitar:
    - nombres vacíos
    - precios negativos
    - cantidades negativas
    - registros duplicados
    - datos inválidos

## Estructura del proyecto

- `src/index.html`: interfaz principal.
- `src/css/styles.css`: diseño responsivo en colores azul, blanco y gris.
- `src/js/inventario.js`: lógica del negocio del inventario.
- `src/js/storage.js`: almacenamiento con `localStorage`.
- `src/js/app.js`: conexión entre la interfaz y la lógica.
- `tests/inventario.test.js`: pruebas automatizadas.
- `.github/workflows/ci.yml`: integración continua.
- `README.md`: documentación de uso.
- `docs/entregable-semana-1.md`: documento final del entregable.

## Requisitos

- Node.js 20 o superior
- npm
- navegador moderno

## Instalación

```bash
cd sistema-inventario-javascript
npm install
```

## Ejecución local

```bash
npm start
```

El sistema queda disponible en:

```text
http://localhost:8080
```

## Pruebas automatizadas

Se crearon pruebas con Node.js para verificar:

- registro de productos
- eliminación
- actualización
- cálculo del valor del inventario
- validación de cantidades negativas
- validación de precios negativos
- búsqueda de productos

Comando:

```bash
npm test
```

Resultado verificado: 8 pruebas exitosas.

## Verificación de sintaxis

```bash
npm run check
```

## Integración continua

El archivo `.github/workflows/ci.yml` ejecuta automáticamente:

- instalación de dependencias con `npm ci`
- verificación de sintaxis
- ejecución de pruebas
- validación final

El workflow fue ejecutado en GitHub Actions y terminó con resultado correcto.

## Observaciones finales

El proyecto está desarrollado sin servicios de pago y cumple con los requisitos de la preparación del entorno para desarrollo e integración continua. Se utilizó almacenamiento local del navegador para mantener la lógica simple y didáctica, además de permitir pruebas automatizadas separadas de la interfaz.
