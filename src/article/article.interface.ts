import { Types } from 'mongoose';

export interface ArticleBlockBase {
    _id: Types.ObjectId;
    type: string;
    title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    paragraph?: string;
}
export interface ArticleImageBlock extends ArticleBlockBase {
    src?: string;
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock;

export interface Article {
    _id: Types.ObjectId;
    title: string;
    img: string;
    views: number;
    createdAt: Date;
    isUpdate: boolean;
    userId: Types.ObjectId;
    types: Types.Array<string>;
    blocks: Types.DocumentArray<ArticleBlock>;
}
