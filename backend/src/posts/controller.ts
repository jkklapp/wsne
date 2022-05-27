import {
  Body,
  Controller as BaseController,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostDocument, NewPostDocument } from './document';
import { Service } from './service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Req() request: any): Promise<PostDocument[]> {
    const userId = request.user.user_id;
    return this.service.findAll(userId);
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
