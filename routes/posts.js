const router = require('express').Router();
const postController = require('../controller/post')

/**
 *   기본 루트
 *   /api/posts
 */

/* 페이지 로딩 구간*/

// 글 작성 페이지
router.get('/write', postController.writePage);

// 글 수정 페이지
router.get('/write/:postId', postController.modifyPage);

/* 페이지 로딩 구간 종료*/

/* api 구간 */

// 글 목록 조회 api
router.get('/', postController.postList);

// 글 작성 api
router.post('/', postController.writePost);

// 글 번호 조회 api
router.get('/:postId', postController.viewPost);

// 글 수정 api
router.put('/:postId', postController.modifyPost);

// 글 삭제 api
router.delete('/:postId', postController.deletePost);

/* api 구간 종료 */





module.exports = router;