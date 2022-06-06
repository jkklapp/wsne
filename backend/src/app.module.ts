import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { FirestoreModule } from './firestore/firestore.module';
import { PostsModule } from './posts/posts.module';
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
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
