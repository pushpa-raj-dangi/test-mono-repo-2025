var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return jwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/uploads(.*)/, methods: ["GET", "POST", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "POST", "OPTIONS"] },
      { url: /\/api\/v1\/users(.*)/, methods: ["GET", "POST", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "POST", "OPTIONS"] },
      //disable auth for image route
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },

      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
