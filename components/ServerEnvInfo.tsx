import { headers } from "next/headers";

export default async function ServerEnvInfo() {
    const headerList = await headers();
    const host = headerList.get("host");
    const userAgent = headerList.get("user-agent");
    const protocol = headerList.get("x-forwarded-proto") || "http";
    const ip = headerList.get("x-forwarded-for") || "Localhost";

    const serverTime = new Date().toLocaleString();
    const nodeVersion = process.version;
    const env = process.env.NODE_ENV;

    return (
        <div className="p-6 border rounded-xl bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                Node.js Server Environment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Server Info</h3>
                    <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
                        <li><span className="font-medium text-purple-600 dark:text-purple-400">Node Version:</span> {nodeVersion}</li>
                        <li><span className="font-medium text-purple-600 dark:text-purple-400">Environment:</span> {env}</li>
                        <li><span className="font-medium text-purple-600 dark:text-purple-400">Server Time:</span> {serverTime}</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Request Headers</h3>
                    <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
                        <li className="truncate"><span className="font-medium text-purple-600 dark:text-purple-400">Host:</span> {host}</li>
                        <li><span className="font-medium text-purple-600 dark:text-purple-400">IP:</span> {ip}</li>
                        <li className="truncate"><span className="font-medium text-purple-600 dark:text-purple-400">User Agent:</span> {userAgent?.substring(0, 40)}...</li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <p className="text-xs text-zinc-400 italic">
                    This component is rendered on the server for every request.
                </p>
                <a
                    href="/"
                    className="text-xs font-semibold text-purple-600 hover:text-purple-500 underline underline-offset-4"
                >
                    Refresh Server Data
                </a>
            </div>
        </div>
    );
}
