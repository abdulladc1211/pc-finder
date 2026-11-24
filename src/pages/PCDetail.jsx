import { useParams, Link } from "react-router-dom";
import { pcs, games, softwares } from "../data";

function PCDetail() {
  const { id } = useParams();
  const pc = pcs.find((p) => p.id === Number(id));

  // Check for missing PC BEFORE using pc.ram
  if (!pc) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">PC not found</h1>
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const runnableGames = games.filter((game) => pc.ram >= game.minRam);
  const notRunnableGames = games.filter((game) => pc.ram < game.minRam);
  const runnableSoftwares = softwares.filter((sw) => pc.ram >= sw.minRam);
  const notRunnableSoftwares = softwares.filter((sw) => pc.ram < sw.minRam);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        to="/"
        className="text-gray-400 hover:text-white text-sm mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      {/* PC Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">{pc.name}</h1>
          <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
            {pc.tier}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">CPU</p>
            <p className="text-white font-medium">{pc.cpu}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">GPU</p>
            <p className="text-white font-medium">{pc.gpu}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">RAM</p>
            <p className="text-white font-medium">{pc.ram}GB</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <span className="text-2xl font-bold text-blue-400">${pc.price}</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Games */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-green-400 mb-3">
              ✓ Can run {runnableGames.length} games
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-300 max-h-64 overflow-y-auto">
              {runnableGames.map((game) => (
                <li key={game.id} className="flex justify-between">
                  <span>{game.name}</span>
                  <span className="text-gray-500">{game.genre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-red-400 mb-3">
              ✗ May struggle with {notRunnableGames.length} games
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-400 max-h-64 overflow-y-auto">
              {notRunnableGames.map((game) => (
                <li key={game.id} className="flex justify-between">
                  <span>{game.name}</span>
                  <span className="text-gray-600">{game.minRam}GB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Software */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-green-400 mb-3">
              ✓ Can run {runnableSoftwares.length} software
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-300 max-h-64 overflow-y-auto">
              {runnableSoftwares.map((sw) => (
                <li key={sw.id} className="flex justify-between">
                  <span>{sw.name}</span>
                  <span className="text-gray-500">{sw.category}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-red-400 mb-3">
              ✗ May struggle with {notRunnableSoftwares.length} software
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-400 max-h-64 overflow-y-auto">
              {notRunnableSoftwares.map((sw) => (
                <li key={sw.id} className="flex justify-between">
                  <span>{sw.name}</span>
                  <span className="text-gray-600">{sw.minRam}GB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PCDetail;