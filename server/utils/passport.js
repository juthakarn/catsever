const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
import { users } from "../../models";
import { TOKEN_SECRET_KEY } from "../utils/constant";

//create local strategy
const localOptions = { usernameField: "email" };

const locallogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    const user = await users.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return done(null, false);
    }

    users.comparePassword(email, password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: TOKEN_SECRET_KEY
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  console.log(payload);
  const userlogin = await users.findById(payload.sub);
  if (!userlogin) {
    done(null, false);
  } else {
    done(null, userlogin);
  }
});

/* Passport Strategy */
passport.use(jwtLogin);
passport.use(locallogin);
