const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  setHeaders(res);

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
      patchHandler(req, res, pathname);
      break;

    case "DELETE":
      deleteHandler(res, pathname, queries);
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const setHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PATCH, POST, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
};

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

        if (queries.carNumber) {
          if (typeof queries.carNumber !== "string") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ error: "Invalid number. It should be string" })
            );

            return;
          }

          if (!validateNumber(queries.carNumber)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error: "Invalid number. It should satisfy the pattern AAA000",
              })
            );

            return;
          }

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

        res.writeHead(200, { "Content-Type": "application/json" });
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
        const receivedCarNumber = JSON.parse(numberToAdd);

        if (typeof receivedCarNumber.number !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Invalid number. It should be string" })
          );

          return;
        }

        if (!validateNumber(receivedCarNumber.number)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Invalid number. It should satisfy the pattern AAA000",
            })
          );

          return;
        }

        if (typeof receivedCarNumber.holder !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Invalid holder. It should be string" })
          );

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
        const receivedCarNumber = JSON.parse(carNumberToUpdate);

        if (typeof receivedCarNumber.number !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Invalid number. It should be string" })
          );

          return;
        }

        if (!validateNumber(receivedCarNumber.number)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Invalid number. It should satisfy the pattern AAA000",
            })
          );

          return;
        }

        if (typeof receivedCarNumber.holder !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Invalid holder. It should be string" })
          );

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
          const numberToUpdate = JSON.parse(carNumberToUpdate);
          let updatedNumber;

          carNumbersData.carNumbers = carNumbersData.carNumbers.map(
            (carNumber) => {
              if (carNumber.number === numberToUpdate.number) {
                updatedNumber = { ...carNumber, holder: numberToUpdate.holder };
                return updatedNumber;
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
        res.end(
          JSON.stringify({ error: "Invalid Request: No carNumber presented" })
        );

        return;
      }

      if (typeof queries.carNumber !== "string") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Invalid number. It should be string" })
        );

        return;
      }

      if (!validateNumber(queries.carNumber)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Invalid number. It should satisfy the pattern AAA000",
          })
        );

        return;
      }

      fs.readFile("database.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Error while database connection" }));

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

const validateNumber = (number) => {
  return /^[A-Z]{3}\d{3}$/.test(`${number}`);
};

server.listen(80, () => {
  console.log("CarN Back-End listening on port 80!");
});
