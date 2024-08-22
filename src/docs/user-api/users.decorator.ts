import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

export function usersGetApi() {
  return applyDecorators(
    ApiResponse(
      { status: 200, 
        description: "Users found successfuly",
        schema: {
          type: "JSON",
          properties: {
            metaData: {
              type: "Object",
              description: `{
                    "total": 2,
                    "page": 1,
                    "lastPage": 1}`
            },
            data: {
              type: "Array",
              description: `
                [{
              "id": "2a444e38-bda5-452f-aa30-86014300f8cd",
              "dni": "0214-5417-2154",
              "fullName": "Jhon Cena",
              "role": "USER",
              "email": "jhoncena@gmail.com",
              "password": "$2a$12$Q6FkunREAW/UJhGMWzEdN.1wMUMIpKm87Nswq7/z09EECmSul2ygm",
              "phone": null,
              "address": null,
              "country": null,
              "create_at": "2024-08-19T22:33:11.314Z",
              "update_at": "2024-08-19T22:33:11.314Z"
            },]
              `
            }
          }
        },
        

      }
    ),
    ApiResponse({ status: 404, description: 'User not Found' }),
    HttpCode(201),
  );
};

export function userByIdGetAPI(){
  return applyDecorators(
    ApiParam({
        name: "id",
        schema: {
            type: "string",
        },
        description: "User Id",
        example: "2a444e38-bda5-452f-aa30-86014300f8cd"
  }),
  ApiResponse(
    { status: 200, 
      description: "Users found successfuly",
      schema: {
        type: "JSON",
        properties: { 
          user: {
            type: "Array",
            description: `{
              "id": "2a444e38-bda5-452f-aa30-86014300f8cd",
              "dni": "0214-5417-2154",
              "fullName": "Jhon Cena",
              "role": "USER",
              "email": "jhoncena@gmail.com",
              "password": "$2a$12$Q6FkunREAW/UJhGMWzEdN.1wMUMIpKm87Nswq7/z09EECmSul2ygm",
              "phone": null,
              "address": null,
              "country": null,
              "create_at": "2024-08-19T22:33:11.314Z",
              "update_at": "2024-08-19T22:33:11.314Z"
          }`
          }
        }
      },
    }
  ),
  ApiResponse({
        status: 404, 
        description: 'User not Found'
  }),
  HttpCode(201)
  )
}

export function userByIdPatchApi(){
  return applyDecorators(
    ApiParam({
        name: "id",
        schema: {
            type: "string",
        },
        description: "User Id",
        example: "2a444e38-bda5-452f-aa30-86014300f8cd"
  }),
  ApiResponse(
    { status: 200, 
      description: "Users updated successfuly",
      schema: {
        type: "JSON",
        properties: { 
          userInfo: {
            type: "Array",
            description: `{
              "id": "2a444e38-bda5-452f-aa30-86014300f8cd",
              "dni": "0214-5417-2154",
              "fullName": "Jhon Cena",
              "role": "USER",
              "email": "jhoncena@gmail.com",
              "password": "$2a$12$Q6FkunREAW/UJhGMWzEdN.1wMUMIpKm87Nswq7/z09EECmSul2ygm",
              "phone": null,
              "address": null,
              "country": null,
              "create_at": "2024-08-19T22:33:11.314Z",
              "update_at": "2024-08-19T22:33:11.314Z"
          }`
          }
        }
      },
    }
  ),
  ApiResponse({
        status: 404, 
        description: 'User not Found'
  }),
  HttpCode(201)
  )
}

export function userByIdDeletedApi(){
  return applyDecorators(
    ApiParam({
        name: "id",
        schema: {
            type: "string",
        },
        description: "User Id",
        example: "2a444e38-bda5-452f-aa30-86014300f8cd"
  }),
  ApiResponse(
    { status: 204, 
      description: "User deleted successfully",
    }
  ),
  ApiResponse({
        status: 404, 
        description: 'User not Found'
  }),
  HttpCode(201)
  )
}

export function userByEmailGetApi(){
  return applyDecorators(
    ApiParam({
        name: "email",
        schema: {
            type: "string",
        },
        description: "User email",
        example: "jhoncen@gmail.com"
  }),
  ApiResponse(
    { status: 200, 
      description: "User",
      schema: {
        type: "JSON",
        properties: { 
          userInfo: {
            type: "Array",
            description: `{
              "id": "2a444e38-bda5-452f-aa30-86014300f8cd",
              "dni": "0214-5417-2154",
              "fullName": "Jhon Cena",
              "role": "USER",
              "email": "jhoncena@gmail.com",
              "password": "$2a$12$Q6FkunREAW/UJhGMWzEdN.1wMUMIpKm87Nswq7/z09EECmSul2ygm",
              "phone": null,
              "address": null,
              "country": null,
              "create_at": "2024-08-19T22:33:11.314Z",
              "update_at": "2024-08-19T22:33:11.314Z"
          }`
          }
        }
      },
    }
  ),
  ApiResponse({
        status: 404, 
        description: 'User not Found'
  }),
  HttpCode(201)
  )
}