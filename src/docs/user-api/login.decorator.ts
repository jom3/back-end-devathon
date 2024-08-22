import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function loginPostApi() {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'User created successfuly' }),
    ApiResponse({ status: 401, description: 'Error trying to create user' }),
    HttpCode(201),
  );
}