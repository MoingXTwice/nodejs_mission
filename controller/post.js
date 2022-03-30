const Post = require('../schemas/post');
const Comment = require('../schemas/comment');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

/** api 구간 */

// 글 목록 조회 api
async function postList(req, res) {
    const posts = await Post.find({}).sort('-writeDate');

    res.status(200).render('index', {posts,});
}

// 글 번호로 상세보기 api
async function viewPost(req, res) {
    const {postId} = req.params; // request param
    const {user} = res.locals;

    // 글 번호로 글 조회
    const post = await Post.findOne({postId: Number(postId)});
    const comments = await Comment.find({postId}).sort('-commentId');

    if (user === undefined) {
        res.status(200).render('board', {post, comments}); // postId: post.postId 하면 postId만 넘어감 나중에 참고
    } else {
        res.status(200).render('board', {post, comments, nickname: user.nickname});
    }
}

// 글 작성 api
async function writePost(req, res) {
    // 작성한 body의 데이터를 불러옴
    const {title, content} = req.body;
    const {user} = res.locals;

    // 가장 최근 글 Id를 찾음
    const maxPostByPostId = await Post.findOne().sort('-postId').exec();
    // postId는 가장 최근 글 Id에 + 1
    const postId = maxPostByPostId ? maxPostByPostId.postId + 1 : 1;

    // 글 작성시간 입력용
    let writeDate = moment().format('YYYY-MM-DD HH:mm:ss');

    // DB에 입력
    await Post.create({postId, title, content, userId: user.userId, nickname: user.nickname, writeDate});
    res.status(200).json({result: 'success'});
}

// 글 수정 api
// TODO 잘못된 경로로 수정하였을 시 막는 로직 추가해야함
async function modifyPost(req, res) {
    // query parameter로 넘어온 번호를 찾아냄
    const {postId} = req.params;
    // 작성한 body의 데이터를 불러옴
    const {title, content} = req.body;
    // const [post] = await Post.find({postId: Number(postId)});

    await Post.updateOne({postId: Number(postId)}, {$set: {title, content}});
    res.status(200).json({result: 'success', message: '수정이 완료되었습니다.'});
}

// 글 삭제 api
// TODO 잘못된 경로로 삭제하였을 시 막는 로직 추가해야함
async function deletePost(req, res) {
    // query parameter로 넘어온 번호를 찾아냄
    const {postId} = req.params;

    // const [post] = await Post.find({postId: Number(postId)});
    await Post.deleteOne({postId: Number(postId)});
    res.status(200).json({result: 'success', message: '글 삭제가 완료되었습니다.'});

}

// 댓글 작성 api
async function writeComment(req, res) {
    // 작성한 body의 데이터를 불러옴
    const {content} = req.body;
    const {postId} = req.params;
    const {user} = res.locals;


    // 가장 최근 댓글 Id를 찾음
    const maxPostByCommentId = await Comment.findOne().sort('-commentId');
    // postId는 가장 최근 글 Id에 + 1
    const commentId = maxPostByCommentId ? maxPostByCommentId.commentId + 1 : 1;

    // DB에 입력
    await Comment.create({
        commentId,
        postId,
        userId: user.userId,
        content,
        nickname: user.nickname,
    });
    res.status(200).json({result: 'success'});
}


// 댓글 수정 api
async function modifyComment(req, res) {
    // 작성한 body의 데이터를 불러옴
    const {content, commentId} = req.body;

    // DB에 입력
    await Comment.updateOne({commentId}, {$set: {content}});
    res.status(200).json({result: 'success', message:'댓글 수정이 완료되었습니다.'});
}


// 댓글 삭제 api
async function deleteComment(req, res) {
    // 작성한 body의 데이터를 불러옴
    const {commentId} = req.body;

    // DB에 입력
    await Comment.deleteOne({commentId});
    res.status(200).json({result: 'success', message:'댓글이 삭제되었습니다.'});
}


/** api 구간 종료 */


/** 페이지 로딩 구간 */

function writePage(req, res) {
    res.status(200).render('post');
}

async function modifyPage(req, res) {
    const {postId} = req.params;
    const [post] = await Post.find({postId: Number(postId)});

    res.status(200).render('post', {post,});
}

/** 페이지 로딩 구간 종료 */


module.exports = {
    postList,
    viewPost,
    writePost,
    modifyPost,
    deletePost,
    writePage,
    modifyPage,
    writeComment,
    modifyComment,
    deleteComment,
};