// ! ______________________ INSERT
// INSERT INTO tests (name, value)
// VALUES ('Miya', 123);

// ! ______________________ READ
// SELECT * FROM tests
// WHERE name = 'Miya';

// ! ______________________ UPDATE
// UPDATE tests
// SET value = 999
// WHERE name = 'Miya';

// ! ______________________ DELETE
// DELETE FROM tests
// WHERE name = 'Miya';

// ! ______________________ DELETE COLUMN
// ALTER TABLE tests
// DROP COLUMN value;

// ! ______________________ DELETE COLUMN
// DROP TABLE tests;

// -------------------------------------------------------------
// require("dotenv").config();
// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.PG_URI,
//   ssl: { rejectUnauthorized: false }, //verify certificate
// });

// async function run() {
//   try {
//     const res = await pool.query(`
//             DELETE FROM test_pg
//             WHERE id = 1
//             RETURNING *
//         `);
//     console.log("Row inserted:", res.rows[0]);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     pool.end();
//   }
// }

// run();

// --------------------------------------------------------------
// ? MONGOOSE

require("dotenv").config();
const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected!");

    const testSchema = new mongoose.Schema({
      name: String,
      value: Number,
    });

    const Test = mongoose.model("Test", testSchema);

    const doc = await Test.create({
      name: "Miya",
      value: 123,
    });

    console.log("Document inserted:", doc);
  } catch (err) {
    console.error("Mongo error:", err);
  } finally {
    mongoose.connection.close();
  }
}

run();

// ! ______________________ READ
// Test.find({ name: "Miya" });

// ! ______________________ POST
// async function createDoc() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const doc = await Test.create({
//     name: "Miya",
//     value: 123
//   });

//   console.log(doc);

//   await mongoose.connection.close();
// }

// ! ______________________ GET
// async function getDocs() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const docs = await Test.find({ name: "Miya" });

//   console.log(docs);

//   await mongoose.connection.close();
// }

// ! ______________________ UPDATE
// async function updateDoc() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const updated = await Test.findOneAndUpdate(
//     { name: "Miya" },
//     { $set: { value: 999 } },
//     { new: true }
//   );

//   console.log(updated);

//   await mongoose.connection.close();
// }

// ! ______________________ DELETE
// async function deleteDoc() {
//   await mongoose.connect(process.env.MONGO_URI);

//   await Test.deleteOne({ name: "Miya" });

//   console.log("Deleted");

//   await mongoose.connection.close();
// }

// ! for operations
// | Operator | What it does      |
// | -------- | ----------------- |
// | `$set`   | Change value      |
// | `$inc`   | Increase number   |
// | `$unset` | Remove field      |
// | `$push`  | Add to array      |
// | `$pull`  | Remove from array |

// ! Delete
// await Test.deleteMany({ value: 123 });
// await Test.deleteOne({ name: "Miya" });

// ! Drop collections
// await mongoose.connection.dropCollection("tests");
// await Test.collection.drop();
