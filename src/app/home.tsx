export default async function Home() {
  return (
    <main className="flex size-full flex-col items-center justify-center gap-2 p-12 text-center">
      <h2 className="text-6xl font-semibold">
        Remember all your travels with{' '}
        <span className="text-sky-400">TravelVault</span>
      </h2>
      <p className="text-neutral-300">Create a new travel to get started</p>
    </main>
  );
}
