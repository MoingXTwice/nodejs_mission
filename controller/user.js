const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** api 구간 */

// 회원가입
async function signUp(req, res) {
    const {nickname, password, passwordConfirm} = req.body;

    // TODO validation 에 .custom으로 뺄 수 있을 듯?
    // password 와 passwordConfirm 이 일치하지 않으면 회원가입 불가
    if (password.includes(nickname)) {
        return res.json({result: 'fail', errorMessage: '비밀번호에는 아이디가 포함될 수 없습니다.'});
    }

    // TODO validation 에 .custom으로 뺄 수 있을 듯?
    // password 와 passwordConfirm 이 일치하지 않으면 회원가입 불가
    if (password !== passwordConfirm) {
        return res.json({result: 'fail', errorMessage: '비밀번호와 비밀번호 확인이 일치하지 않습니다.'});
    }

    // 비밀번호 비교 후 암호화하여 저장
    const hashPw = bcrypt.hashSync(password, +process.env.SECRET_SALT);

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
async function login(req, res) {
    const {nickname, password} = req.body;

    // 아이디 비교
    const user = await User.findOne({nickname});
    if (!user) {
        return res.json({result: 'fail', errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }

    // 비밀번호 비교
    const hashPw = bcrypt.compareSync(password, user.password) // 일치하면 true 틀리면 false
    if (!hashPw) {
        return res.json({result: 'fail', errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }

    // jwtToken 생성
    const token = jwt.sign({
        userId: user.userId,
        nickname: user.nickname,
    }, process.env.SECRET_KEY);

    res.send({token});
}

// 암튼 몬가.. 몬가 받음..
async function something(req, res) {
    const {auth} = res.locals;

    res.send({auth});
}


/** api 구간 종료 */


/** 페이지 로딩 구간 */

// 회원가입 페이지
function registerPage(req, res) {
    res.status(200).render('register');
}

// 로그인 페이지
function loginPage(req, res) {
    res.status(200).render('login');
}

/** 페이지 로딩 구간 종료 */


module.exports = {
    signUp,
    login,
    loginPage,
    registerPage,
    something,

};