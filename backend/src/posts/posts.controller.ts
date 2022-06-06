import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ResolvedPostDocument,
  NewPostDocument,
  PostDocumentResult,
  UpdatePostDocument,
} from './posts.types';
import { Service } from './posts.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { getDisplayNameByUserId } from './utils';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getMultiple(
    @Req() request: any,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter?: string,
  ): Promise<PostDocumentResult> {
    const { user } = request;
    const { user_id: userId } = user;
    const { results, nextPageToken } = await this.service.getMultiple(
      limit,
      startAfter,
    );
    const resolvedPosts: ResolvedPostDocument[] = [];
    for (const p in results) {
      resolvedPosts.push({
        ...results[p],
        likes: (results[p].likes || []).length,
        likedByMe: (results[p].likes || []).includes(userId),
        userName: await getDisplayNameByUserId(results[p].userId),
      });
    }

    const last24hours = Date.now() - 86400000;
    const numberPostsCreatedToday = await this.service.countAllforUserByDate(
      userId,
      last24hours,
    );
    const maxNumberPostsPerDay = parseInt(
      process.env.MAX_NUMBER_POSTS_PER_DAY,
      10,
    );

    return {
      results: resolvedPosts.slice(),
      remainingMessages: maxNumberPostsPerDay - numberPostsCreatedToday,
      nextPageToken,
    };
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  public async create(
    @Req() request: any,
    @Body() post: NewPostDocument,
  ): Promise<ResolvedPostDocument> {
    const { user } = request;
    const { user_id: userId, name: userName } = user;

    const last24hours = Date.now() - 86400000;
    const numberPostsCreatedToday = await this.service.countAllforUserByDate(
      userId,
      last24hours,
    );
    const maxNumberPostsPerDay = parseInt(
      process.env.MAX_NUMBER_POSTS_PER_DAY,
      10,
    );
    if (numberPostsCreatedToday >= maxNumberPostsPerDay) {
      throw new BadRequestException(
        'You have reached the limit of ' +
          maxNumberPostsPerDay +
          ' posts per day',
      );
    }

    const maxMessageLength = parseInt(process.env.MAX_MESSAGE_LENGTH, 10);
    if (post.message.length > maxMessageLength) {
      throw new BadRequestException(
        'Message is too long. Max length is ' + maxMessageLength,
      );
    }

    const newPost = await this.service.create(post.message, userId);

    return {
      ...newPost,
      likes: newPost.likes.length,
      likedByMe: false,
      userName,
    };
  }

  @Put('/:id')
  @HttpCode(202)
  @UseGuards(FirebaseAuthGuard)
  public async update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() payload: UpdatePostDocument,
  ): Promise<ResolvedPostDocument> {
    const { user } = request;
    const { user_id: userId } = user;

    const exists = await this.service.exists(id);
    if (!exists) {
      throw new BadRequestException('Post not found');
    }

    const { like: likedByMe } = payload;
    await this.service.toggleLike(id, userId, likedByMe);

    const post = await this.service.get(id);

    const userName = await getDisplayNameByUserId(post.userId);

    return {
      ...post,
      userName,
      likes: post.likes.length,
      likedByMe,
    };
  }
}
