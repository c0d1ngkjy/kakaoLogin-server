import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthority } from 'src/domain/user-authority.entity';
import { User } from 'src/domain/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '300s'}
    }),
    PassportModule
  ],
  exports: [TypeOrmModule, AuthService, UserService],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
