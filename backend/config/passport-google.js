const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const username = profile.displayName;

        let result = await pool.query(
          "SELECT * FROM users WHERE oauth_provider=$1 AND oauth_id=$2",
          ["google", googleId],
        );

        let user = result.rows[0];

        if (!user) {
          const newUser = await pool.query(
            `INSERT INTO users (username,email,oauth_provider,oauth_id)
             VALUES ($1,$2,$3,$4)
             RETURNING *`,
            [username, email, "google", googleId],
          );

          user = newUser.rows[0];
        }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

module.exports = passport;
