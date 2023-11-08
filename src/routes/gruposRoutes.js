import express from "express";
import GrupoController from "../controllers/GrupoController.js";
const router = express.Router();

router
    .get("/grupos", GrupoController.listarGrupos)
    .get("/grupos/:id", GrupoController.listarGrupoPorId)
    .post("/grupos", GrupoController.cadastrarGrupo)
    .patch("/grupos/:id", GrupoController.PATCHAtualizarGrupo)
    .delete("/grupos/:id", GrupoController.excluirGrupo)


/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Operações relacionadas a Grupos
 */

/**
 * @swagger
 * /grupos:
 *   get:
 *     summary: Lista todos os grupos
 *     tags: [Grupos]
 *     responses:
 *       200:
 *         description: Retorna a lista de grupos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /grupos/{id}:
 *   get:
 *     summary: Lista um grupo por ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo para listar
 *     responses:
 *       200:
 *         description: Retorna o grupo com o ID especificado
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /grupos:
 *   post:
 *     summary: Cadastra um novo grupo
 *     tags: [Grupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       201:
 *         description: Grupo cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o grupo
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /grupos/{id}:
 *   patch:
 *     summary: Atualiza um grupo por ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo para atualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       200:
 *         description: Grupo atualizado com sucesso
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /grupos/{id}:
 *   delete:
 *     summary: Exclui um grupo por ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo para excluir
 *     responses:
 *       204:
 *         description: Grupo excluído com sucesso
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
