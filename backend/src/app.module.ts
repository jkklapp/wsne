import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { FirestoreModule } from './firestore/firestore.module';
import { PostsModule } from './posts/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
        '.secrets.local',
      ],
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
