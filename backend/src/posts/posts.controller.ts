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
import { PostsService } from './posts.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { getDisplayNameByUserId } from './utils';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getMultiple(
    @Req() request: any,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('parentId') parentId = '',
    @Query('startAfter') startAfter?: string,
  ): Promise<PostDocumentResult> {
    const { user } = request;
    const { user_id: userId } = user;
    const { results, nextPageToken } = await this.service.getMultiple(
      limit,
      parentId,
      startAfter,
    );
    const resolvedPosts: ResolvedPostDocument[] = [];
    if (parentId) {
      // push parent post
      const parentPost = await this.service.get(parentId);
      resolvedPosts.push({
        ...parentPost,
        likes: (parentPost.likes || []).length,
        likedByMe: (parentPost.likes || []).includes(userId),
        userName: await getDisplayNameByUserId(parentPost.userId),
        comments: await this.service.countAllForParentId(parentPost.id),
      });
    }
    for (const p in results) {
      resolvedPosts.push({
        ...results[p],
        likes: (results[p].likes || []).length,
        likedByMe: (results[p].likes || []).includes(userId),
        userName: await getDisplayNameByUserId(results[p].userId),
        comments: await this.service.countAllForParentId(results[p].id),
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
    const {
      user_id: userId,
      name: userName,
      email_verified: emailVerified,
    } = user;

    const last24hours = Date.now() - 86400000;
    const numberPostsCreatedToday = await this.service.countAllforUserByDate(
      userId,
      last24hours,
    );
    const maxNumberPostsPerDay = emailVerified
      ? parseInt(process.env.MAX_NUMBER_POSTS_PER_DAY, 10)
      : 1;

    if (
      !process.env.FUNCTIONS_EMULATOR &&
      numberPostsCreatedToday >= maxNumberPostsPerDay
    ) {
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

    const newPost = await this.service.create(post, userId);
    const comments = post.parentId
      ? await this.service.countAllForParentId(post.parentId)
      : 0;

    return {
      ...newPost,
      likes: 0,
      likedByMe: false,
      userName,
      comments,
    };
  }

  @Post(':/id')
  @UseGuards(FirebaseAuthGuard)
  public async comment(
    @Req() request: any,
    @Param('id') parentId: string,
    @Body() post: NewPostDocument,
  ): Promise<ResolvedPostDocument> {
    const { user } = request;
    const {
      user_id: userId,
      name: userName,
      email_verified: emailVerified,
    } = user;

    if (!process.env.FUNCTIONS_EMULATOR && !emailVerified) {
      throw new BadRequestException('You must verify your email to comment');
    }

    const maxMessageLength = parseInt(process.env.MAX_MESSAGE_LENGTH, 10);
    if (post.message.length > maxMessageLength) {
      throw new BadRequestException(
        'Message comment is too long. Max length is ' + maxMessageLength,
      );
    }

    const newPost = await this.service.create({ ...post, parentId }, userId);
    const comments = post.parentId
      ? await this.service.countAllForParentId(post.parentId)
      : 0;

    return {
      ...newPost,
      likes: 0,
      likedByMe: false,
      userName,
      comments,
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
    const comments = post.parentId
      ? await this.service.countAllForParentId(post.parentId)
      : 0;

    return {
      ...post,
      userName,
      likes: (post.likes || []).length,
      likedByMe,
      comments,
    };
  }
}
