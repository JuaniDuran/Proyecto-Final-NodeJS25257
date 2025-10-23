const http = require('http');

const server = http.createServer((req, res) => {
    console.log("request");
    console.log(req);
    console.log("reponse");
    console.log(res);
    console.log("metodo" , req.method);

    res.statusCode = 201;
    res.end('Hello, World!\n');
})

const PORT = 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));