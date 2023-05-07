const passport = require("passport");
const bcrypt = require("bcrypt");
const localstrategy = require("passport-local");
function initialise(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);

    if (user == null) {
      //user not found
      return done(null, false, { message: "user not found" });
    }
  };
  passport.use(new localstrategy({ userNameField: "email" }), authenticateUser);

  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}
