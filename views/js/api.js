function authCheck() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/api/users/me",
            success: function (response) {
                if (response['auth'] === 'falseLogin') {
                    alert('로그인 후 이용해주세요.');
                    location.href = '/api/users/login';
                } else if (response['auth'] === 'errorLogin') {
                    alert('알 수 없는 오류입니다. 관계자에게 문의해주세요.');
                    location.href = '/api/posts';
                }
            },
            error: function (error) {
            },
        });
    });
}

function getSelf() {
    $.ajax({
        type: 'GET',
        url: '/api/users/me',
        success: function (response) {
            alert('언제 들러용?');
        },
    });
}

function post() {
    let title = $('#title').val()
    let content = $('#content').val()

    if (title === '') {
        alert('제목을 쓰세요')
        return;
    } else if (content === '') {
        alert('글을 쓰세요')
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/posts",
        data: {
            'title': title,
            'content': content,
        },
        success: function (response) {
            console.log(response);
            window.location.href = '/api/posts'
        }
    });
}

function modify(postId) {
    let title = $('#title').val()
    let content = $('#content').val()
    let writer = $('#writer').val()
    let password = $('#password').val()

    $.ajax({
        type: "PUT",
        url: "/api/posts/" + postId,
        data: {
            'title': title,
            'content': content,
            'writer': writer,
            'password': password
        },
        success: function (response) {
            alert(response['message']);
            if (response['result'] === 'success') {
                window.location.href = '/api/posts/' + postId;
            }
        }
    });
}

function del(postId) {

    $.ajax({
        type: 'DELETE',
        url: '/api/posts/' + postId,
        data: {},
        success: function (response) {
            alert(response['message']);
            window.location.href = '/api/posts'
        }
    })
}

function register() {
    let nickname = $('#nickname').val()
    let password = $('#password').val()
    let passwordConfirm = $('#passwordConfirm').val()

    $.ajax({
        type: "POST",
        url: "/api/users/register",
        data: {
            'nickname': nickname,
            'password': password,
            'passwordConfirm': passwordConfirm
        },
        success: function (response) {
            if (response['result'] === 'success') {
                alert(response['message']);
                window.location.href = '/api/users/login';
            } else {
                alert(response['errorMessage'])
                return;
            }
        }
    });
}

function login() {
    let nickname = $('#nickname').val()
    let password = $('#password').val()

    $.ajax({
        type: "POST",
        url: "/api/users/login",
        data: {
            'nickname': nickname,
            'password': password
        },
        success: function (response) {
            if (response['result'] === 'fail') {
                alert(response['errorMessage']);
            } else {
                $.cookie('accessToken', response.token, {path: '/'});
                window.location.href = '/api/posts';
            }
        }
    });
}

function logout() {
    $.removeCookie('accessToken', {path: '/'});
    location.replace('/api/posts');
}