const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/images", express.static("images"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jewel2",
});

app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  connection.query(sql, (err, result) => {
    if (err)
      return res.status(404).json({ message: `خطایی رخ داده است : ${err}`, status:404 });
    return res.json(result);
  });
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `products` WHERE id = ?";
  connection.query(sql, id, (err, result) => {
    if (err) return res.json({ message: err });
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: `محصول با شناسه ${id} یافت نشد.`, status: 404 });
    }
    return res.json(result[0]);
  });
});

app.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql =
    "INSERT INTO `users`(`name`, `username`, `email`, `password`) VALUES (?,?,?,?)";

  connection.query(
    sql,
    [name, username, email, hashedPassword],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: "خطایی در سمت سرور رخ داده است", status: 500 });
      res
        .status(200)
        .send({ message: "کاربر با موفقیت ثبت نام شد", status: 200 });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";

  connection.query(sql, [username], (err, results) => {
    if (err)
      return res.status(500).send({ message: "خطا در سمت سرور", status: 500 });
    if (results.length === 0)
      return res.status(404).send({ message: "کاربر یافت نشد", status: 404 });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({
        auth: false,
        token: null,
        message: "رمز نادرست است!",
        status: 401,
      });

    const token = jwt.sign({ id: user.id }, "JeWel2313", { expiresIn: 3600 });

    res.status(200).send({
      auth: true,
      token: token,
      status: 200,
      message: "کاربر با موفقیت وارد شد!",
    });
  });
});

app.get("/getuser", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(403).send({ message: "عدم دریافت توکن", status: 403 });

  jwt.verify(token, "JeWel2313", (err, decoded) => {
    if (err)
      return res.status(401).send({ message: "توکن نامعتبر!", status: 401 });

    const userId = decoded.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    connection.query(sql, [userId], (err, results) => {
      if (err)
        return res
          .status(500)
          .send({ message: "خطای پایگاه داده", status: 500 });

      if (results.length === 0) {
        return res.status(404).send({ message: "کاربر پیدا نشد", status: 404 });
      }
      res.json(results[0]);
    });
  });
});

app.post("/purchase", (req, res) => {
  const userId = req.body[0];
  const products = req.body;
  products.shift();

  products.forEach((product) => {
    const query =
      "INSERT INTO user_products (user_id, product_id, quantity) VALUES (?, ?, ?)";
    connection.query(
      query,
      [userId, product.id, product.quantity],
      (err, result) => {
        if (err) {
          console.error("Database Error:", err); // Log the error
          return res
            .status(500)
            .json({ error: "خطا در اضافه شدن محصول به پایگاه داده" });
        }
      }
    );
  });

  res.status(200).json({ message: "ذخیره در دیتابیس موفقیت‌آمیز بود." });
});

app.post("/getPurchasedProducts", (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "ایدی کاربر الزامیست" });
  }

  const query = `
      SELECT p.id, p.title, p.description, p.price, p.category, p.image, p.raiting, up.quantity
      FROM user_products up
      JOIN products p ON up.product_id = p.id
      WHERE up.user_id = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("خطای پایگاه داده:", err);
      return res.status(500).json({ error: "خطای دریافت محصولات" });
    }

    res.status(200).json({ products: results });
  });
});

app.listen(8081, () => {
  console.log("Connect to server...");
});
