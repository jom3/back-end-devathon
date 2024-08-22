import { applyDecorators, HttpCode } from "@nestjs/common";
import { ApiBadRequestResponse, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function authGoogleGetApi(){
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: "Connection with google"
        }),
        ApiBadRequestResponse({
            description: "Unauthenticated"
        })
    );
};

export function authGoogleCBGetApi(){
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: "User information from google"
        }),
        ApiBadRequestResponse({
            description: "Unauthenticated"
        })
    );
};

export function authGoogleValidatePostApi(){
    return applyDecorators(
        ApiUnauthorizedResponse({
            description: "Invalid Token"
        })
    );
};