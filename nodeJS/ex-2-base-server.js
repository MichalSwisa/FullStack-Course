import { URL } from "url";

// ---------- q1 ----------
function ReturnAFixedText() {
    const http = require("http");

    http.createServer((req, res) => {
        res.end("Hello from Node Server!");

    }).listen(3000);
}
//ReturnAFixedText();

// ---------- q2 ----------
function ReturnTheRequestMethod() {
    const http = require("http");

    http.createServer((req, res) => {
        res.end(`Method: ${req.method}`);

    }).listen(3000);
}
//ReturnTheRequestMethod();

// ---------- q3 ----------
function ReturnTheRequestHeaders() {
    const http = require("http");

    http.createServer((req, res) => {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(req.headers));

    }).listen(3000);

}
//ReturnTheRequestHeaders();

// ---------- q4 ----------
function ParseAndLogURLParts(urlString) {

    const parsedUrl = new URL(urlString);

    console.log(`Hostname: ${parsedUrl.hostname}`);
    console.log(`Pathname: ${parsedUrl.pathname}`);
    console.log(`Protocol: ${parsedUrl.protocol}`);
    console.log(`Query: ${parsedUrl.search}`);
    console.log(`Hash: ${parsedUrl.hash}`);

}
//ParseAndLogURLParts("http://localhost:3000/users/list?role=admin&active=true#top");

// ---------- q5 ----------
function ExtractQueryParameters(urlString) {
    const parsedUrl = new URL(urlString);
    const queryParams = parsedUrl.searchParams;
    for (const [key, value] of queryParams) {
        console.log(`${key}: ${value}`);
    }
}
//ExtractQueryParameters("https://site.com/products?id=15&type=book&lang=en");

// ---------- q6 ----------
function modifyQueryParameters(urlString) {
    const parsedUrl = new URL(urlString);
    parsedUrl.searchParams.set("sort", "desc");
    parsedUrl.searchParams.set("page", "3");
    parsedUrl.searchParams.delete("query");
    console.log(`Modified URL: ${parsedUrl.toString()}`);
}
//modifyQueryParameters("https://app.com/search?query=node&sort=asc");