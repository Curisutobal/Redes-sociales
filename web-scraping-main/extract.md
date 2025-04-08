## Web Scraping

Es el proceso automatico de colectar información de un sitio de internet. Engloba el envío de una petición HTTP, descargar el HTML de la página, y luego transformar la información para obtener lo deseado

### Porqué scrapear

Colectar datos.

- Búsqueda de mercado: Monitorizar precios
- Información de contacto: Obtener información de posibles clientes
- Analisis de datos financieros: Obtener precios, indicadores economicos, etc.
- Búsqueda academica: Obtener información de estudios en varios campos.

### El proceso

1. Enviar solicitud HTTP.
2. Recibir respuesta HTTP
3. Transformar HTML
4. Extraer data
5. Guardar data

### Condiciones legales y éticas

- Checkear el archivo robot.txt, por ejemplo facebook: https://www.facebook.com/robots.txt
- Respetar limites de peticiones: No hacer muchas peticiones buscando sobrecargar los servidores
- Revisar los terminos de servicio
- Tener cuidado con el copyright: No hay que republicar información sin permisos

### Entendiendo la tecnología web

#### HTML y CSS

##### Conceptos claves HTML

1. Elementos: Un documento html esta conformado por elementos que son representados por etiquetas:

```
<p>This is a paragraph.</p>
```

2. Atributos: Los elementos pueden tener atributos adicionales:

```
<a href="https://example.com">This is a link.</a>
```

3. Estructura del documento

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<h1>This is a title.</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

4. HTML Semantico: Utilizar apropiadamente los elementos HTML

### Conceptos claves CSS

Utilizado para describir la presentación del documento. En web-scraping nos sirve para encontrar elementos.

1. Selectors: son utilizados para apuntar a un elemento especifico de HTML.

```
p {
  color: blue;
}

```

2. CSS Box model: Todo elemento en diseño web es una caja rentagular. El CSS box model describe cómo se generan y estructuran esas cajas rectangulares, permitiendo controlar su tamaño, espacio interno y externo, y bordes.

3. Diseño responsivo: CSS es utilizado para crear moldes que se adapten a diferentes tamaños de pantalla.

### DOM

Representa la estructura de un documento como un arbol jerarquico de objetos, donde cada objeto representa una parte de un documento.

- Node tree: El dom representa un documento como un arbol donde cada nodo es un objeto que representa una parte del dom.
- Element nodes: Representa los elementos HTML
- Text Nodes: Representan texto dentro de los elementos html
- Nodos atributos: Representan atributos en elementos HTML

Entender el DOM es crucial para el web scraping

1. Navegación: El DOM permite navegar a través de toda la estructura del documento, desde el padre al hijo y vice versa.
2. Selección: Se pueden utilizar métodos para seleccionar elementos especificos
3. Manipulación: No es típico en scrapping, pero es útil para entender las páginas dinámicas.
4. Manejador de eventos: El DOM incluye un modelo de eventos, el cuál es importante para entender como la interacción puede cambiar en la página

### JS en el navegador

#### El Objeto global 'Ventana'

- window.document -> Refiere al DOM de la página activa
- window.location -> Proporcionar información de la url activa
- window.history -> permite manipular el historial del navegador
- window.localStorage y windows.sessionStorage: Para el almacenamiento del lado del cliente

#### El objeto documento

- document.getElementById(id)
- document.getElementByClassName(name)
- document.getElementByTagName(name)
- document.querySelector(cssSelector)
- document.querySelectorAll(cssSelector)

#### Same-Origin Policy y CORS

El navegador implementa medidas de seguridad que pueden afectar el web-scraping

- Same-origin Policy: Por defecto, las páginas web solo pueden hacer solicitudes desde el mismo dominio que provienen
- CORS: Mecanismos que permite a muchos recursos en una página web ser solicitados por otro dominio

#### BROWSER Developer Tools

Los navegadores modernos vienen con una herramienta muy buena de "herramientas de desarrollador"

1. Elements Panel: Inspecciona y manipula el DOM y CSS
2. Console
3. Panel de red
4. Panel de fuente

#### Trabajando con contenido dinámico

1. Esperar por los elementos: Usar técnicas para esperar que un contenido especifico aparezca antes de scrapear
2. Interceptar las solicitudes de la RED
3. Simular interacciones de usuario

## Introducción al renderizado de la WEB

Proceso en el que un navegador interpreta y muestra una página web en la pantalla del usuario. Esto implica convertir el código en la estructura visual e interactiva que vemos cuando visitamos un sitio web.

El renderizado puede ocurrir de diferentes formas:

- En el servidor antes de enviarlo al cliente (SSR - Server-Side Rendering).
- En el cliente (navegador) después de recibir la página básica (CSR - Client-Side Rendering).
- De manera mixta con generación estática o incremental (SSG e ISR).
