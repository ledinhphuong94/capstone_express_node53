import { prisma } from "../models/generated/prisma.connect.js";
import commonHelper from "../common/helpers/common.helper.js";
import { ExceptionBadRequest } from "../common/helpers/exception.helper.js";
import helper from "../common/helpers/common.helper.js";

export const commentService = {
    async create(req) {
        const {content, imgId} = req.reqParams;
        const userId = req.user.userId;

        const result = await prisma.comments.create({
            data: {
                content: content,
                imgId: imgId,
                userId: userId,
            },
        });
        return result;
    },

    async findAll(req) {
        const {id, limit, cursor} = req.reqParams;
        const result = await prisma.comments.findMany({
            where: {
                imgId: id,
                isDeleted: false,
                createdAt: {
                    lt: cursor ? new Date(cursor) : new Date()
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
            include: {
                users: {
                    select: {
                        userId: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        const totalRows = await prisma.comments.count({
            where: {
                imgId: id,
                isDeleted: false,
                createdAt: {
                    lt: cursor ? new Date(cursor) : new Date()
                }
            },
        });
        return helper.responseFindMany(null, limit, totalRows, result);
    },

    async update(req) {
        const {content, id, commentId} = req.reqParams;
        const userId = req.user.userId;
        const exist = await prisma.comments.findFirst({
            where: {
                commentId: commentId,
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
        });
        if (!exist) throw new ExceptionBadRequest("Comment not found or you don't have permission to update this comment");
        const result = await prisma.comments.update({
            where: {
                commentId: commentId,
                imgId: id,
                userId: userId,
            },
            data: {
                content: content,
            },
        });
        return result;
    },

    async remove(req) {
        const {id, commentId} = req.reqParams;
        const userId = req.user.userId;
        const exist = await prisma.comments.findFirst({
            where: {
                commentId: commentId,
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
        });
        if (!exist) throw new ExceptionBadRequest("Comment not found or you don't have permission to delete this comment");
        const result = await prisma.comments.update({
            where: {
                commentId: commentId,
                imgId: id,
                userId: userId,
            },
            data: {
                isDeleted: true,
            },
        });
        return result;
    }
};