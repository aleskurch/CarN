const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  switch (req.method + " " + req.url) {
    case "GET /":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World!" }));
      break;
    case "GET /car-numbers":
      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
      res.writeHead(200, { "Content-Type": "application/json" });

      break;

    case "POST /car-numbers":
      req.on('data', (chunk) => {
        fs.readFile("database.json", "utf8", (err, data) => {
          if (err) throw err;
          const carNumbersData = JSON.parse(data);

          carNumbersData.carNumbers.unshift(JSON.parse(chunk));

          fs.writeFile('database.json', JSON.stringify(carNumbersData), (err) => {
            if (err) throw err;
            console.log('The data was added to the file');
            res.end(chunk);
          });
        });

        res.writeHead(200, { "Content-Type": "application/json" });
      })

      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
