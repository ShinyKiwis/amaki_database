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
        const data = res.rows[0]
        if(data.password == password){
          return true;
        }
        return false
    } catch (error) {
        console.log(error.message)
        return false
    }
}

async function getCategory() {
    try {
        const res = await client.query("SELECT DISTINCT category_name FROM product_category")
        const data = res.rows
        return data
    } catch (error) {
        console.log(error)
    }
}

async function 


async function run() {
    const res = await getCategory();
    console.log(res)
}


run()

module.exports = {
    authentication
}