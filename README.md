# E-Commerce TechForge - Base de Datos NoSQL (Entregable 1)

**Institución:** Instituto Politécnico Nacional (IPN) - UPIICSA  
**Carrera:** Licenciatura en Ciencias de la Informática  
**Unidad de Aprendizaje:** Bases de Datos No SQL  
**Secuencia:** 6CM68  
**Profesor:** Entzana Garduño Yventz  

### Integrantes del Equipo:
* Gutiérrez Díaz Rubén Agustín
* Lorenzo Cruz Victor David
* Melo Manriquez Dante Isaias
* Soriano Nieva Miguel

---

## Descripción de la Base de Datos
Este repositorio contiene el diseño e implementación del modelo de datos documental polimórfico en **MongoDB** para la plataforma **TechForge** (comercio electrónico especializado en componentes de PC, periféricos y accesorios de hardware).

### Características Implementadas:
1. **Modelo Polimórfico (`productos`):** Uso de un subdocumento dinámico `especificaciones` que adapta los atributos técnicos según la categoría del artículo sin generar valores nulos ni esquemas rígidos.
2. **Soporte para Baja Lógica:** Incorporación del atributo booleano `activo` para operaciones de desactivación lógica.
3. **Validación Híbrida (`$jsonSchema`):** Garantiza la integridad de los datos comerciales obligatorios (`sku`, `nombre`, `precio`, `stock`) manteniendo la flexibilidad en las especificaciones técnicas.
4. **Optimización de Consultas Masivas (Índices):**
   * Índice Único en `sku`.
   * Índice Compuesto para filtros facetados (`activo`, `categoria`, `subcategoria`, `marca`, `precio`).
   * Índice de Texto (`text`) para búsquedas rápidas en barra de búsqueda.
   * Índice Comodín (`Wildcard Index` en `especificaciones.$**`) para acelerar consultas sobre atributos polimórficos.

---

## Estructura del Repositorio
* `/data/categorias.json`: Colección base de categorías, subcategorías y definición de filtros frecuentes.
* `/data/productos.json`: Origen de datos en formato JSON para la ingesta por carga masiva del catálogo polimórfico.
* `/scripts/init_techforge.js`: Script de inicialización para `mongosh` que crea la base de datos `techforge_db`, aplica las reglas de validación y construye los índices.

## Instrucciones de Despliegue Local
1. Ejecutar el script de inicialización en `mongosh`:
   ```bash
   mongosh < scripts/init_techforge.js