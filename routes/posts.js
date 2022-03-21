const router = require('express').Router();
const Post = require('../schemas/post');

router.get('/', (req, res) => {
    res.send('this is root page');
});

// 글 목록 조회 api
router.get('/post', async (req, res) => {
    const posts = await Post.find({}).sort('-writeDate').exec();

    res.status(200).render('index', {posts, });
});

// 글 번호 조회 api
router.get('/post/:postId', async (req, res) => {
    const {postId} = req.params; // request param

    // 글 번호로 글 조회
    const [post] = await Post.find({postId: Number(postId)});

    res.status(200).render('board', {post, }); // postId: post.postId 하면 postId만 넘어감 나중에 참고
});

router.get('/write', (req, res) => {
    res.status(200).render('post');
});

// 글 작성 api
router.post('/post', async (req, res) => {
    // 작성한 body의 데이터를 불러옴
    const {title, content, writer, password} = req.body;

    // 가장 최근 글 Id를 찾음
    const maxPostByPostId = await Post.findOne().sort('-postId').exec();
    // postId는 가장 최근 글 Id에 + 1
    const postId = maxPostByPostId ? maxPostByPostId.postId + 1 : 1;

    // 글 작성시간 입력용
    let writeDate = new Date();

    // DB에 입력
    let createdPost = await Post.create({postId, title, content, writer, password, writeDate});
    res.status(200).json({goods: createdPost});
});

// 글 수정 api
router.put('/post/:postId', async (req, res) => {
    // query parameter로 넘어온 번호를 찾아냄
    const {postId} = req.params;
    // 작성한 body의 데이터를 불러옴
    const {title, content, writer, password} = req.body;

    let writeDate = new Date();

    let createdPost = await Post.create({postId, title, content, writer, password, writeDate});
    res.status(200).json({goods: createdPost});
});

// 글 삭제 api
router.delete('/post/:postId', async (req, res) => {
    // query parameter로 넘어온 번호를 찾아냄
    const {postId} = req.params;

    let existPost = await Post.find({postId: Number(postId)});
    if (existPost.length) {
        await Post.deleteOne({postId: Number(postId)});
        res.status(200).json({success: true});
    } else {
        res.status(400).json({errorMessage: '없는 글입니다. 글 번호를 확인해주세요.'});
    }
})


module.exports = router;