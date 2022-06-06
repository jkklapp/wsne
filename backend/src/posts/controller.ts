import {
  BadRequestException,
  Body,
  Controller as BaseController,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ResolvedPostDocument,
  NewPostDocument,
  PostDocumentResult,
} from './document';
import { Service } from './service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { getDisplayNameByUserId } from './utils';

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getMultiple(
    @Req() request: any,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter?: string,
  ): Promise<PostDocumentResult> {
    const { results, nextPageToken } = await this.service.getMultiple(
      limit,
      startAfter,
    );
    const resolvedPosts: ResolvedPostDocument[] = [];
    for (const p in results) {
      resolvedPosts.push({
        ...results[p],
        userName: await getDisplayNameByUserId(results[p].userId),
      });
    }

    const { user } = request;
    const { user_id: userId } = user;
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

    return this.service.create(post.message, userId, userName);
  }
}
