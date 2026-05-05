require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("./generated/prisma_client/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const app = express();
const prisma = new PrismaClient({
    adapter,
});

app.use(express.json());

// Get all users
app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(
        users.length == 0
            ? "No users have been added yet."
            : users,
    );
});

// Create user
app.get("/create", async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            name: "John Doe " + Math.floor(Math.random() * 100),
            email: Math.random() + "@prisma.com"
        }
    });
    res.json(newUser);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 