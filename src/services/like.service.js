import { prisma } from "../models/generated/prisma.connect.js";
import helper from "../common/helpers/common.helper.js";

export const likeService = {
    async toggle(req) {
        const {imgId} = req.reqParams;
        const userId = req.user.userId;

        const exist = await prisma.likes.findUnique({
            where: {
                userId_imgId: {
                    userId: userId,
                    imgId: imgId,
                }
            },
        });
        console.log('exist', exist);
        if (exist) {
            // If like exists, remove it (unlike)
            const deletedLike = await prisma.likes.update({
                where: {
                    likeId: exist.likeId,
                },
                data: {
                    isDeleted: !exist.isDeleted,
                },
            });
            return deletedLike;
        } else {
            // If like does not exist, create it
            const newLike = await prisma.likes.create({
                data: {
                    userId: userId,
                    imgId: imgId,
                },
            });
            return newLike;
        } 
    },

    async findAll(req) {
        const {id, limit, cursor} = req.reqParams;
        const result = await prisma.likes.findMany({
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
};