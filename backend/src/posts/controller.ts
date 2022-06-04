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

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter?: string,
  ): Promise<PostDocumentResult> {
    return this.service.findAll(limit, startAfter);
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
    return this.service.create(post.message, userId, userName);
  }
}
