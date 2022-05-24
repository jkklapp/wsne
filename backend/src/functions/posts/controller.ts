import {
  Body,
  Controller as BaseController,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostDocument } from './document';
import { Service } from './service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(): Promise<PostDocument[]> {
    console.log('findAll');
    return this.service.findAll();
  }
  @Post()
  @UseGuards(FirebaseAuthGuard)
  public create(@Body() post: PostDocument): Promise<PostDocument> {
    return this.service.create(post);
  }
}
