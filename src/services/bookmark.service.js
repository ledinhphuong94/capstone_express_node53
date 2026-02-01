import { prisma } from "../models/generated/prisma.connect.js";
import helper from "../common/helpers/common.helper.js";

export const bookmarkService = {
    async toggle(req) {
        const {imgId} = req.reqParams;
        const userId = req.user.userId;

        const exist = await prisma.bookmarks.findUnique({
            where: {
                userId_imgId: {
                    userId: userId,
                    imgId: imgId,
                }
            },
        });
        console.log('exist', exist);
        if (exist) {
            // If like exists, remove it (unbookmark)
            const deletedLike = await prisma.bookmarks.update({
                where: {
                    bookmarkId: exist.bookmarkId,
                },
                data: {
                    isDeleted: !exist.isDeleted,
                },
            });
            return deletedLike;
        } else {
            // If like does not exist, create it
            const newLike = await prisma.bookmarks.create({
                data: {
                    userId: userId,
                    imgId: imgId,
                },
            });
            return newLike;
        } 
    },

    async isBookmark(req) {
        const {id, userId} = req.reqParams;
        const result = await prisma.bookmarks.findUnique({
            where: {
                userId_imgId: {
                    userId: userId,
                    imgId: id,
                },
                isDeleted: false,
            },
        });
        if (!result) {
            return false;
        };
        return result;
    },

    async getBookmarkByUser(req) {
        const userId = req.user.userId;
        const bookmarks = await prisma.bookmarks.findMany({
            where: {
                userId: userId,
                isDeleted: false,
            },
            include: {
                images: true,
            },
        });
        return bookmarks;
    },  
};