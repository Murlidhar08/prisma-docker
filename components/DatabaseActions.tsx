"use client";

import { useState } from "react";
import { createUser, getAllUsers } from "@/app/actions";

export default function DatabaseActions() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState<string>("");

    const handleAction = async (type: "create" | "fetch") => {
        setLoading(true);
        setActionType(type);
        try {
            const result = type === "create" ? await createUser() : await getAllUsers();
            setData(result);
        } catch (error) {
            console.error(`Error during ${type}:`, error);
            setData({ error: "Failed to perform action" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-xl bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                Prisma Database Actions
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <button
                    onClick={() => handleAction("create")}
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all font-semibold shadow-sm hover:shadow-md cursor-pointer flex-1 min-w-[200px]"
                >
                    {loading && actionType === "create" ? "Creating..." : "Create Random User"}
                </button>
                <button
                    onClick={() => handleAction("fetch")}
                    disabled={loading}
                    className="px-6 py-3 bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-all font-semibold shadow-sm hover:shadow-md cursor-pointer flex-1 min-w-[200px]"
                >
                    {loading && actionType === "fetch" ? "Fetching..." : "Fetch All Users"}
                </button>
            </div>

            {data && (
                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Result Output</h3>
                        <button 
                            onClick={() => setData(null)}
                            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg max-h-64 overflow-auto border border-zinc-100 dark:border-zinc-700">
                        <pre className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-400 italic">
                    These actions perform real operations on the PostgreSQL database via Prisma.
                </p>
            </div>
        </div>
    );
}
