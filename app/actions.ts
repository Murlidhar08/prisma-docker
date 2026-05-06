"use server";

import { prisma } from '@/lib/prisma';

export async function getServerData(id: number | string = 1) {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();

    return data;
}

export async function createUser() {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: "John Doe " + Math.floor(Math.random() * 100),
                email: `john.doe.${Math.floor(Math.random() * 1000000)}@prisma.com`
            }
        });
        return { success: true, data: newUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to create user" };
    }
}

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany();
        return { success: true, data: users.length === 0 ? "No users have been added yet." : users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to fetch users" };
    }
}
