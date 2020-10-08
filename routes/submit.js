const router = require('express').Router();

router.get("/submit", (req, res)=>{
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });
  
router.post("/submit", (req, res)=>{
    const submittedSecret = req.body.secret;
    User.findById(req.user.id, (err, foundUser)=>{
        if (err) {
        console.log(err);
        } else {
        if (foundUser) {
            foundUser.secret.push(submittedSecret);
            foundUser.save(()=>{
            res.redirect("/secrets");
            });
        }
        }
    });
});

module.exports = router;
