const express = require('express');
const app = express();
const port = 3000;

// ------------ ex1 ------------
function basicGetServer() {
    app.get('/greet', (req, res) => {
        res.send({ "msg": `hi from get endpoint ${new Date().toISOString()}` })
    }).listen(port);
}
//basicGetServer()

// ------------ ex2 ------------
function getServerWithRoutes() {
    app.get('/greet/:name', (req, res) => {
        console.log(`i got name ${req.params.name}`)
        res.send({ "msg": `got name: ${req.params.name}` })
    });
    app.get('/test', async (req, res) => {
        const name = "Alice";

        try {
            const response = await fetch(`http://localhost:3000/greet/${name}`);
            const data = await response.json();

            if (
                response.ok &&
                Object.hasOwn(data, "msg") &&
                data.msg === `got name: ${name}`
            ) {
                res.json({ result: "ok" });
            } else {
                res.json({ result: "fail" });
            }
        } catch (error) {
            res.json({ result: "fail" });
        }
    })
    app.listen(port);
}
//getServerWithRoutes();

// ------------ ex3 ------------
function actionBasedPOSTEndpoint() {
    app.use(express.json());

    app.post('/action', async (req, res) => {
        const body = req.body;
        if (!body ||
            typeof body !== 'object' ||
            Array.isArray(body) ||
            Object.keys(body).length !== 1 ||
            !["joke", "cat fact"].includes(body.action)
        ) {
            return res.status(400).json({
                msg: "body is malformed"
            });
        } else if (req.body.action === "joke") {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    "Accept": "application/json",
                }
            });
            const data = await response.json();
            res.json({ "joke": data.joke.toUpperCase() });

        } else if (req.body.action === "cat fact") {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11", {
                headers: {
                    "x-api-key": "live_SjvIjh0shWjkidKvNbvQcdTHkBUZNFr2E3mnK9HeCG3mlJP6xY3mvuA6Re471M0k"
                }
            });
            const data = await response.json();
            res.json({ "length": data.length });
        }
        res.json({ msg: "valid action" });
    }).listen(port)
}
actionBasedPOSTEndpoint();