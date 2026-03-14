// // index.js (or a script file)
// const connectMongo = require("../config/mongo");
// const Sales = require("../models/salesbanner.models");

// const createBoatSales = async () => {
//   await connectMongo();

//   const boats = [
//     {
//       title: "Luxury Yacht",
//       description: "A premium yacht for leisure cruising and parties.",
//       price: 750000,
//       images: [
//         "https://images.unsplash.com/photo-1562281302-809108fd533c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       ],
//       tags: ["#yacht", "#luxury boats"],
//       created_by: 1,
//       ratings: [],
//     },
//     {
//       title: "Fishing Boat",
//       description: "Small fishing boat perfect for coastal waters and lakes.",
//       price: 15000,
//       images: [
//         "https://images.unsplash.com/photo-1627862079351-7bcdcba0c1f1?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1628971729826-355b07156132?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       ],
//       tags: ["#fishing boat", "#outdoor adventure"],
//       created_by: 1,
//       ratings: [],
//     },
//     {
//       title: "Sailboat",
//       description:
//         "Elegant sailboat ideal for recreational sailing and competitions.",
//       price: 45000,
//       images: [
//         "https://unsplash.com/photos/three-sail-boats-on-water-during-daytime-58AiTToabyE",
//       ],
//       tags: ["#sailboat", "#marine life"],
//       created_by: 1,
//       ratings: [],
//     },
//     {
//       title: "Container Ship",
//       description:
//         "Ocean freight container ship – heavy cargo transport vessel.",
//       price: 185000,
//       images: [
//         "https://plus.unsplash.com/premium_photo-1661962532309-07c1e2270ada?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://plus.unsplash.com/premium_photo-1661964050170-b9e54345217d?q=80&w=1245&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       ],
//       tags: ["#container ship", "#global shipping"],
//       created_by: 1,
//       ratings: [],
//     },
//   ];

//   try {
//     const result = await Sales.insertMany(boats);
//     console.log("Boat sales added:", result);
//   } catch (err) {
//     console.error("Error inserting boats:", err);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// createBoatSales();
