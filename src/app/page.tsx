export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-zinc-900">
          Welcome to InvoLuck!
        </h1>

        <p className="text-xl text-gray-600 font-medium">
          Frontend is ready to be developed.
        </p>

        <button className="px-8 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
          Get Started
        </button>
      </div>
    </main>
  );
}