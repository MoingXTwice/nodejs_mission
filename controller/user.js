const User = require('../schemas/user');

/* api 구간 */

// 회원가입
async function signUp(req, res) {
    const {nickname, password, passwordConfirm} = req.body;

    // 가장 최근 유저 Id를 찾음
    const maxUserByUserId = await User.findOne().sort('-userId').exec();
    // userId는 가장 최근 유저 Id에 + 1
    const userId = maxUserByUserId ? maxUserByUserId.userId + 1 : 1;

    // 중복된 닉네임이 있으면 "중복된 닉네임입니다" 에러메세지
    const [existNickname] = await User.find({nickname});
    if (existNickname !== undefined) {
        res.json({result: 'fail', errorMessage: '중복된 닉네임입니다.'});
        return;
    }

    // password 와 passwordConfirm 이 일치하지 않으면 회원가입 불가
    if (password !== passwordConfirm) {
        res.json({result: 'fail', errorMessage: '패스워드가 일치하지 않습니다.'});
        return;
    }

    await User.create({userId, nickname, password});
    res.status(200).json({result: 'success', message: '회원가입이 완료되었습니다.'});
}

// 로그인
function login(req, res) {
    const {nickname, password} = req.body;
}




/* api 구간 종료 */


/* 페이지 로딩 구간 */

function loginPage(req, res) {
    res.status(200).render('login');
}

function registerPage(req, res) {
    res.status(200).render('register');
}

/* 페이지 로딩 구간 종료 */


module.exports = {
    signUp,
    login,
    loginPage,
    registerPage,
};