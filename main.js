const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "database_assignment",
  password: "minicrip",
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected!");
  }
});

async function authentication(username, password) {
  try {
    const res = await client.query(
      `SELECT * FROM customer WHERE username='${username}'`
    );
    const data = res.rows[0];
    if (data.password == password) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function getCategory() {
  try {
    const res = await client.query(
      "SELECT DISTINCT category_name FROM product_category"
    );
    const data = res.rows;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductByCategory(category) {
  try {
    const res = await client.query(`
            SELECT  product.product_name, product.price, product.available_stock, supply_product.supplier_id
            FROM product_category
            JOIN category_of_product ON product_category.category_id = category_of_product.category_id
            JOIN product ON product.pid = category_of_product.product_id
            JOIN supply_product ON supply_product.product_id = product.pid
            WHERE product_category.category_name = '${category}'
        `);

    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function sortPrice(category, trend = "") {
  try {
    const res = await client.query(`
        SELECT  product.product_name, product.price, product.available_stock
        FROM product_category
        JOIN category_of_product ON product_category.category_id = category_of_product.category_id
        JOIN product ON product.pid = category_of_product.product_id
        WHERE product_category.category_name = '${category}'
        ORDER BY product.price ${trend}`)
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function sortStock(trend){
    try {
        const res = await client.query(`
            SELECT  product_name, price, available_stock
            FROM product
            ORDER BY available_stock ${trend};
        `)
        return res.rows
    } catch (error) {
        
    }
} 

async function insertSupplier(counter, shop_name, address, tel, email) {
  try {
    const res = client.query(`
        INSERT INTO supplier(supplier_id, supplier_name, supplier_phone_number)
        VALUES
        (${counter}, '${shop_name}', '${tel}')

        `);

    return true;
  } catch (error) {
    return false;
  }
}

async function insertProduct(counter, product_name, price, stock) {
  try {
    const res = client.query(`
        INSERT INTO product (pid, sale_number, price, product_name, time_posted, available_stock, description)
        VALUES
        (${counter}, 'E0026', ${price}, '${product_name}', '2022-04-26 05:04:05', ${stock}, 'Compatible with iPad mini')`);

    return true;
  } catch (error) {
    return false;
  }
}

async function run() {
  const res = await sortStock("");
  console.log(res);
}

run();

module.exports = {
  authentication,
  getCategory,
  getProductByCategory,
  sortPrice,
  insertProduct,
  insertSupplier,
  sortStock
};
