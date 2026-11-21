const fs = require("fs");
const http = require("http");
const url = require("url");

//replaceTemplate function to replace placeholder with data
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%productname%}/g, product.productName);
  output = output.replace(/{%image%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%productfrom%}/g, product.from);
  output = output.replace(/{%productnutrientsname%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/g, product.id);

  //condition
  if (!product.organic)
    output = output.replace(/{%not_organic%}/g, "not-organic");
  return output;
};
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
  //console.log(req.url);
  //console.log(url.parse(req.url, true));
  //setting up the routes
  //parsing variable from URLs
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    //loop through dataObj to replace a placeholder with actual data
    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    //console.log(cardsHTML);
    const output = tempOverview.replace("{%product-cards%}", cardsHTML);
    res.end(output);
    //added routes to styles template-overview page
  } else if (pathname === "/styles/overview-styles.css") {
    const css = fs.readFileSync(
      `${__dirname}/styles/overview-styles.css`,
      "utf-8",
    );
    res.writeHead(200, { "Content-type": "text/css" });
    res.end(css);

    //product page
  } else if (pathname === "/product") {
    //console.log(query);
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //set up routes to style product page
  } else if (pathname === "/styles/product-styles.css") {
    const css = fs.readFileSync(
      `${__dirname}/styles/product-styles.css`,
      "utf-8",
    );
    res.writeHead(200, { "Content-type": "text/css" });
    res.end(css);

    //API Routes
  } else if (pathname === "/api") {
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
