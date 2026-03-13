require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: { rejectUnauthorized: false },
});

async function makeTable() {
  try {
    await pool.query(`
    CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(24),  
    quantity INT DEFAULT 1,
    total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

    console.log("Orders table updated successfully ✅");
  } catch (err) {
    console.error("Error updating orders table:", err);
  } finally {
    await pool.end();
  }
}

makeTable();
//     await pool.query(`
//         CREATE TABLE IF NOT EXISTS orders(
//             id SERIAL PRIMARY KEY,
//             user_id INT REFERENCES users(id) ON DELETE CASCADE,
//             status VARCHAR(20) DEFAULT 'pending',
//             total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )
//         `);
//     await pool.query(`
//         CREATE TABLE IF NOT EXISTS order_items(
//             id SERIAL PRIMARY KEY,
//             order_id INT REFERENCES orders(id) ON DELETE CASCADE,
//             product_id VARCHAR(50) NOT NULL,
//             quantity INT NOT NULL,
//             price NUMERIC(10,2) NOT NULL
//             )
//         `);
//     await pool.query(`
//         CREATE TABLE IF NOT EXISTS payments(
//             id SERIAL PRIMARY KEY,
//             order_id INT REFERENCES orders(id) ON DELETE CASCADE,
//             amount NUMERIC(10,2) NOT NULL,
//             payment_method VARCHAR(20) NOT NULL,
//             status VARCHAR(20) DEFAULT 'pending',
//             transaction_id VARCHAR(100) UNIQUE,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )
//         `);
//     console.log("Tables made");
//   } catch (err) {
//     console.log("error: ", err);
//   } finally {
//     await pool.end();
//   }
// }
// makeTable();

// ________________________________________________________

// require("dotenv").config();
// const mongoose = require("mongoose");

// const ps = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   images: [String],
//   tags: [String],
//   created_by: String,
//   ratings: [Number],
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });

// const cs = new mongoose.Schema({
//   product_id: String,
//   user_id: String,
//   content: String,
//   rating: Number,
//   replies: [
//     {
//       user_id: String,
//       content: String,
//       created_at: { type: Date, default: Date.now },
//     },
//   ],
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });

// const bs = new mongoose.Schema({
//   title: String,
//   image: String,
//   link: String,
//   active: Boolean,
//   start_date: Date,
//   end_date: Date,
// });

// const Product = mongoose.model("Product", ps);
// const Comment = mongoose.model("Comment", cs);
// const Salesbanner = mongoose.model("SalesBanner", bs);

// async function mongoConnect() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Mongo connected");
//   } catch (error) {
//     console.log("Mongo error:", error);
//   }
// }

// module.exports = {
//   mongoConnect,
//   Product,
//   Comment,
//   Salesbanner,
// };
