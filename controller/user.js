const User = require('../schemas/user');
const bcrypt = require('bcrypt');

/* api 구간 */

// 회원가입
async function signUp(req, res) {
    const {nickname, password, passwordConfirm} = req.body;

    // TODO validation 에 .custom으로 뺄 수 있을 듯?
    // password 와 passwordConfirm 이 일치하지 않으면 회원가입 불가
    if (nickname === password) {
        return res.json({result: 'fail', errorMessage: '비밀번호는 아이디와 다르게 입력해주세요.'});
    }

    // TODO validation 에 .custom으로 뺄 수 있을 듯?
    // password 와 passwordConfirm 이 일치하지 않으면 회원가입 불가
    if (password !== passwordConfirm) {
        return res.json({result: 'fail', errorMessage: '비밀번호와 비밀번호 확인이 일치하지 않습니다.'});
    }

    // 비밀번호 비교 후 암호화하여 저장
    const hashPw = bcrypt.hashSync(password, +process.env.BCRYPT_SALT);

    // 가장 최근 유저 Id를 찾음
    const maxUserByUserId = await User.findOne().sort('-userId').exec();
    // userId는 가장 최근 유저 Id에 + 1
    const userId = maxUserByUserId ? maxUserByUserId.userId + 1 : 1;

    // TODO validation 에 .custom으로 뺄 수 있을 듯?
    // 중복된 닉네임이 있으면 "중복된 닉네임입니다" 에러메세지
    const [existNickname] = await User.find({nickname});
    if (existNickname !== undefined) {
        return res.json({result: 'fail', errorMessage: '중복된 닉네임입니다.'});
    }

    await User.create({userId, nickname, password: hashPw});
    res.status(200).json({result: 'success', message: '회원가입이 완료되었습니다.'});
}

// 로그인
function login(req, res) {
    const {nickname, password} = req.body;

    const user = User.findOne({nickname});
    console.log(user);

    res.send({});
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