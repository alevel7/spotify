import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum Environment {
    development = 'development',
    production = 'production',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    DB_HOST: string;

    @IsString()
    USERNAME: string;

    @IsString()
    PASSWORD: string;

    @IsString()
    SECRET: string;

    @IsString()
    DATABASE: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
    
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    })
    const error = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (error.length > 0) {
        throw new Error(`Config validation error: ${error.map(err => err.toString()).join(', ')}`);
    }
    return validatedConfig
}