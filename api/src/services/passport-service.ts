import passport from "passport";
import GoogleSrategy from "passport-google-oauth20";
import { User } from "../models/user";

passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleSrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/login/callback",
      proxy: true,
    },
    async (accessToken, refreshToke, profile, done) => {
      const exisitngUser = await User.findOne({ googleId: profile.id });
      if (exisitngUser) {
        return done(undefined, exisitngUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      return done(undefined, user);
    }
  )
);

export { passport };
