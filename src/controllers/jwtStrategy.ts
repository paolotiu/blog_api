/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { User } from '../models/Models';
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
    User.findOne({ username: payload.username }).exec((err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
};
export default new JwtStrategy(opts, cb);
