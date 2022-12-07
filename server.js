const { getCategory, getProductByCategory, sortPrice, sortStock } = require("./main.js");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3500;

app.use(cors());

app.get("/category", async (req, res) => {
  const data = await getCategory();
  res.send(data);
});

app.get("/category/:category_name", async (req,res)=>{
    const data = await getProductByCategory(req.params.category_name)
    res.send(data)
})

app.get("/sort/:category_name/:trend", async (req,res) => {
    const trend = req.params.trend == 'low' ? '' : req.params.trend 
    const data = await sortPrice(req.params.category_name, trend)
    console.log("DATA: ",data)
    res.send(data)
})

app.get("/sort/:trend", async (req,res) => {
    const trend = req.params.trend == 'low' ? '' : req.params.trend 
    const data = await sortStock(trend)
    res.send(data)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
