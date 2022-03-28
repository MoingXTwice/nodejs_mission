const router = require('express').Router();
const userController = require('../controller/user')
const {validateRegister} = require('../middlewares/validator');

/**
 *   기본 루트
 *   /api/users
 */

/** 페이지 로딩 구간*/

// 로그인 페이지
router.get('/login', userController.loginPage);

// 회원가입 페이지
router.get('/register', userController.registerPage);

/** 페이지 로딩 구간 종료*/


/** api 구간 */

// 회원가입 api
router.post('/register', validateRegister, userController.signUp);

// 로그인 api
router.post('/login', userController.login);

/** api 구간 종료 */


module.exports = router;