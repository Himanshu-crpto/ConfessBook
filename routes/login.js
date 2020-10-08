const router = require('express').Router();

router.get("/login", (req, res)=>{
    res.render("login");
  });

router.post("/login", (req, res)=>{
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, (err)=>{
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, ()=>{
          res.redirect("/secrets");
        });
      }
    });
  
  });

  module.exports = router;