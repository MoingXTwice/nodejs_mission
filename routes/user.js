const router = require('express').Router();
const userCtl = require('../controller/user')

/**
 *   기본 루트
 *   /api/users
 */

/** 페이지 로딩 구간*/

// 글 작성 페이지
router.get('/login', userCtl.loginPage);

// 글 수정 페이지
router.get('/register', userCtl.registerPage);

/** 페이지 로딩 구간 종료*/


/** api 구간 */

// 회원가입 api
router.post('/register', userCtl.signUp);

// 로그인 api
router.post('/login', userCtl.login);

/** api 구간 종료 */


module.exports = router;