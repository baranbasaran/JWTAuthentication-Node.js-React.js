require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var cors = require("cors");

app.use(express.json());

app.use(cors());

const users = [
  {
    username: "baran",
    password: "basaran",
    age: 22,
    job: "Software Engineer",
    status: "free",
  },
  {
    username: "nopasaran",
    password: "basaran",
    age: 22,
    job: "Software Engineer",
    status: "free",
  },
  {
    username: "captain",
    password: "horuz",
    age: 23,
    job: "Football Player",
    status: "free",
  },
  {
    username: "malkoc",
    password: "emre",
    age: 21,
    job: "Economist",
    status: "free",
  },
  {
    username: "shizo",
    password: "emre",
    age: 24,
    job: "Farmer",
    status: "free",
  },
  {
    username: "naira",
    password: "Onur",
    age: 24,
    job: "Farmer",
    status: "free",
  },
  {
    username: "majoras",
    password: "Alim",
    age: 22,
    job: "Policeman",
    status: "free",
  },
  {
    username: "adolpha",
    password: "Mehmet",
    age: 22,
    job: "Bakery",
    status: "free",
  },
  {
    username: "explosion",
    password: "Tolga",
    age: 29,
    job: "Farmer",
    status: "free",
  },
];

app.get("/users", authenticateToken, (req, res) => {
  //check token with authenticateToken function then return users from response
  res.json(users);
});

app.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;

  filteredUser = users.filter((user) => {
    return (
      user.username == req.body.username && user.password == req.body.password //username password validate
    );
  });
  if (filteredUser.length == 1) {
    {
      const user = {
        username: filteredUser[0].username,
        password: filteredUser[0].password,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    }
  } else {
    return res.status(401).json({ message: "Wrong user name or password" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; //Split bearer and token
  //console.log(authHeader)                             // you should try these command
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(token)                                  // you should try these command
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(5000);
