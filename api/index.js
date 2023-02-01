const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PATCH, POST, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const queries = parsedUrl.query;

  console.log(`? ${req.method} ${parsedUrl.pathname}`, queries);

  switch (`${req.method} ${parsedUrl.pathname}`) {
    case "GET /car-numbers":
      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
      res.writeHead(200, { "Content-Type": "application/json" });

      break;

    case "GET /is-number-valid":
      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) throw err;
        if (!queries.carNumber) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end("Invalid Request: No carNumber presented");
        }

        console.log(data);

        res.end(
          JSON.stringify({
            valid: !JSON.parse(data).carNumbers.some(
              (existedCarNumber) => existedCarNumber.number === queries.carNumber
            ),
          })
        );
      });
      res.writeHead(200, { "Content-Type": "application/json" });

      break;

    case "POST /add-car-number":
      req.on("data", (numberToAdd) => {
        fs.readFile("database.json", "utf8", (err, data) => {
          if (err) throw err;
          const carNumbersData = JSON.parse(data);

          carNumbersData.carNumbers.unshift(JSON.parse(numberToAdd));

          fs.writeFile(
            "database.json",
            JSON.stringify(carNumbersData),
            (err) => {
              if (err) throw err;
              console.log(`New Entity: ${numberToAdd}`);
              res.end(numberToAdd);
            }
          );
        });

        res.writeHead(200, { "Content-Type": "application/json" });
      });

      break;

    case "PATCH /update-car-number":
      req.on("data", (carNumberToUpdate) => {
        fs.readFile("database.json", "utf8", (err, data) => {
          if (err) throw err;
          const carNumbersData = JSON.parse(data);
          const numberToUpdate = JSON.parse(carNumberToUpdate);

          carNumbersData.carNumbers = carNumbersData.carNumbers.map(
            (carNumber) => {
              if (carNumber.number === numberToUpdate.number) {
                return numberToUpdate;
              }

              return carNumber;
            }
          );

          fs.writeFile(
            "database.json",
            JSON.stringify(carNumbersData),
            (err) => {
              if (err) throw err;
              console.log(`Updated entity: ${carNumberToUpdate}`);
              res.end(carNumberToUpdate);
            }
          );
        });

        res.writeHead(200, { "Content-Type": "application/json" });
      });

      break;

    case "DELETE /delete-car-number":
      if (!queries.carNumber) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Invalid Request: No carNumber presented");
      }

      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) throw err;
        const carNumbersData = JSON.parse(data);
        const numberToDelete = queries.carNumber;

        carNumbersData.carNumbers = carNumbersData.carNumbers.filter(
          (carNumber) => numberToDelete !== carNumber.number
        );

        fs.writeFile("database.json", JSON.stringify(carNumbersData), (err) => {
          if (err) throw err;
          console.log(`Deleted entity: ${numberToDelete}`);
          res.end(JSON.stringify({ number: numberToDelete }));
        });
      });

      res.writeHead(200, { "Content-Type": "application/json" });

      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(80, () => {
  console.log("Example app listening on port 80!");
});
