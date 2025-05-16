const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Directorio donde están guardadas las fichas HTML descargadas
const FICHAS_DIR = './fichas_html';
// Directorio donde se guardarán los archivos JSON resultantes
const OUTPUT_DIR = './fichas_json';
// Archivo donde se guardará el JSON consolidado con todas las comunas
const CONSOLIDADO_FILE = path.join(OUTPUT_DIR, 'todas_comunas.json');

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función principal que procesa todas las fichas
function procesarTodasLasFichas() {
  const archivos = fs.readdirSync(FICHAS_DIR)
    .filter(archivo => archivo.endsWith('.html'));
  
  console.log(`Procesando ${archivos.length} fichas comunales...`);
  
  const comunasProcesadas = [];
  const todasLasComunas = []; // Array para guardar todos los datos de comunas
  
  for (const archivo of archivos) {
    try {
      // Procesar la ficha y obtener los datos
      const rutaArchivo = path.join(FICHAS_DIR, archivo);
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      const $ = cheerio.load(contenido);
      
      // Objeto donde guardaremos la información de la comuna
      const datosFicha = {
        nombreComuna: '',
        provincia: '',
        direccion: '',
        alcalde: '',
        superficie: '',
        poblacion: ''
      };
      
      // Extraer el nombre de la comuna (está en el primer h1)
      datosFicha.nombreComuna = $('h1').first().text().trim();
      
      // Extraer la provincia de la comuna
      $('tr').each((i, row) => {
        const celdas = $(row).find('td');
        if (celdas.length >= 2) {
          const clave = $(celdas[0]).text().trim();
          if (clave.includes('Provincia:')) {
            datosFicha.provincia = $(celdas[1]).text().trim();
          }
          
          // Extraer la dirección
          if (clave.includes('Dirección:')) {
            datosFicha.direccion = $(celdas[1]).text().trim();
          }
        }
      });
      
      // Extraer nombre del alcalde (está después de un h4 que dice "Alcalde de [COMUNA]")
      $('h4').each((i, elem) => {
        if ($(elem).text().includes('Alcalde de')) {
          // El nombre del alcalde suele estar en el h3 siguiente
          datosFicha.alcalde = $(elem).next('h3').text().trim();
        }
      });
      
            // NUEVA SOLUCIÓN para extraer superficie comunal
      // Método 1: Buscar el texto exacto "Superficie Comunal (km2):"
      let superficieValue = '';
      
      // Buscar cualquier tag que contenga exactamente este texto
      $('*').each((i, elem) => {
        const texto = $(elem).text().trim();
        if (texto === 'Superficie Comunal (km2):') {
          // Obtenemos el elemento tr padre
          const trPadre = $(elem).closest('tr');
          if (trPadre.length) {
            // Buscar en la siguiente fila
            const siguienteFila = trPadre.next('tr');
            if (siguienteFila.length) {
              superficieValue = siguienteFila.find('td').first().text().trim();
            }
          }
        }
      });
      
      // Método 2: Si el método 1 no funciona, buscar por el patrón de contenido
      if (!superficieValue) {
        // Intentar encontrar una celda que contenga solo "Superficie Comunal (km2):"
        $('td').each((i, elem) => {
          const texto = $(elem).text().trim();
          if (texto.includes('Superficie Comunal') && texto.includes('km2')) {
            const trPadre = $(elem).parent('tr');
            if (trPadre.length) {
              const siguienteFila = trPadre.next('tr');
              if (siguienteFila.length) {
                superficieValue = siguienteFila.find('td').first().text().trim();
              }
            }
          }
        });
      }
      
      // Método 3: Buscar por aproximación más genérica
      if (!superficieValue) {
        $('tr').each((i, row) => {
          const texto = $(row).text().trim();
          // Buscar cualquier fila que hable de superficie
          if (texto.includes('Superficie') && texto.includes('Comunal')) {
            const siguienteFila = $(row).next('tr');
            if (siguienteFila.length) {
              superficieValue = siguienteFila.find('td').first().text().trim();
            }
          }
        });
      }
      
      // Si después de todo no encontramos la superficie, intentar una última técnica
      if (!superficieValue) {
        // Iterar sobre todas las filas como array para acceder por índice
        const todasLasFilas = $('tr').toArray();
        for (let i = 0; i < todasLasFilas.length; i++) {
          const fila = todasLasFilas[i];
          const texto = $(fila).text().trim();
          
          // Si esta fila menciona superficie
          if (texto.includes('Superficie') && texto.includes('Comunal')) {
            // Y hay una fila siguiente
            if (i + 1 < todasLasFilas.length) {
              const siguienteFila = todasLasFilas[i + 1];
              const celdas = $(siguienteFila).find('td');
              if (celdas.length > 0) {
                superficieValue = $(celdas[0]).text().trim();
              }
            }
          }
        }
      }
      
      // Asignar el valor encontrado o 0 por defecto
      datosFicha.superficie = superficieValue || '0';
      
      // Limpiar el valor (eliminar espacios extra)
      datosFicha.superficie = datosFicha.superficie.replace(/\s+/g, ' ').trim();
      
      // Extraer población comunal
      let poblacionHeader = false;
      $('h3').each((i, elem) => {
        if ($(elem).text().includes('Población Comunal')) {
          poblacionHeader = true;
        }
      });
      
      if (poblacionHeader) {
        $('tr').each((i, row) => {
          const celdas = $(row).find('td');
          if (celdas.length >= 3 && $(celdas[0]).text().includes('Población Comunal')) {
            datosFicha.poblacion = $(celdas[2]).text().trim();
          }
        });
      }
      
      // Limpiar los datos (eliminar espacios y caracteres extra)
      Object.keys(datosFicha).forEach(key => {
        if (typeof datosFicha[key] === 'string') {
          datosFicha[key] = datosFicha[key].replace(/\s+/g, ' ').trim();
        }
      });
      
      // Guardar como JSON individual
      const nombreArchivoSinExtension = path.basename(archivo, path.extname(archivo));
      const archivoSalida = path.join(OUTPUT_DIR, `${nombreArchivoSinExtension}.json`);
      fs.writeFileSync(archivoSalida, JSON.stringify(datosFicha, null, 2));
      
      // Agregar a la lista de todas las comunas
      todasLasComunas.push(datosFicha);
      comunasProcesadas.push(datosFicha.nombreComuna);
      
      console.log(`✓ Procesada: ${datosFicha.nombreComuna}`);
    } catch (error) {
      console.error(`✗ Error al procesar ${archivo}:`, error.message);
    }
  }
  
  console.log(`\nProceso completado. ${comunasProcesadas.length} comunas convertidas a JSON.`);
  
  // Crear un archivo consolidado con todas las comunas
  fs.writeFileSync(
    CONSOLIDADO_FILE,
    JSON.stringify(todasLasComunas, null, 2)
  );
  
  console.log(`Archivo consolidado generado en ${CONSOLIDADO_FILE}`);
  
  // Crear un índice de todas las comunas procesadas
  const indice = {
    total: comunasProcesadas.length,
    comunas: comunasProcesadas.sort()
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'indice.json'),
    JSON.stringify(indice, null, 2)
  );
  
  console.log('Índice de comunas generado en indice.json');
}

// Ejecutar el proceso
procesarTodasLasFichas();