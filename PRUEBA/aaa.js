const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Directorio donde están guardadas las fichas HTML descargadas
const FICHAS_DIR = './fichas_html';
// Archivo para guardar la información de depuración
const DEBUG_FILE = './debug_superficie.txt';

// Función para mostrar el contexto HTML
function showContext($, element, depth = 1) {
  let result = '';
  // Mostrar elemento actual
  result += `${'-'.repeat(depth)} ${$(element).prop('tagName')}: "${$(element).text().trim()}"\n`;
  
  // Mostrar los siguientes n elementos
  let next = $(element).next();
  for (let i = 0; i < 3 && next.length > 0; i++) {
    result += `${' '.repeat(depth)}NEXT ${i+1}: <${next.prop('tagName')}> "${next.text().trim()}"\n`;
    next = next.next();
  }
  
  return result;
}

// Función para extraer solo la información relevante de superficie
function extraerInfoSuperficie() {
  const archivos = fs.readdirSync(FICHAS_DIR)
    .filter(archivo => archivo.endsWith('.html'));
  
  console.log(`Analizando ${archivos.length} archivos HTML para depuración...`);
  
  let debugInfo = '';
  
  for (const archivo of archivos.slice(0, 5)) { // Limitar a los primeros 5 para depuración
    try {
      debugInfo += `\n\n=============================================\n`;
      debugInfo += `ARCHIVO: ${archivo}\n`;
      
      const rutaArchivo = path.join(FICHAS_DIR, archivo);
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      const $ = cheerio.load(contenido);
      
      // Extraer y mostrar el nombre de la comuna
      const nombreComuna = $('h1').first().text().trim();
      debugInfo += `COMUNA: ${nombreComuna}\n\n`;
      
      // Buscar todas las ocurrencias de "Superficie" en el HTML
      debugInfo += "BÚSQUEDA DE 'SUPERFICIE' EN EL DOCUMENTO:\n\n";
      
      // Buscar en todas las etiquetas que puedan contener texto
      $('*').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.includes('Superficie')) {
          debugInfo += `Elemento con 'Superficie': <${$(elem).prop('tagName')}>\n`;
          debugInfo += `Texto completo: "${text}"\n`;
          debugInfo += showContext($, elem);
          debugInfo += `HTML: ${$(elem).html()}\n\n`;
        }
      });
      
      // Buscar específicamente en las filas de tablas
      debugInfo += "\nBÚSQUEDA ESPECÍFICA EN FILAS DE TABLAS:\n\n";
      $('tr').each((i, row) => {
        const rowText = $(row).text().trim();
        if (rowText.includes('Superficie')) {
          debugInfo += `Fila ${i} con 'Superficie': "${rowText}"\n`;
          
          // Mostrar las celdas de esta fila
          $(row).find('td').each((j, cell) => {
            debugInfo += `  Celda ${j}: "${$(cell).text().trim()}"\n`;
          });
          
          // Mostrar la siguiente fila si existe
          const nextRow = $(row).next('tr');
          if (nextRow.length) {
            debugInfo += `  Siguiente fila: "${nextRow.text().trim()}"\n`;
            nextRow.find('td').each((j, cell) => {
              debugInfo += `    Celda ${j} de sig. fila: "${$(cell).text().trim()}"\n`;
            });
          } else {
            debugInfo += `  No hay fila siguiente\n`;
          }
          
          debugInfo += `\n`;
        }
      });
    } catch (error) {
      debugInfo += `ERROR al procesar ${archivo}: ${error.message}\n`;
    }
  }
  
  // Guardar información de depuración en un archivo
  fs.writeFileSync(DEBUG_FILE, debugInfo);
  console.log(`Información de depuración guardada en ${DEBUG_FILE}`);
}

// Ejecutar la función de depuración
extraerInfoSuperficie();