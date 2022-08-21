import { CacheModule, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

export const cache = CacheModule.register();

@Module({
  imports: [cache],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [cache, PostsService],
})
export class PostsModule {}
