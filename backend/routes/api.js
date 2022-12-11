const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const router = require("express").Router();
let Users = require("../models/users.model");

const JWT_SECRET = "autotesting-secret-key";
const JWT_EXPIRES_IN = "5 days";


router.route("/account/me").get((req, res) => {
  
  // console.log(req.headers);
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    res.status(401).json({ errors: ["Authorization token missing"] })
  }

  const accessToken = authorization.split(" ")[1];
  const { userId } = jwt.verify(accessToken, JWT_SECRET);

  Users.findOne({"id": userId})
    .then((user) => {
      // console.log(user);
      if (!user) {
        throw new Error("Invalid authorization token");
      }
      res.json({
        user,
      })
    })
    .catch((err) => res.status(401).json({ errors: [err.message] }));

});
router.route("/account/login").post((req, res) => {
    // console.log(req.body);

    const {email, password} = req.body;

    Users.findOne({"email": email})
    .then((user) => {
      // console.log(user);
      if (!user) {
        throw new Error("Please check your email and password");
      }

      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.json({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => res.status(401).json({ errors: [err.message] }));
});

router.route("/account/register").post((req, res) => {
    const {email, password} = req.body;

    Users.findOne({"email": email})
    .then((user) => {

      // console.log(user);

      if (user) {
        throw new Error("User already exists");
      }
      
      const newUserId = uuidv4();
      const newUser = new Users({
        id: newUserId,
        email: email,
        name: email,
        password: password,
        avatar: "https://ui-avatars.com/api/?name=" + email,
      });

      const accessToken = jwt.sign({ userId: newUserId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      
      newUser.save()
        .then(() => {
          res.json({
            accessToken,
            user: {
              id: newUserId,
              email: email,
              name: email,
              avatar: "https://ui-avatars.com/api/?name=" + email,
            },
          });
        })
    })
    .catch((err) => res.status(401).json({ errors: [err.message] }));
});


module.exports = router;
