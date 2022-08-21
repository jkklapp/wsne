import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { FirestoreModule } from './firestore/firestore.module';
import { cache, PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.secret.local'],
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
        ignoreUndefinedProperties: true,
      }),
      inject: [ConfigService],
    }),
    cache,
    PostsModule,
    UsersModule,
  ],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
