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
          if(isInvalidNumber(res, queries.carNumber)) {
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

        if(isInvalidNumber(res, receivedCarNumber.number)) {
          return;
        }

        if(isInvalidHolder(res, receivedCarNumber.holder)) {
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

          if(notUniqueNumber(res, receivedCarNumber.number, carNumbersData.carNumbers)) {
            return;
          }

          const newCarNumber = {
            ...receivedCarNumber,
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

        if(isInvalidNumber(res, receivedCarNumber.number)) {
          return;
        }

        if(isInvalidHolder(res, receivedCarNumber.holder)) {
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

          let updatedNumber;

          carNumbersData.carNumbers = carNumbersData.carNumbers.map(
            (carNumber) => {
              if (carNumber.number === receivedCarNumber.number) {
                updatedNumber = { ...carNumber, holder: receivedCarNumber.holder };
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

      if(isInvalidNumber(res, queries.carNumber)) {
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

const isInvalidNumber = (res, number) => {
  if (typeof number === "undefined") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "\"number\" field is required" })
    );

    return true;
  }

  if (typeof number !== "string") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "Invalid number. It should be string" })
    );

    return true;
  }

  if (!validateNumber(number)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Invalid number. It should satisfy the pattern AAA000",
      })
    );

    return true;
  }

  return false
}

const isInvalidHolder = (res, holder) => {
  if (typeof holder === "undefined") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "\"holder\" field is required" })
    );

    return true;
  }

  if (typeof holder !== "string") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "Invalid holder. It should be string" })
    );

    return true;
  }

  return false;
}

const notUniqueNumber = (res, number, existingCarNumbers) => {
  if(existingCarNumbers.some((existingCarNumber) => existingCarNumber.number === number)){
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "Number is not unique" })
    );

    return true;
  }

  return false;
}

server.listen(80, () => {
  console.log("CarN Back-End listening on port 80!");
});
