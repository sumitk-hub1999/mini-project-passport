const passport = require("passport");
const bcrypt = require("bcrypt");
const localstrategy = require("passport-local").Strategy;
function initialise(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);

    if (user == null) {
      //user not found
      return done(null, false, { message: "user not found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new localstrategy({ userNameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialise;
