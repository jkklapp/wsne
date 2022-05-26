import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    const firebase_params = {
      type: process.env.FB_PARAMS_TYPE,
      projectId: process.env.FB_PARAMS_PROJECT_ID,
      privateKeyId: process.env.FB_PARAMS_PRIVATE_KEY_ID,
      privateKey: (process.env.FB_PARAMS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      clientEmail: process.env.FB_PARAMS_CLIENT_EMAIL,
      clientId: process.env.FB_PARAMS_CLIENT_ID,
      authUri: process.env.FB_PARAMS_AUTH_URI,
      tokenUri: process.env.FB_PARAMS_TOKEN_URI,
      authProviderX509CertUrl:
        process.env.FB_PARAMS_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FB_PARAMS_CLIENT_C509_CERT_URL,
    };
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }
  async validate(token: string) {
    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}
