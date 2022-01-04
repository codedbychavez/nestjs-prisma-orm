import { Injectable } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import {
    Post,
    Prisma,
} from '@prisma/client';
import {NewPost, UpdatePost} from "./graphql";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async post(id: string): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

    async posts(): Promise<Post[]> {
        return this.prisma.post.findMany({});
    }

    async createPost(input: NewPost): Promise<Post> {
        return this.prisma.post.create({
            data: input
        });
    }

    async updatePost(params: UpdatePost): Promise<Post> {
        const { id, published, title, content } = params;
        return this.prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                ...(published && {published}),
                ...(title && {title}),
                ...(content && {content}),
            },
        });
    }

    async deletePost(id: string): Promise<Post> {
        return this.prisma.post.delete({
            where: {
                id: parseInt(id),
            }
        });
    }
}
