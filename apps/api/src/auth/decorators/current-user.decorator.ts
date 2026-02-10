import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { DecodedAuthResult } from '../auth.types'

interface AuthenticatedRequest extends Request {
  user: DecodedAuthResult
}

export const CurrentUser = createParamDecorator(
  (property: keyof DecodedAuthResult | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>()

    const user = request.user

    return property ? user?.[property] : user
  }
)
