import { pool } from '../db.js';

export const getAutores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM autor');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM autor WHERE id_autor = ?', [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Autor not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createAutor = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    const [rows] = await pool.query('INSERT INTO autor (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);
    res.status(201).json({
      id_autor: rows.insertId,
      nombre,
      apellido,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;

    const [result] = await pool.query(
      'UPDATE autor SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id_autor = ?',
      [nombre, apellido, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Autor not found' });

    const [rows] = await pool.query('SELECT * FROM autor WHERE id_autor = ?', [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('DELETE FROM autor WHERE id_autor = ?', [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: 'Autor not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};