export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center px-4 text-center">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">
                    Developer Playground
                </h1>
                <p className="mt-3 text-lg text-muted-foreground max-w-xl">
                    A minimal playground for Next.js, Auth.js and UI components.
                </p>
            </div>
        </main>
    );
}
