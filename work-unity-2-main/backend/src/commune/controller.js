import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CommuneController {
  // Método para obtener todas las comunas desde los archivos JSON
  static getAllCommunes = (req, res) => {
    try {
      // Ajusta la ruta a la carpeta que contiene los archivos JSON
      const folderPath = path.join(__dirname, '../../fichas_json');
      
      // Lee todos los archivos en la carpeta
      const files = fs.readdirSync(folderPath);
      
      // Array para almacenar los datos de todas las comunas
      const communes = [];
      
      // Procesa cada archivo
      files.forEach((file, index) => {
        if (file.endsWith('.json')) {
          const filePath = path.join(folderPath, file);
          const jsonData = fs.readFileSync(filePath, 'utf8');
          const comuna = JSON.parse(jsonData);
          
          // Añade un ID único basado en el índice
          communes.push({
            id: index + 1,
            name: comuna.nombreComuna || 'No disponible',
            province: comuna.provincia || 'No disponible',
            address: comuna.direccion || 'No disponible',
            mayor: comuna.alcalde || 'No disponible',
            surface: comuna.superficie || '0',
            population: comuna.poblacion || 'No Recepcionado'
          });
        }
      });
      
      return res.status(200).json(communes);
    } catch (error) {
      console.error('Error al obtener comunas:', error);
      return res.status(500).json({ error: 'Error al obtener datos de comunas' });
    }
  }
  
  // Método para obtener una comuna específica por ID
  static getCommuneById = (req, res) => {
    try {
      const { id } = req.params;
      const idNum = parseInt(id);
      
      // Ajusta la ruta a la carpeta
      const folderPath = path.join(__dirname, '../../fichas_json');
      
      // Lee todos los archivos en la carpeta
      const files = fs.readdirSync(folderPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      // Comprueba si el ID está dentro del rango
      if (idNum <= 0 || idNum > jsonFiles.length) {
        return res.status(404).json({ error: 'Comuna no encontrada' });
      }
      
      // Obten el archivo correspondiente al ID
      const filePath = path.join(folderPath, jsonFiles[idNum - 1]);
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const comuna = JSON.parse(jsonData);
      
      // Formatea los datos
      const formattedCommune = {
        id: idNum,
        name: comuna.nombreComuna || 'No disponible',
        province: comuna.provincia || 'No disponible',
        address: comuna.direccion || 'No disponible',
        mayor: comuna.alcalde || 'No disponible',
        surface: comuna.superficie || '0',
        population: comuna.poblacion || 'No Recepcionado'
      };
      
      return res.status(200).json(formattedCommune);
    } catch (error) {
      console.error('Error al obtener comuna:', error);
      return res.status(500).json({ error: 'Error al obtener datos de comuna' });
    }
  }
}