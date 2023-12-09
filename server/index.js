const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Environments variable
const port = process.env.PORT || 5000;
const userId = process.env.DB_USERID;
const pass = process.env.DB_PASSWORD;

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hmsassignment12-rahmantopi.netlify.app",
    ],
    credentials: "true",
  })
);
app.use(express.json());

app.get("/", (reg, res) => {
  res.send("Hello Server is started");
});
app.listen(port, () => {
  console.log(`App in listening in ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${userId}:${pass}@cluster0.myyqyo8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("hostelManagementSystem");
    const mealsCollection = database.collection("meals");
    const packageCollection = database.collection("packages");
    const upcomingMealCollection = database.collection("upcoming");
    const reviewCollection = database.collection("reviews");
    const userCollection = database.collection("users");

    //GET APIS

    app.get("/allMeals", async (req, res) => {
      console.log("called packages");
      const queryExits = req.query?.page?.length > 0;
      if (queryExits) {
        const page = req.query?.page;
        console.log(req.query?.page.length);
        const mealPerPage = 2;
        const mealInfo = mealsCollection
          .find()
          .skip(page * mealPerPage)
          .limit(mealPerPage);
        const result = await mealInfo.toArray();
        res.send(result);
      } else {
        const mealInfo = mealsCollection.find();
        const result = await mealInfo.toArray();
        res.send(result);
      }
    });

    app.get("/allMeals/:id", async (req, res) => {
      console.log("called packages");
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(id);
      const mealInfo = mealsCollection.find(query);
      const result = await mealInfo.toArray();
      res.send(result);
    });

    app.get("/packages", async (req, res) => {
      console.log("called packages");
      const packageInfos = packageCollection.find();
      const result = await packageInfos.toArray();
      res.send(result);
    });

    app.get("/upcomingMeals", async (req, res) => {
      console.log("called upcomingMeals");
      const upcomingMeals = upcomingMealCollection.find();
      const result = await upcomingMeals.toArray();
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const userList = userCollection.find();
      const result = await userList.toArray();
      res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      console.log("called upcomingMeals");
      const email = req.params.email;
      const query = { email: email };
      console.log("query", query);
      const userList = userCollection.find(query);
      const result = await userList.toArray();
      res.send(result);
    });

    // POST APIS
    app.post("/addMeal", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await mealsCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });

    app.post("/upcomingMeals", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await upcomingMealCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await reviewCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });

    app.post("/packages", async (req, res) => {
      const data = req.body;
      const result = await packageCollection.insertOne(data);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const data = req.body;
      console.log(data);
      const query = { email: data.email };
      console.log(query);
      const dbdata = userCollection.find(query);
      const userExits = await dbdata.toArray();
      console.log(userExits.length);
      if (userExits.length > 0) {
        return res.send({ message: "user already exits", insertedId: null });
      }
      const result = await userCollection.insertOne(data);
      res.send(result);
    });

    // post APi

    app.put("/makeAdmin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const insertOptional = { upsert: true };
      const updatedRole = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(
        query,
        updatedRole,
        insertOptional
      );
      res.send(result);
    });

    app.put("/updatesMeals/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      console.log(updatedData);
      const query = { _id: new ObjectId(id) };
      const insertOptional = { upsert: true };
      const updatedMeal = {
        $set: {
          meal_title: updatedData.meal_title,
          meal_category: updatedData.meal_category,
          meal_image: updatedData.meal_image,
          ingredients: updatedData.ingredients,
          description: updatedData.description,
          price_in_tk: parseInt(updatedData.price_in_tk),
          rating: updatedData.rating,
          like: parseInt(updatedData.like),
          reviews: parseInt(updatedData.reviews),
          distributor_name: updatedData.distributor_name,
          distributor_email: updatedData.distributor_email,
        },
      };
      const result = await mealsCollection.updateOne(
        query,
        updatedMeal,
        insertOptional
      );
      res.send(result);
    });

    app.delete("/deleteMeal/:id", async (req, res) => {
      const mealId = req.params.id;
      const query = { _id: new ObjectId(mealId) };
      console.log(query);
      const result = await mealsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
