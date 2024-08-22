import { applyDecorators, HttpCode } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";

export function movieFindAllGetApi(){
    return applyDecorators(
        ApiResponse(
            { status: 200, 
                description: "Get all movies",
            }
        )
    )
}

