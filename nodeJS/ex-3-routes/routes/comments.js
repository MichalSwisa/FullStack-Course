import express from "express";
import { posts } from './posts.js';

const comments = { 1: [] };
const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
    const postId = Number(req.params.postId);

    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    next();
});



router.get('/', (req, res) => {
    const commentsOfPost = comments[req.params.postId] || [];
    res.send(commentsOfPost);
});

router.post('/', (req, res) => {
    const postId = req.params.postId;
    const newComment = { id: Date.now(), text: req.body.text };
    comments[postId] = comments[postId] || [];
    comments[postId].push(newComment);
    res.status(201).json(newComment);
});

export default router;