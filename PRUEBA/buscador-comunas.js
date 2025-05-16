const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON consolidado
const ARCHIVO_CONSOLIDADO = './fichas_json/todas_comunas.json';

/**
 * Función para buscar comunas por nombre o por cualquier otro criterio
 * @param {string} termino - El término de búsqueda
 * @param {string} campo - El campo en el que buscar (por defecto, busca en todos los campos)
 * @returns {Array} - Las comunas que coinciden con la búsqueda
 */
function buscarComunas(termino, campo = null) {
  try {
    // Cargar el archivo JSON consolidado
    const datos = JSON.parse(fs.readFileSync(ARCHIVO_CONSOLIDADO, 'utf8'));
    
    // Convertir el término de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const terminoLower = termino.toLowerCase();
    
    // Filtrar las comunas que coinciden con el término de búsqueda
    return datos.filter(comuna => {
      // Si se especifica un campo, buscar solo en ese campo
      if (campo && comuna[campo]) {
        return comuna[campo].toLowerCase().includes(terminoLower);
      }
      
      // Si no se especifica un campo, buscar en todos los campos
      return Object.values(comuna).some(valor => 
        typeof valor === 'string' && valor.toLowerCase().includes(terminoLower)
      );
    });
  } catch (error) {
    console.error('Error al buscar comunas:', error.message);
    return [];
  }
}

/**
 * Función para obtener estadísticas básicas
 * @returns {Object} - Estadísticas de las comunas
 */
function obtenerEstadisticas() {
  try {
    // Cargar el archivo JSON consolidado
    const datos = JSON.parse(fs.readFileSync(ARCHIVO_CONSOLIDADO, 'utf8'));
    
    // Contar comunas por provincia
    const comunasPorProvincia = {};
    datos.forEach(comuna => {
      const provincia = comuna.provincia || 'Sin provincia';
      comunasPorProvincia[provincia] = (comunasPorProvincia[provincia] || 0) + 1;
    });
    
    // Obtener la comuna con más y menos superficie (si el dato está disponible y es numérico)
    let comunasConSuperficie = datos.filter(comuna => {
      // Intentar convertir la superficie a número, eliminando caracteres no numéricos
      const superficie = parseFloat(comuna.superficie.replace(/[^\d.-]/g, ''));
      return !isNaN(superficie) && superficie > 0;
    });
    
    let comunaMayorSuperficie = null;
    let comunaMenorSuperficie = null;
    
    if (comunasConSuperficie.length > 0) {
      comunasConSuperficie = comunasConSuperficie.map(comuna => {
        return {
          ...comuna,
          superficieNum: parseFloat(comuna.superficie.replace(/[^\d.-]/g, ''))
        };
      });
      
      comunaMayorSuperficie = comunasConSuperficie.reduce((max, comuna) => 
        comuna.superficieNum > max.superficieNum ? comuna : max, comunasConSuperficie[0]);
        
      comunaMenorSuperficie = comunasConSuperficie.reduce((min, comuna) => 
        comuna.superficieNum < min.superficieNum ? comuna : min, comunasConSuperficie[0]);
    }
    
    return {
      totalComunas: datos.length,
      comunasPorProvincia,
      comunaMayorSuperficie: comunaMayorSuperficie ? {
        nombre: comunaMayorSuperficie.nombreComuna,
        superficie: comunaMayorSuperficie.superficie
      } : null,
      comunaMenorSuperficie: comunaMenorSuperficie ? {
        nombre: comunaMenorSuperficie.nombreComuna,
        superficie: comunaMenorSuperficie.superficie
      } : null
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error.message);
    return {};
  }
}

