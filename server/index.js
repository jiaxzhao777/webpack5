const http = require("http");
const getDataList = require("./mockData.js");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url == "/getInfo") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("retry: 10000\n");
    let interval = setInterval(function () {
      res.write("data: " + JSON.stringify(getDataList()) + "\n\n");
    }, 1000 * 5);
    req.connection.addListener(
      "close",
      function () {
        clearInterval(interval);
      },
      false
    );
  }
  res.end();
});

module.exports = server;
