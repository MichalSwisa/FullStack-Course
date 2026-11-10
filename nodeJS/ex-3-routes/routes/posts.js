import express from "express";
import commentsRouter from "./comments.js";
const router = express.Router();
const posts = [{ id: 1, title: 'Hello' }];

router.get('/posts', (req, res) => {
    res.json(posts);
});

router.get('/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    }
});

router.use('/posts/:postId/comments', commentsRouter);

export default router;
export { posts };


//export const posts = [{ id: 1, title: 'Hello' }];
//export const comments = { 1: [] };


// import express from 'express';
// const app = express();
// app.use(express.json());

// const posts = [{ id: 1, title: 'Hello' }];
// const comments = { 1: [] };

// app.get('/posts', (req, res) => {
//     res.json(posts);
// });

// app.get('/posts/:postId/comments', (req, res) => {
//     const pid = req.params.postId;
//     res.json(comments[pid] || []);
// });

// app.post('/posts/:postId/comments', (req, res) => {
//     const pid = req.params.postId;
//     const newComment = { id: Date.now(), text: req.body.text };
//     comments[pid] = comments[pid] || [];
//     comments[pid].push(newComment);
//     res.status(201).json(newComment);
// });

// app.listen(3000, () => console.log('Running'));