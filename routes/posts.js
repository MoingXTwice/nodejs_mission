const router = require('express').Router();
const postController = require('../controller/post');
const authMiddleware = require('../middlewares/auth');

/**
 *   기본 루트
 *   /api/posts
 */

/** 페이지 로딩 구간*/

// 글 작성 페이지
router.get('/write', postController.writePage);

// 글 수정 페이지
router.get('/write/:postId', authMiddleware, postController.modifyPage);

/** 페이지 로딩 구간 종료*/

/** api 구간 */

// 글 목록 조회 api
router.get('/', postController.postList);

// 글 작성 api
router.post('/', authMiddleware, postController.writePost);

// 글 번호 조회 api
router.get('/:postId', authMiddleware, postController.viewPost);

// 글 수정 api
router.put('/:postId', authMiddleware, postController.modifyPost);

// 글 삭제 api
router.delete('/:postId', authMiddleware, postController.deletePost);

// 댓글 작성 api
router.post('/:postId/comment', authMiddleware, postController.writeComment);

// 댓글 작성 api
router.put('/:postId/comment', authMiddleware, postController.modifyComment);

// 댓글 작성 api
router.delete('/:postId/comment', authMiddleware, postController.deleteComment);

/** api 구간 종료 */





module.exports = router;