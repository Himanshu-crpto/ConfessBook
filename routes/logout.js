const router = require('express').Router();

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
  });

  module.exports = router;