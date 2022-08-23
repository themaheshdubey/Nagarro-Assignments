
const express = require('express');



const router = express.Router();



router.get('/:id', function(req, res) {
    res.render('postPage', {
        pageTitle: 'View Post',
        postId: req.params.id,
        userLoggedIn: req.session.user,
        home: 'active'
    });
});

module.exports = router;