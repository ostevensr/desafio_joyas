import pool from '../../db/config.js'
import format from 'pg-format';

//Solicitar Joyas

export const solicitaJoyas = async ({ limits = 2, order_by = 'id_ASC', page = 1 } = {}) => {
    try {

        const [campo, orden] = order_by.split('_');
        const offset = (page - 1) * limits;
        const query = format('SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L', campo, orden, limits, offset);
        const joyas = await pool.query(query);
        console.log(query); 
        console.log(joyas)
        return joyas.rows;
    } catch (error) {
        console.error('Error obteniendo Joyas:', error);
    }
};

//Solicitar Joyas con Filtros

export const filtroJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = [];
    if (precio_min) filtros.push(`precio >= ${precio_min}`);
    if (precio_max) filtros.push(`precio <= ${precio_max}`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);
  
    let query = 'SELECT * FROM inventario';
    if (filtros.length > 0) {
      query += ` WHERE ${filtros.join(' AND ')}`;
    }
  
    const { rows } = await pool.query(query);
    return rows;
  };