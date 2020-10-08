const router = require('express').Router();

router.get("/register", function(req, res){
    res.render("register");
  });

router.post("/register", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/secrets");
        });
      }
    });
  
  });

  module.exports = router;
