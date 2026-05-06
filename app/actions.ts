"use server";

export async function getServerData(id: number | string = 1) {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();

    return data;
}
