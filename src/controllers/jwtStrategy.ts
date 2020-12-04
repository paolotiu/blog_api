/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
    VerifyCallback,
} from 'passport-jwt';

const opts: StrategyOptions = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
};

interface Payload {
    username: string;
    email: string;
}

const cb: VerifyCallback = (payload: Payload, done) => {
    return done(null, true);
};
export default new JwtStrategy(opts, cb);
