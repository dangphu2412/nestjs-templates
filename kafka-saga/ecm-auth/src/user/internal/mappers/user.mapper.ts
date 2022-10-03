import { Injectable } from '@nestjs/common';
import { User } from '../../client';
import { MyProfile } from '../../../auth/proto/auth.grpc';

@Injectable()
export class UserMapper {
  toMyProfile(user: User): MyProfile {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
