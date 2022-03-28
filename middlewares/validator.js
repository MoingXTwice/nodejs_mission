const {body, validationResult} = require('express-validator');

const error = (req, res, next) => {
    const errors = validationResult(req);
    console.log("validateError : ", errors['errors']);
    if (errors.isEmpty()) {
        return next();
    }
    console.log(errors.array()[0].msg);
    return res.json({result: 'fail', errorMessage: errors.array()[0].msg});
}

const validateRegister = [
    body('nickname')
        .trim() // 공백 제거
        .isLength({min: 3, max: 16}) // 최소 3글자 최대 16글자
        .withMessage('아이디는 3자 이상 16자 이하로 입력하여주세요.') //isLength 에서 에러가 나면 메세지 출력
        .isAlphanumeric() // 알파벳과 숫자만 가능
        .withMessage('잘못된 아이디 형식입니다.'), // isAlphanumeric 에서 에러가 나면 메세지 출력
    body('password')
        .trim() // 공백 제거
        .isLength({min: 4}) // 최소 4글자
        .withMessage('비밀번호는 최소 4자 이상 입력하여주세요.'), //isLength 에서 에러가 나면 메세지 출력
    error,
];

module.exports = {
    validateRegister,
}