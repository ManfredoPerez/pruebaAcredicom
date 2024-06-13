import { pool } from '../db.js';

export const getLibros = async (req, res) => {
  try {
    // const [result] = await pool.query('SELECT * FROM libro');
    // const result = await connection.query("SELECT a.id_articulo, a.id_usuario, u.nombre, a.codigo, a.nombre_articulo, a.no_serie, a.valor_unitario, a.valor_total, a.valor_baja, a.observaciones, a.qr, a.cantidad FROM articulos a INNER JOIN usuario u ON a.id_usuario = u.id_usuario;");
    const [result]  = await pool.query("SELECT a.id_libro, a.titulo,  u.nombre, u.apellido FROM libro a INNER JOIN autor u ON a.autor_id = u.id_autor;");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM libro WHERE id_libro = ?', [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Libro not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createLibro = async (req, res) => {
  try {
    const { titulo, autor_id } = req.body;
    const [rows] = await pool.query('INSERT INTO libro (titulo, autor_id) VALUES (?, ?)', [titulo, autor_id]);
    res.status(201).json({
      id_libro: rows.insertId,
      titulo,
      autor_id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor_id } = req.body;

    const [result] = await pool.query(
      'UPDATE libro SET titulo = IFNULL(?, titulo), autor_id = IFNULL(?, autor_id) WHERE id_libro = ?',
      [titulo, autor_id, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Libro not found' });

    const [rows] = await pool.query('SELECT * FROM libro WHERE id_libro = ?', [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('DELETE FROM libro WHERE id_libro = ?', [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: 'Libro not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};