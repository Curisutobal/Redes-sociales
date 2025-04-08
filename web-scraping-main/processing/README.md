### Web scraping example

1. Descargar el proyecto
2. Situarse en la carpeta example
3. Escribir en consola `npm install`
4. Escribir en consola `npm run dev`

## Interpretar HTML

### Transformar información

- Tenemos el siguiente HTML

```
<tr>
    <td><strong>Región:</strong></td>
    <td>DE LA ARAUCANÍA</td>
</tr>
<tr>
    <td><strong>Provincia:</strong></td>
    <td>MALLECO</td>
</tr>
<tr>
    <td><strong>Rut:</strong></td>
    <td>69.180.100-4</td>
</tr>
<tr>
    <td><strong>Dirección:</strong></td>
    <td>Caupolicán Nº 509</td>
</tr>
```

- Para poder analizar la información queremos que quede de esta manera

```
{
    "region": "de la araucanía",
    "provincia": "MALLECO",
    "rut": "69.180.100-4",
    "direccion": "Caupolicán Nº 509"
}
```

### Cheerio

Librería Rápida, flexible y elegante para transformar y manipular HTML y XML

- https://cheerio.js.org/docs/intro

- Instalación: `npm install cheerio`
- Importación: `import * as cheerio from 'cheerio';`

#### Ejemplo de utilización

```
// Cargar el HTML y guardar en la constante "$"
const $ = cheerio.load('<h2 class="title">Hello world</h2>');
```

- Una vez cargado el documento podemos seleccionar elementos.
- Si queremos obtener el contenido que está dentro del 'h2'.

```
let titulo = $('h2.title').text();
```
