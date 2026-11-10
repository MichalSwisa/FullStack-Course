import express from 'express';
import greetRouter from './routes/greet.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();

// ------------ q1 ------------
app.use(greetRouter);

// ----------- q2 ------------
app.use(express.json());
app.use(usersRouter);

// ----------- q3 ------------
app.use(postsRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});