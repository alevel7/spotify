import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstant } from "src/config/configuration";
import { JwtPayload } from "../types/jwtPayload.type";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstant.secret
        });
    }

    async validate(payload: JwtPayload){
        return {userId: payload.sub, email:payload.email, artistId:payload.artistId};
    }
}