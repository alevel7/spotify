import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-http-bearer";



@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService:AuthService) {
        super();
    }
    
    validate(apiKey: string): any {
        const user = this.authService.validateApiKey(apiKey);
        if (!user) {
            throw new UnauthorizedException('Invalid API Key');
        }
        // Return user information if the API key is valid
        return user; // Example return value
    }
}