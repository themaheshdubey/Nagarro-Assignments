
document.getElementById('tabFollowing').addEventListener('click', function() {
    loadFollowing();
})



document.getElementById('tabFollowers').addEventListener('click', function() {
    loadFollowers();
})


$(document).on('click', '.follow-btn', function(event) {
    event.preventDefault();
    followBtnHandler(event, true);
})



function loadFollowing() {
    document.getElementById('tabFollowing').classList.add('active-tab');
    document.getElementById('tabFollowers').classList.remove('active-tab');
    document.getElementById('users-container').innerHTML = '';
    $.get(`/api/users/${profileUser}/following`, function(users) {
        outputUsers(users.following);
    })
}



function loadFollowers() {
    document.getElementById('tabFollowers').classList.add('active-tab');
    document.getElementById('tabFollowing').classList.remove('active-tab');
    document.getElementById('users-container').innerHTML = '';
    $.get(`/api/users/${profileUser}/followers`, function(users) {
        outputUsers(users.followers);
    })
}



function outputUsers(users) {
    users.forEach(function(user) {
        document.getElementById('users-container').insertAdjacentHTML('afterbegin', createUserHTML(user));
    })
}

if(selectedTab === 'following') {
    loadFollowing();
} else {
    loadFollowers();
}