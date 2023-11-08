import express from "express";
import RotaController from "../controllers/RotaController.js";
const router = express.Router();

router
    .get("/rotas", RotaController.listarRotas)
    .get("/totas/:id", RotaController.listarRotaPorId)
    .post("/rotas", RotaController.cadastrarRota)
    .patch("/totas/:id", RotaController.PATCHAtualizarRota)
    .delete("/totas/:id", RotaController.excluirRota)


/**
 * @swagger
 * tags:
 *   name: Rotas
 *   description: Operações relacionadas a Rotas
 */

/**
 * @swagger
 * /rotas:
 *   get:
 *     summary: Lista todas as rotas
 *     tags: [Rotas]
 *     responses:
 *       200:
 *         description: Retorna a lista de rotas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /rotas/{id}:
 *   get:
 *     summary: Lista uma rota por ID
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da rota para listar
 *     responses:
 *       200:
 *         description: Retorna a rota com o ID especificado
 *       404:
 *         description: Rota não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /rotas:
 *   post:
 *     summary: Cadastra uma nova rota
 *     tags: [Rotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rota'
 *     responses:
 *       201:
 *         description: Rota cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar a rota
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /rotas/{id}:
 *   patch:
 *     summary: Atualiza uma rota por ID
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da rota para atualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rota'
 *     responses:
 *       200:
 *         description: Rota atualizada com sucesso
 *       404:
 *         description: Rota não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /rotas/{id}:
 *   delete:
 *     summary: Exclui uma rota por ID
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da rota para excluir
 *     responses:
 *       204:
 *         description: Rota excluída com sucesso
 *       404:
 *         description: Rota não encontrada
 *       500:
 *         description: Erro interno do servidor
 */


export default router;