const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://localhost:8080/`);
  let fileName = "";
  myURL.pathname === "/" ? (fileName = `index`) : (fileName = myURL.pathname);

  fs.readFile(`./${fileName}.html`, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(
        fs.readFile("./404.html", (err, data) => {
          if (err) throw err;
          return data;
        })
      );
      return res.end();
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
  //res.writeHead("This is the response from the server");
  //res.end();
});

server.listen(8080, () => {
  console.log("Server is Running");
});
