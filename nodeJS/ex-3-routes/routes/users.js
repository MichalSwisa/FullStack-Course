import express from "express";
const router = express.Router();
let users = [{ id: 1, name: 'Alice' }];

router.get('/users', (req, res) => {
    res.json(users);
});

router.post('/users', (req, res) => {
    if (typeof req.body?.name !== "string" || !req.body.name.trim()) {
        return res.status(400).json({
            error: "Valid name is required"
        });
    }
    const newUser = { id: Date.now(), name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name: req.body.name };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});



router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

export default router;


// import express from 'express';
// const app = express();
// app.use(express.json());

// let users = [{ id: 1, name: 'Alice' }];

// app.get('/users', (req, res) => {
//   res.json(users);
// });

// app.post('/users', (req, res) => {
//   const newUser = { id: Date.now(), name: req.body.name };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // More routes...

// app.listen(3000, () => {
//   console.log('Server running');
// });

