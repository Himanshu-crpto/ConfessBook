const router = require('express').Router();

router.get("/", (req, res)=>{
    res.render("home");
  });
  
  router.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
  );
  
  router.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: "/login" }),
    (req, res)=> {
      // Successful authentication, redirect to secrets.
      res.redirect("/secrets");
    });
  
  router.get("/secrets", (req, res)=>{
    User.find({"secret": {$ne: null}}, (err, foundUsers)=>{
      if (err){
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("secrets", {usersWithSecrets: foundUsers});
        }
      }
    });
  });

  module.exports = router;