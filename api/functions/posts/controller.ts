import { Body, Controller as BaseController, Get, Post } from '@nestjs/common';
import { PostDocument } from './document';
import { Service } from './service';

@BaseController('posts')
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  findAll(): Promise<PostDocument[]> {
    return this.service.findAll();
  }
  @Post()
  public create(@Body() post: PostDocument): Promise<PostDocument> {
    return this.service.create(post);
  }
}
