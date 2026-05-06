"use client";

import { useState } from "react";

export default function ClientFetcher() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState("1");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-xl bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Client-Side Fetching</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    className="w-20 px-3 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    placeholder="ID"
                />
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium cursor-pointer"
                >
                    {loading ? "Fetching..." : "Fetch Post (Client)"}
                </button>
            </div>

            {data && (
                <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <pre className="text-sm overflow-auto text-zinc-700 dark:text-zinc-300">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
