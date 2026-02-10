import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import AuthConfig from './auth.config'
import { DecodedAuthResult } from './auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly config: ConfigType<typeof AuthConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.['AUTH_TOKEN']
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }

  validate(payload: DecodedAuthResult) {
    if (!payload) {
      throw new UnauthorizedException()
    }

    return {
      id: payload.id,
    }
  }
}
