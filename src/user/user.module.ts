// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { UserSchema } from './models/user.schema';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { UserSchema } from './models/user.schema';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//     JwtModule.register({ secret: 'secretKey' }),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authGuard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: 'secretKey' }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      strategies: [LocalStrategy],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
})
export class UserModule {}
