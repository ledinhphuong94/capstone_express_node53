import { prisma } from "../models/generated/prisma.connect.js";
import commonHelper from "../common/helpers/common.helper.js";
import { ExceptionBadRequest } from "../common/helpers/exception.helper.js";
import cloudinary from "../common/helpers/cloudinary/cloudinary.helper.js";

export const postService = {
    async create(req) {
        const userId = req.user.userId;
        const file = req.file.buffer;
        const updateParam = {};
        let {imgName, imgDesc} = req.reqParams;
        updateParam.imgName = imgName;
        updateParam.imgDesc = imgDesc;

        if (req.file) {
            // Upload avatar if having img file
            const upResult = await cloudinary.upload(file, {public_id_prefix: 'posts', asset_folder: 'posts'});
            if (!upResult.public_id) throw new ExceptionBadRequest("Upload fail!");
            cloudinary.transform(upResult.public_id, 500, 500);
            updateParam.imgUrl = upResult.public_id;
        };
        
        const result = await prisma.images.create({
            data: {
                ...updateParam,
                userId: userId
            }
        });

        return result;
    },

    async findAll(req) {
        try {
            const {page = 1, limit = 10, imgInfo, userId} = req.reqParams;
            let filters = {};
            if (imgInfo) {
                filters = {
                    ...filters,
                    OR: [
                        {
                            imgName: {
                                contains: imgInfo,
                            }
                        },
                        {
                            imgDesc: {
                                contains: imgInfo,
                            }
                        }
                    ]
                }
            };
            if (userId) {
                filters = {
                    ...filters,
                    userId: userId
                }
            };
                    
            const result = await prisma.images.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    isDeleted: false,
                    ...filters
                },
                include: {
                    users: {
                        select: {
                            userId: true,
                            name: true,
                            avatar: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    },
                    bookmarks: {    
                        where: {
                            userId: req.user.userId,
                            isDeleted: false
                        }
                    }
                }
            });

            const formattedResult = result.map(image => {
                const { bookmarks, ...imageData } = image;
                return {
                    ...imageData,
                    isBookmarked: bookmarks.length > 0, // Trả về true/false
                    userBookmark: bookmarks[0] || null
                };
            });
    
            const totalRows = await prisma.images.count({
                where: {
                    isDeleted: false,
                    ...filters
                }
            });
            return commonHelper.responseFindMany(page, limit, totalRows, formattedResult);
        } catch (err) {
            throw new ExceptionBadRequest(err.message);
        }
    },

    async findOne(req) {
        const defaultLimitComments = 3;
        try {
            const posts = await prisma.images.findUnique({
                where: {
                    imgId: req.reqParams.id,
                    isDeleted: false,
                },
                include: {
                    users: {
                        select: {
                            userId: true,
                            name: true,
                            avatar: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    },
                    bookmarks: {    
                        where: {
                            userId: req.user.userId,
                            isDeleted: false
                        }
                    }
                }
            });

           
            const { bookmarks, ...imageData } = posts;
            const formattedPosts = {
                ...imageData,
                isBookmarked: bookmarks.length > 0, // Trả về true/false
                userBookmark: bookmarks[0] || null
            };

            const comments = await prisma.comments.findMany({
                where: {
                    imgId: req.reqParams.id,
                    isDeleted: false,
                    createdAt: {
                        lte: new Date()
                    }
                },
                take: defaultLimitComments,
                include: {
                    users: {
                        select: {
                            userId: true,
                            name: true,
                            avatar: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            let result = {
                ...formattedPosts,
                comments: comments
            };
            return result;
        } catch (err) {
            throw new ExceptionBadRequest(err.message);
        };
    },

    async update(req) {
        const userId = req.user.userId;
        let {id, imgName, imgDesc} = req.reqParams;
        let updateParam = {};
        if (imgName) updateParam.imgName = imgName;
        if (imgDesc) updateParam.imgDesc = imgDesc;
        const exist = await prisma.images.findUnique({
            where: {
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
        });
        if (!exist) {
            throw new ExceptionBadRequest("Post not found or you do not have permission to update this post");
        };
        const result = await prisma.images.update({
            where: {
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
            data: updateParam
        });
        return result;
    },

    async remove(req) {
        let {id} = req.reqParams;
        const userId = req.user.userId;
        const exist = await prisma.images.findUnique({
            where: {
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
        });
        if (!exist) {
            throw new ExceptionBadRequest("Post not found or you do not have permission to delete this post");
        };
        await prisma.images.update({
            where: {
                imgId: id,
                userId: userId,
                isDeleted: false,
            },
            data: {
                isDeleted: true
            }
        });
        return `Removes an id: ${id} post`;
    }
};