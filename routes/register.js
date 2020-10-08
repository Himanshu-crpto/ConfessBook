const router = require('express').Router();

router.get("/register", (req, res)=>{
    res.render("register");
  });

router.post("/register", (req, res)=>{
    User.register({username: req.body.username}, req.body.password, (err, user)=>{
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, ()=>{
          res.redirect("/secrets");
        });
      }
    });
  
  });

  module.exports = router;
