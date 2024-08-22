import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiFoundResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function signInPostApi() {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'Correct Credentials' }),
    ApiUnauthorizedResponse({ status: 401, description: 'Invalid Credentials' }),
    HttpCode(201),
  );
}
