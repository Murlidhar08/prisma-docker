import Image from "next/image";
import ClientFetcher from "@/components/ClientFetcher";
import ServerFetcher from "@/components/ServerFetcher";
import ServerEnvInfo from "@/components/ServerEnvInfo";
import DatabaseActions from "@/components/DatabaseActions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <header className="mb-12 flex flex-col items-center gap-4">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={24}
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Node.js Environment Test
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Validating Next.js features for self-hosted Node.js deployment
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <ServerEnvInfo />
        <DatabaseActions />
        <ClientFetcher />
        <ServerFetcher />
      </main>

      <footer className="mt-16 text-sm text-zinc-500">
        Standalone Build Ready • Built with Next.js App Router
      </footer>
    </div>
  );
}
