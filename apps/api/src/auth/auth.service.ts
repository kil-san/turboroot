import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthPayload } from './auth.types'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: AuthPayload): string {
    return this.jwtService.sign(user)
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }

  verifyToken(token: string): AuthPayload {
    return this.jwtService.verify<AuthPayload>(token)
  }
}
