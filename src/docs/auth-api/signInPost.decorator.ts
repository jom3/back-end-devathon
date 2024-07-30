import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function signInPostApi() {
  return applyDecorators(
    ApiResponse({ status: 204, description: 'Correct Credentials' }),
    ApiResponse({ status: 404, description: 'Invalid Credentials' }),
    HttpCode(204),
  );
}