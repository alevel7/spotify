export type JwtPayload = {
    sub: number,
    email: string,
    artistId?: number
}

export type TwofactorPayload = {
    secret:string
}