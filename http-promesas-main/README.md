## U2

### ¿Qué es una API? - Imaginemos una máquina de bebidas

Una API funciona como una máquina exprendedora de bebidas

- Tu eliges el producto (presionas un botón)
- La máquina procesa el pedido
- La máquina te da la bebida

No vemos cómo funciona por dentro, solo debemos usar los botones correctos.

- Estos botones son como los métodos de una API

### ¿Cómo se usa una API en programación?

Una API es una manera de pedirle algo a otro programa, como si le dijeras:

- Hola, necesito los datos del tiempo de hoy
- Por favor guarda esta nueva tarea en mi lista

### Métodos más comunes de una API

Los métodos son acciones simples

| Método | Acción                   | Ejemplo diario                      |
| ------ | ------------------------ | ----------------------------------- |
| GET    | Pedir información        | “Muéstrame las tareas de hoy”       |
| POST   | Enviar nueva información | “Agrega una tarea nueva”            |
| PUT    | Cambiar algo existente   | “Actualiza el título de esta tarea” |
| DELETE | Quitar algo              | “Borra esta tarea que ya hice”      |

### ¿Qué es HTTP?

Es un protocolo que usa la web para comunicars. Es como el idioma que habla el navegador, las aplicaciones y los servidores para pedir y enviar información

Visitar esta pagina: https://pokeapi.co/

### ¿Qué hace HTTP?

HTTP define cómo se hace una solicitud (request) y cómo se recibe una respuesta(response).

- API + HTTP = comunicación estructurada entre tú y un servidor

### Estructura de una solicitud HTTP (Request)

| Parte         | ¿Qué hace?                                 | Ejemplo                        |
| ------------- | ------------------------------------------ | ------------------------------ |
| Método        | Acción que quieres hacer                   | GET, POST, etc.                |
| URL           | A dónde va la solicitud                    | /usuarios/1                    |
| Headers       | Información extra (idioma, tipo de datos)  | Content-Type: application/json |
| Body (cuerpo) | Datos que mandas (solo en POST, PUT, etc.) | { "nombre": "Ana" }            |

### Respuesta HTTP

Cuando haces una solicitud, el servidor te responde con:

| Parte            | ¿Qué contiene?                        | Ejemplo                          |
| ---------------- | ------------------------------------- | -------------------------------- |
| Código de estado | Resultado de tu solicitud             | 200 OK, 404 Not Found, 500 Error |
| Headers          | Datos extra (tipo de contenido, etc.) | Content-Type: application/json   |
| Body             | Los datos que pediste (si hay)        | { "nombre": "Ana", "edad": 21 }  |

### Códigos de estado más comunes

| Código                    | Significado        | ¿Qué pasó?               |
| ------------------------- | ------------------ | ------------------------ |
| 200 OK                    | Todo bien          | La solicitud fue exitosa |
| 201 Created               | Creado Algo        | nuevo fue creado         |
| 400 Bad Request           | Error del cliente  | Faltan datos o están mal |
| 401 Unauthorized          | No autorizado      | Necesitas iniciar sesión |
| 404 Not Found             | No encontrado      | Lo que buscas no existe  |
| 500 Internal Server Error | Error del servidor | Algo falló en el sistema |

### Creación del proyecto

1. `npm init --yes`
2. Crear carpeta src
3. Crear archivo `.gitignore`

- Este archivo sirve para que cuando subamos código a github (algún sistema de control de version en la nube) ignore algunos archivos que no queremos que se les haga seguimiento (por ejemplo los node_modules)

4. Crear archivo `app.js` en la carpeta src

- Al archivo le agregamos una línea como esta `console.log("Hola mundo")`

5. Modificamos el archivo `package.json` en el apartado de `scripts` debajo de `test` y pegamos

```
"dev": "node --watch src/app.js"
```

6. Modificamos el archivo `package.json` debajo de `name` y pegamos

```
 "type": "module",
```

### Usar Fetch API en Node.js

En Node.js, también podemos hacer peticiones HTTP usando la Fetch API, al igual que en el navegador.

```
fetch(url);

```

Sin embargo, fetch no devuelve el resultado de forma inmediata. En su lugar, devuelve una promesa, lo que significa que debemos esperar a que se resuelva para acceder a los datos.

Para trabajar cómodamente con promesas, usamos las palabras clave async y await:

- **async**: se coloca antes de una función para indicar que es asíncrona.
- **await**: se usa dentro de una función async para esperar el resultado de una promesa.

#### Ejemplo básico

```
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}

getData();
```

### import, exports

Cuando nuestro proyecto crece, es buena práctica dividir el código en varios archivos o carpetas. Cada archivo puede funcionar como un módulo que exporta funciones, objetos o valores.

Para hacer esto, usamos:

- **export**: para hacer accesible una función o variable desde otro archivo.
- **import**: para traer esa función o variable a otro archivo.

