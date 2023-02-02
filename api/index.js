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
  const pathname = parsedUrl.pathname;

  switch (req.method) {
    case "GET":
      getHandler(res, pathname, queries);
      break;

    case "POST":
      postHandler(req, res, pathname);
      break;

    case "PATCH":
      patchHandler(req, res, pathname)
      break;

    case "DELETE":
      deleteHandler(res, pathname, queries)
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const getHandler = (res, pathname, queries) => {
  switch (pathname) {
    case "/car-numbers":
      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Error while database connection" }));

          return;
        }

        const parsedData = JSON.parse(data);

        res.writeHead(200, { "Content-Type": "application/json" });

        if (queries.carNumber) {
          res.end(
            JSON.stringify({
              valid: !parsedData.carNumbers.some(
                (existedCarNumber) =>
                  existedCarNumber.number === queries.carNumber
              ),
            })
          );

          return;
        }

        res.end(data);
      });
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
};

const postHandler = (req, res, pathname) => {
  switch (pathname) {
    case "/car-numbers":
      req.on("data", (numberToAdd) => {
        fs.readFile("database.json", "utf8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ error: "Error while database connection" })
            );

            return;
          }

          const carNumbersData = JSON.parse(data);
          const newCarNumber = {
            ...JSON.parse(numberToAdd),
            registerDate: new Date(),
          };
          carNumbersData.carNumbers.unshift(newCarNumber);

          fs.writeFile(
            "database.json",
            JSON.stringify(carNumbersData),
            (err) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({ error: "Error while writing to database" })
                );
                return;
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(newCarNumber));
            }
          );
        });
      });

      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
};

const patchHandler = (req, res, pathname) => {
  switch (pathname) {
    case "/car-numbers":
      req.on("data", (carNumberToUpdate) => {
        fs.readFile("database.json", "utf8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ error: "Error while database connection" })
            );

            return;
          }

          const carNumbersData = JSON.parse(data);
          const numberToUpdate = JSON.parse(carNumberToUpdate);
          let updatedNumber;

          carNumbersData.carNumbers = carNumbersData.carNumbers.map(
            (carNumber) => {
              if (carNumber.number === numberToUpdate.number) {
                updatedNumber = { ...carNumber, holder: numberToUpdate.holder };
                return updatedNumber
              }

              return carNumber;
            }
          );

          fs.writeFile(
            "database.json",
            JSON.stringify(carNumbersData),
            (err) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({ error: "Error while writing to database" })
                );

                return;
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(updatedNumber));
            }
          );
        });
      });

      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
};

const deleteHandler = (res, pathname, queries) => {
  switch (pathname) {
    case "/car-numbers":
      if (!queries.carNumber) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Invalid Request: No carNumber presented");

        return;
      }

      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Error while database connection" })
          );

          return;
        }
        const carNumbersData = JSON.parse(data);
        const numberToDelete = queries.carNumber;

        carNumbersData.carNumbers = carNumbersData.carNumbers.filter(
          (carNumber) => numberToDelete !== carNumber.number
        );

        fs.writeFile("database.json", JSON.stringify(carNumbersData), (err) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ error: "Error while writing to database" })
            );

            return;
          }

          res.writeHead(204, { "Content-Type": "application/json" });
          res.end();
        });
      });
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
};

server.listen(80, () => {
  console.log("Example app listening on port 80!");
});
