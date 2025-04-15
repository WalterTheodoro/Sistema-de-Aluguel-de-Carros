const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ajuste o caminho conforme sua estrutura

// Listar todos os carros
router.get('/carros', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM carros');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os carros' });
    }
});

// Buscar um carro por ID
router.get('/carros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM carros WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o carro' });
    }
});

// Adicionar um novo carro
router.post('/carros', async (req, res) => {
    const { modelo, marca, ano, preco } = req.body;
    try {
        const [result] = await db.query('INSERT INTO carros (modelo, marca, ano, preco) VALUES (?, ?, ?, ?)', [modelo, marca, ano, preco]);
        res.status(201).json({ id: result.insertId, modelo, marca, ano, preco });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar o carro' });
    }
});

// Atualizar um carro por ID
router.put('/carros/:id', async (req, res) => {
    const { id } = req.params;
    const { modelo, marca, ano, preco } = req.body;
    try {
        const [result] = await db.query('UPDATE carros SET modelo = ?, marca = ?, ano = ?, preco = ? WHERE id = ?', [modelo, marca, ano, preco, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
        res.json({ id, modelo, marca, ano, preco });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o carro' });
    }
});

// Remover um carro por ID
router.delete('/carros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM carros WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
        res.json({ message: 'Carro removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover o carro' });
    }
});

module.exports = router;