// Ejemplos de uso
function ejemplos() {
  // 1. Buscar todas las comunas de una provincia específica
  const comunasValparaiso = buscarComunas('Valparaíso', 'provincia');
  console.log(`\n1. Comunas de la provincia de Valparaíso (${comunasValparaiso.length}):`);
  comunasValparaiso.forEach(comuna => console.log(`- ${comuna.nombreComuna}`));
  
  // 2. Buscar comunas por nombre del alcalde
  const comunasAlcalde = buscarComunas('González', 'alcalde');
  console.log(`\n2. Comunas con alcaldes apellidados González (${comunasAlcalde.length}):`);
  comunasAlcalde.forEach(comuna => console.log(`- ${comuna.nombreComuna}: ${comuna.alcalde}`));
  
  // 3. Buscar comunas por dirección
  const comunasDireccion = buscarComunas('Plaza', 'direccion');
  console.log(`\n3. Comunas con direcciones que contienen "Plaza" (${comunasDireccion.length}):`);
  comunasDireccion.forEach(comuna => console.log(`- ${comuna.nombreComuna}: ${comuna.direccion}`));
  
  // 4. Estadísticas generales
  const estadisticas = obtenerEstadisticas();
  console.log('\n4. Estadísticas generales:');
  console.log(`   Total de comunas: ${estadisticas.totalComunas}`);
  console.log('   Comunas por provincia:');
  Object.entries(estadisticas.comunasPorProvincia)
    .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor
    .forEach(([provincia, cantidad]) => console.log(`   - ${provincia}: ${cantidad}`));
    
  if (estadisticas.comunaMayorSuperficie) {
    console.log(`   Comuna con mayor superficie: ${estadisticas.comunaMayorSuperficie.nombre} (${estadisticas.comunaMayorSuperficie.superficie})`);
  }
  
  if (estadisticas.comunaMenorSuperficie) {
    console.log(`   Comuna con menor superficie: ${estadisticas.comunaMenorSuperficie.nombre} (${estadisticas.comunaMenorSuperficie.superficie})`);
  }
}

// Si este script se ejecuta directamente (no como módulo)
if (require.main === module) {
  // Verificar si existe el archivo consolidado
  if (!fs.existsSync(ARCHIVO_CONSOLIDADO)) {
    console.error(`Error: No se encontró el archivo ${ARCHIVO_CONSOLIDADO}`);
    console.error('Primero debes ejecutar el script de extracción para generar el archivo consolidado.');
    process.exit(1);
  }
  
  console.log('=== BUSCADOR DE INFORMACIÓN COMUNAL ===');
  
  // Si se proporcionan argumentos, realizar una búsqueda
  if (process.argv.length > 2) {
    const termino = process.argv[2];
    const campo = process.argv[3] || null;
    
    console.log(`Buscando "${termino}"${campo ? ` en el campo "${campo}"` : ''}...`);
    
    const resultados = buscarComunas(termino, campo);
    console.log(`\nSe encontraron ${resultados.length} resultados:`);
    
    resultados.forEach((comuna, index) => {
      console.log(`\n${index + 1}. ${comuna.nombreComuna}`);
      console.log(`   Provincia: ${comuna.provincia}`);
      console.log(`   Dirección: ${comuna.direccion}`);
      console.log(`   Alcalde: ${comuna.alcalde}`);
      console.log(`   Superficie: ${comuna.superficie}`);
      console.log(`   Población: ${comuna.poblacion}`);
    });
  } else {
    // Si no hay argumentos, mostrar ejemplos
    ejemplos();
    
    console.log('\n=== INSTRUCCIONES DE USO ===');
    console.log('Para buscar información, ejecuta:');
    console.log('  node buscador.js "término de búsqueda" [campo]');
    console.log('\nDonde:');
    console.log('  - "término de búsqueda": texto a buscar');
    console.log('  - campo (opcional): limita la búsqueda a un campo específico');
    console.log('    (nombreComuna, provincia, direccion, alcalde, superficie, poblacion)');
    console.log('\nEjemplos:');
    console.log('  node buscador.js "Santiago"');
    console.log('  node buscador.js "González" alcalde');
    console.log('  node buscador.js "Valparaíso" provincia');
  }
}

// Exportar funciones para usar como módulo
module.exports = {
  buscarComunas,
  obtenerEstadisticas
};