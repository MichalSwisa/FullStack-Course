import express from "express";
const router = express.Router();

router.get('/greet', (req, res) => {
    res.json({ msg: 'Hello from /greet!' });
});

export default router;

// import express from 'express';
// const app = express();

// app.get('/greet', (req, res) => {
//   res.json({ msg: 'Hello from /greet!' });
// });

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });
