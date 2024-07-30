import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function signUpPostApi() {
  return applyDecorators(
    ApiResponse({ status: 204, description: 'User successfuly created' }),
    ApiResponse({ status: 404, description: 'Error trying to create user' }),
    HttpCode(204),
  );
}