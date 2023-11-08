import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class GrupoController {
    // GET - Listar grupos com filtragem por nome
    static listarGrupos = async (req, res) => {
        try {
            let grupos = null;

            if (!req.query.nome) {
                grupos = await prisma.grupos.findMany();
            } else {
                grupos = await prisma.grupos.findMany({
                    where: {
                        nome: {
                            contains: req.query.nome,
                        },
                    },
                });
            }

            return res.status(200).json(grupos);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
        }
    }

    // GET por ID - Listar grupo por ID
    static listarGrupoPorId = async (req, res) => {
        try {
            const grupoId = req.params.id;
            const grupo = await prisma.grupos.findFirst({
                where: {
                    id: grupoId,
                }
            });

            if (grupo) {
                return res.status(200).json(grupo);
            } else {
                return res.status(404).json([{ error: true, code: 404, message: "Grupo não encontrado" }]);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
        }
    }

    // POST - Cadastrar grupo
    static cadastrarGrupo = async (req, res) => {
        try {
            const { nome } = req.body;

            if (!nome) {
                return res.status(400).json([{ error: true, code: 400, message: "Nome é obrigatório" }]);
            }

            const grupoExists = await prisma.grupos.findFirst({
                where: {
                    nome: nome,
                }
            });

            if (grupoExists) {
                return res.status(400).json([{ error: true, code: 400, message: "Esse grupo já existe" }]);
            }

            const grupoCriado = await prisma.grupos.create({
                data: {
                    nome,
                },
            });

            return res.status(201).json(grupoCriado);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
        }
    }

    // PATCH - Atualizar grupo
    static PATCHAtualizarGrupo = async (req, res) => {
        try {
            const grupoId = req.params.id;
            const { nome } = req.body;

            if (!nome) {
                return res.status(400).json([{ error: true, code: 400, message: "Nome é obrigatório" }]);
            }

            const grupoAtualizado = await prisma.grupos.update({
                where: {
                    id: grupoId,
                },
                data: {
                    nome,
                },
            });

            return res.status(200).json(grupoAtualizado);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }

    // DELETE - Excluir grupo
    static excluirGrupo = async (req, res) => {
        try {
            const grupoId = req.params.id;

            const grupoExiste = await prisma.grupos.findFirst({
                where: {
                    id: grupoId,
                },
            });

            if (!grupoExiste) {
                return res.status(404).json([{ error: true, code: 404, message: "Grupo não encontrado" }]);
            }

            await prisma.grupos.delete({
                where: {
                    id: grupoId,
                },
            });

            return res.status(204).end();
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }
}

export default GrupoController;
