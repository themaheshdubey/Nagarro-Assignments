 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const middleware = require('./middleware');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect(process.env.MONGODB_URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

const server = app.listen(process.env.PORT || 3003, function () {
    console.log('Server is running');
});
const io = require('socket.io')(server, {
    pingTimeout: 60000
});

app.get('/', middleware.isLoggedIn, function(req, res) {
    res.render('home', {userLoggedIn: req.session.user, home:'active'});
});

const loginRoutes = require('./routes/loginRoutes');
app.use('/login', loginRoutes);

const registerRoutes = require('./routes/registerRoutes');
app.use('/register', registerRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/post', middleware.isLoggedIn, postRoutes);

const profileRoutes = require('./routes/profileRoutes');
app.use('/profile', middleware.isLoggedIn, profileRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/uploads', middleware.isLoggedIn, uploadRoutes);

const logoutRoutes = require('./routes/logoutRoutes');
app.use('/logout', middleware.isLoggedIn, logoutRoutes);

const searchRoutes = require('./routes/searchRoutes');
app.use('/search', middleware.isLoggedIn, searchRoutes);

const messagesRoutes = require('./routes/messagesRoutes');
app.use('/messages', middleware.isLoggedIn, messagesRoutes);

const notificationsRoutes = require('./routes/notificationsRoutes');
app.use('/notifications', middleware.isLoggedIn, notificationsRoutes);

const postsApiRoute = require('./routes/api/posts');
app.use('/api/posts', postsApiRoute);

const usersApiRoute = require('./routes/api/users');
app.use('/api/users', usersApiRoute);

const chatsApiRoute = require('./routes/api/chats');
app.use('/api/chats', chatsApiRoute);

const messagesApiRoute = require('./routes/api/messages');
app.use('/api/messages', messagesApiRoute);

const notificationsApiRoute = require('./routes/api/notifications');
app.use('/api/notifications', notificationsApiRoute);

io.on('connection', function(socket) {
    socket.on('setup', function(userData) {
        socket.join(userData._id);
        socket.emit('connected');
    });
    socket.on('join room', function(room) {
        socket.join(room);
    });
    socket.on('typing', function(room) {
        socket.in(room).emit('typing');
    });
    socket.on('stop typing', function(room) {
        socket.in(room).emit('stop typing');
    });
    socket.on('new message', function(newMessage) {
        const chat = newMessage.chat;
        if(!chat.users) return console.log('Chat.users is undefined');
        chat.users.forEach(function(user) {
            if(user._id == newMessage.sender._id) {
                return;
            }
            socket.in(user._id).emit('message received', newMessage);
        });
    });
    socket.on('notification received', function(room) {
        socket.in(room).emit('notification received', room);
    });
});