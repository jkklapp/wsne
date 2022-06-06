import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Service } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [Service],
  exports: [Service],
})
export class PostsModule {}
