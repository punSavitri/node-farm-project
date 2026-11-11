const fs = require("fs");
const http = require("http");
const url = require("url");

//read and load the templates card, overview and product
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//create simple web server
const server = http.createServer((req, res) => {
  //setting up the routes
  const pathName = req.url;

  //overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempOverview);
  } else if (pathName === "/styles/overview-styles.css") {
    const css = fs.readFileSync(
      `${__dirname}/styles/overview-styles.css`,
      "utf-8",
    );
    res.writeHead(200, { "Content-type": "text/css" });
    res.end(css);
    //product page
  } else if (pathName === "/product") {
    res.end("This is product page");
    //api page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    //page not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});
//listen the incoming request from client
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the request on port 8000");
});
