// Add middleware / dependencies
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Array of meals to serve
let meals = [
    { id: 1, meal: "Chicken Parmesan" },
    { id: 2, meal: "Spaghetti and Mealballs" },
    { id: 3, meal: "Shrimp Scampi" },
    { id: 4, meal: "TSteak Fajitas" },
    { id: 5, meal: "Mongolian Beef" },
    { id: 6, meal: "Pepperoni Piza" }
  ];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the root entry point for the REST API
app.get('/', (req, res) => {
  res.send('Welcome to the Meals REST API. Visit /meals to see the list.');
});

// Define a route to retrieve all meals
app.get('/meals', (req, res) => {
    res.send(meals);
  });

// Define a route to add a new meal
app.post('/meals', (req, res) => {
  // Generate a new ID for the joke
  const newId = meals[meals.length - 1].id + 1;

  // Get the meal from the request body
  const meal = req.body;
  
    console.log({ id: newId, meal: meal });
    meals.push({ id: newId, meal: meal });
    res.send({ id: newId, meal: meal });
  });

// Define a route to delete a meal
app.delete('/meals/:id', (req, res) => {
    // Get the joke ID from the request parameters
    const mealId = req.params.id;
    
    const mealIndex = meals.findIndex(meal => meal.id == mealId);
    
    meals.splice(mealIndex, 1);
    
    res.send({ message: "Meal deleted successfully" });
  });

app.listen(port, () => console.log(`Meals API listening on port ${port}!`));

