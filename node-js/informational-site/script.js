import http from "http";
import fs from "fs";

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("index.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (req.url === "/about") {
      fs.readFile("about.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (req.url === "/contact-me") {
      fs.readFile("contact-me.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else {
      fs.readFile("404.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    }
  })
  .listen(6969, () => {
    console.log("Listening on port 6969.....");
  });
