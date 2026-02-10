import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common'
import { SigninRequestSchema, type SigninResponse, SignupRequestSchema, type SignupResponse } from '@repo/common'
import { UserService } from '@repo/domain'
import { type Response } from 'express'
import { createZodDto } from 'nestjs-zod'

import { AuthService } from './auth.service'
import { Public } from './decorators'

class SigninRequestDto extends createZodDto(SigninRequestSchema) {}
class SignupRequestDto extends createZodDto(SignupRequestSchema) {}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() payload: SigninRequestDto, @Res({ passthrough: true }) res: Response): Promise<SigninResponse> {
    const { email, password } = payload
    const user = await this.userService.findOne({ email })
    if (!user) throw new UnauthorizedException('Invalid credentials supplied')

    const isPasswordValid = await this.authService.comparePasswords(password, user.passwordHash)
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials supplied')

    const token = this.authService.generateToken({ id: user.id })

    // Set HttpOnly cookie
    res.cookie('AUTH_TOKEN', token, {
      httpOnly: true,
      secure: false, // Set to true in production (requires HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return { accessToken: token }
  }

  @Public()
  @Post('register')
  async signUp(@Body() payload: SignupRequestDto, @Res({ passthrough: true }) res: Response): Promise<SignupResponse> {
    const { email, password, firstName, lastName } = payload
    const existingUser = await this.userService.findOne({ email })
    if (existingUser) throw new UnauthorizedException('Email already in use')

    const passwordHash = await this.authService.hashPassword(password)
    const newUser = await this.userService.create({ email, passwordHash, firstName, lastName })

    const token = this.authService.generateToken({ id: newUser.id })

    // Set HttpOnly cookie
    res.cookie('AUTH_TOKEN', token, {
      httpOnly: true,
      secure: false, // Set to true in production (requires HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    }
  }
}
