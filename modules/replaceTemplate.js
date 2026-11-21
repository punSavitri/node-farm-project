//replaceTemplate function to replace placeholder with data
module.exports = (temp, product) => {
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