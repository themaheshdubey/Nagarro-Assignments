
const express = require('express');




const router = express.Router();




router.get('/', function(req, res) {
    const payload = {
        pageTitle: 'Notifications',
        userLoggedIn: req.session.user,
        notifications: 'active'
    };
    res.status(200).render('notificationsPage', payload);
});

module.exports = router;