#### Ejemplo

```
//utils.js
export function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

//main.js
import { saludar } from './utils.js';

console.log(saludar('Mundo'));
```

### Ejemplo práctico

- Usar fetch con `https://pokeapi.co/api/v2/pokemon/ditto` y imprimir resultado
- Exportar función
- Importar función en el archivo `app.js`, ejecutar y imprimir el resultado

### Excepciones

Una excepción es un error que ocurre mientras se ejecuta el programa. Cuando JavaScript encuentra un problema que no puede resolver (por ejemplo, intentar leer un archivo que no existe), detiene la ejecución y lanza un mensaje de error.

Esto se llama "lanzar una excepción".

### ¿Por qué usamos excepciones?

Imaginemos que hacemos una función que intenta leer un archivo:

```
const data = readFile('archivo.json');
```

Si no hay forma de atrapar ese error, tu programa se detiene.
Para evitar eso, usamos try y catch.

```
try {
  const json = '{ "nombre": "Pikachu" ';
  // Error
  const data = JSON.parse(json);
  console.log(data.nombre);
} catch (err) {
  console.log('Ocurrió un error al parsear JSON:', err.message);
}
```

JSON.parse lanza una excepción si el texto no es válido. Con try/catch podemos evitar que el programa se rompa y mostrar un mensaje útil.

- Probar que sucede si no utilizan try - catch

### npm

Es el gestor de paquetes de Javascript que permite instalar, actualziar y eliminar librerías.
Para instalar una librería debemos escribir `npm i <nombre_libreria>`

#### Ejemplo

1. Visitar `https://www.npmjs.com/package/qrcode`
2. Instalar paquete qrcode
3. Generar un QR
4. Mejorar la creación de QRs

### Tareas

1.

- Hacer un Fetch a: https://pokeapi.co/api/v2/pokemon-species
- Con el resultado hacer un fetch a next
- Unir los resultados de las dos peticiones y imprimir en consola

2.

- Hacer fetch a la url que se encuentra en el primer resultado de la petición `https://pokeapi.co/api/v2/pokemon-species`
- Guardar un archivo con el nombre el pokemon y dentro la información sobre el pokemon
- Leer el archivo guardado y imprimir en consola
- Para guardar el archivo revisar este enlace (https://www.freecodecamp.org/news/how-to-read-and-write-files-with-nodejs/)

3.

- Hacer un fetch a la URL https://pokeapi.co/api/v2/pokemon?limit=5 para obtener los primeros 5 Pokémon
- Obtener la información de cada Pokémon (como su nombre, habilidades y estadísticas) de los resultados.
- Guardar esta información en un archivo JSON llamado pokemons.json.

### Creación de API

Volviendo al ejemplo de las Bebidas podríamos simular uno nosotros.

Para crear nuestra API existe un módulo muy utilizado que nos facilitará el trabajo, para esto debemos visitar:
https://www.npmjs.com/package/express

A continuación, planteamos algunos escenarios para nuestra API:

Si asumimos el rol de la persona dueña de la máquina, queremos poder agregar bebidas y llenar el inventario. Para realizar esta tarea, y siguiendo la convención de estandarización de las APIs, debemos usar el método POST, que se utiliza para crear o registrar un recurso.

- En este caso, el registro de una bebida solo requerirá el nombre de la bebida.

Cuando un usuario desea comprar una bebida en la máquina expendedora, primero necesita ver qué opciones están disponibles. Por esta razón, debe existir una petición que permita obtener todas las bebidas disponibles.

- Esta petición se realiza utilizando el método GET, el cual se usa para consultar o leer recursos.

En caso de un mal etiquetado, será necesario cambiar el nombre de una bebida. Por lo tanto, debemos implementar una funcionalidad que permita modificar el nombre de una bebida existente.

- Para esto utilizaremos el método PUT o PATCH, comúnmente usados para actualizar recursos.

Finalmente, cuando una bebida es comprada, debería eliminarse del inventario.

- Para esto, implementaremos el método DELETE, que se encarga de eliminar un recurso.

### Ejemplo Creación de QR

```
  app.post("/qr", (req, res) => {
    const { url } = req.body;

    try {
      res.setHeader("Content-Type", "image/png");

      qr.toFileStream(res, url, {
        type: "png",
        errorCorrectionLevel: "H",
        width: 300,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al generar el QR");
    }
  });

```

### Tarea

- Hasta ahora las botellas de la máquina exprendedora solo tienen un nombre, por esta razón deben hacer lo siguiente
  - Cada Objeto tendrá un precio y una cantidad de existencias
  - Al momento de actualizar, se podrán actualizar tanto el precio, como el nombre
  - Si se "compra una bebida" deben bajar las existencias, en caso de quedar en 0 se elimina el producto
