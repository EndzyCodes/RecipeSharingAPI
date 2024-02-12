const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://user1:<password>@recipeapi.fvrldkc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const recipe = await recipeController.createRecipe(req, res);
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await recipeController.getAllRecipes(req, res);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await recipeController.getRecipeById(req, res);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a recipe
app.put('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await recipeController.updateRecipe(req, res);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
    try {
        await recipeController.deleteRecipe(req, res);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
