const User = require("../model/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");
const session = require("express-session");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
      sessionData = {
          email: '',
          confirmEmail: '',
          password: '',
          fullname: '',
          street: '',
          postal: '',
          city: ''
      }
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
      sessionData = {
          email: '',
          password: ''
      }
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

async function signup(req, res, next) {
  const enteredData = {
      email: req.body.email,
      confirmEmail: req.body['confirm-email'],
      password: req.body.password,
      fullname: req.body.fullname,
      street: req.body.street,
      postal: req.body.postal,
      city: req.body.city

  }


  if (!validation.userDetailsAreValid(req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])) {

      sessionFlash.flashDataToSession(req, {
          errorMessage: 'Please check your input',
          ...enteredData
      }, function () {

          res.redirect('/signup')
      });
      return
  }

  const user = new User(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
  );

  try {
      const existsAlready = await user.existsAlready();
      if (existsAlready) {
          sessionFlash.flashDataToSession(req, {
              errorMessage: 'The user already exists. Try loggin in instead',
              ...enteredData
          }, function () {
              res.redirect('/signup')
          })
          return
      }

      await user.signup(); 
  } catch (error) {
      next(error);
      return
  }
  res.redirect("login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next();
    return;
  }
  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid credentials,please check your emial and password",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }
  const passwordIsCorrect = await user.comparePassword(existingUser.password);
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid credentials",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
