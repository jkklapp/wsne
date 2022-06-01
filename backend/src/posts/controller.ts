import {
  Body,
  Controller as BaseController,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostDocument, NewPostDocument, PostDocumentResult } from './document';
import { Service } from './service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter?: number,
  ): Promise<PostDocumentResult> {
    return this.service.findAll(limit, startAfter);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  public create(
    @Req() request: any,
    @Body() post: NewPostDocument,
  ): Promise<PostDocument> {
    const userId = request.user.user_id;
    return this.service.create(post, userId);
  }
}
