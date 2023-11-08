import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class RotaController {
    // GET - Listar rotas
    static listarRotas = async (req, res) => {
        try {
            const rotas = await prisma.rotas.findMany();
            return res.status(200).json(rotas);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }

    // GET por ID - Listar rota por ID
    static listarRotaPorId = async (req, res) => {
        try {
            const rotaId = req.params.id;
            const rota = await prisma.rotas.findFirst({
                where: {
                    id: rotaId,
                },
            });

            if (rota) {
                return res.status(200).json(rota);
            } else {
                return res.status(404).json([{ error: true, code: 404, message: "Rota não encontrada" }]);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }

    // POST - Cadastrar rota
    static cadastrarRota = async (req, res) => {
        try {
            const { nome, descricao } = req.body;

            if (!nome || !descricao) {
                return res.status(400).json([{ error: true, code: 400, message: "Nome e descrição são obrigatórios" }]);
            }

            const rotaCriada = await prisma.rotas.create({
                data: {
                    nome,
                    descricao,
                },
            });

            return res.status(201).json(rotaCriada);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }

    // PATCH - Atualizar rota
    static PATCHAtualizarRota = async (req, res) => {
        try {
            const rotaId = req.params.id;
            const { nome, descricao } = req.body;

            if (!nome || !descricao) {
                return res.status(400).json([{ error: true, code: 400, message: "Nome e descrição são obrigatórios" }]);
            }

            const rotaAtualizada = await prisma.rotas.update({
                where: {
                    id: rotaId,
                },
                data: {
                    nome,
                    descricao,
                },
            });

            return res.status(200).json(rotaAtualizada);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }

    // DELETE - Excluir rota
    static excluirRota = async (req, res) => {
        try {
            const rotaId = req.params.id;
            const rotaExiste = await prisma.rotas.findFirst({
                where: {
                    id: rotaId,
                },
            });

            if (!rotaExiste) {
                return res.status(404).json([{ error: true, code: 404, message: "Rota não encontrada" }]);
            }

            await prisma.rotas.delete({
                where: {
                    id: rotaId,
                },
            });

            return res.status(204).end();
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }
}

export default RotaController;
