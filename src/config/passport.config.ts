import { userDb } from "../db/repository.db";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import * as bcrypt from "bcrypt";

passport.use(new LocalStrategy({usernameField: 'username',passwordField: 'password',session: true}, async (username, password, done) => {
    try {
      const user = await userDb.findOne({ username: username });  
      if(!user) return done("Invalid credential", false);

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if(!isPasswordMatch) return done("Invalid credential", false);
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDb.findById(id);
    if(!user) return done("Failed deserialized", false);

    return done(null, user);
});