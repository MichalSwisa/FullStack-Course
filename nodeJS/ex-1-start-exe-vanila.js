// --------- q1 ---------
function q1LogRequest() {
    const http = require("http");

    http.createServer((req, res) => {
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.url}`);
        console.log(`HTTP Version: ${req.httpVersion}`);
        res.end(`Method: ${req.method} \nURL: ${req.url} \nHTTP Version: ${req.httpVersion}`);

    }).listen(3000);
}
//q1LogRequest();

// --------- q2 ---------
function q2LogRequest() {
    const http = require("http");
    http.createServer((req, res) => {
        if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
            res.end('JSON accepted');
        } else {
            res.end('Unsupported request');
        }
    }).listen(3000);
}
//q2LogRequest();

// --------- q3 ---------
function q3ManualRout() {
    const http = require("http");

    http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/hello') {
            res.end('Hello from GET');
        } else if (req.method === 'POST' && req.url === '/hello') {
            res.end('Hello from POST');
        } else {
            res.end('Not supported');
        }
    }).listen(3000);
}
q3ManualRout();