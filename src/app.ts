import express from "express";
import logger from "./utils/logger";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import Connection from "./utils/connect-db";
import router from "./routes/index.routes";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { logRequestChecker } from "./middleware/http-log.middleware";
import {User, UserDocument} from "./modules/user/user.model";
import { Strategy } from "passport-local";
import { userDb } from "./db/repository.db";
import { validateUser } from './modules/user/user.service';

import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";

dotenv.config();

const app = express();
const server = http.createServer(app);
const {APP_PORT} = process.env;
const LocalStrategy = Strategy;

//middleware
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(logRequestChecker);

app.use(session({
    secret: process.env.SECRET_KEY as string,
    name: "express-session-id",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
        mongoUrl: process.env.DB_URI,
        collectionName: "sessions",
        ttl: 24 * 60 * 60 * 1000,
        // transformId: () => {
        //   return randomUUID();
        // }
    })
}));

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  }, 
  async (username, password, done) => {
  const user = await userDb.findOne({ username });  
  if(!user) return done("Invalid credential", false);

  // const isPasswordMatch = await bcrypt.compare(password, user?.password);
  // if(!isPasswordMatch) return done("Invalid credential", false);

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDb.findById(id);
  if(!user) return done("Failed deserialized", false);
  
  done(null, user);
});

// passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api", router);

server.listen(APP_PORT, async () => {
    await new Connection().connectDB();
    logger.info(`Server started on port ${APP_PORT}`);
    logger.info("Type 'rs' for manually restart");
});