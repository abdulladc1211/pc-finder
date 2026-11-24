import { Link } from "react-router-dom";
import { pcs } from "../data";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  const filteredPcs = pcs.filter((pc) =>
    pc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">PC Finder</h1>
        <p className="text-gray-400">
          Find the perfect PC for your games and software
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search PCs by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Results count */}
      <p className="text-gray-400 mb-4 text-sm">
        Showing {filteredPcs.length} of {pcs.length} PCs
      </p>

      {/* Grid */}
      {filteredPcs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPcs.map((pc) => (
            <div
              key={pc.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">{pc.name}</h2>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                  {pc.tier}
                </span>
              </div>

              <div className="space-y-1.5 text-sm text-gray-400 mb-4 grow">
                <p>CPU: {pc.cpu}</p>
                <p>GPU: {pc.gpu}</p>
                <p>RAM: {pc.ram}GB</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="text-xl font-bold text-blue-400">
                  ${pc.price}
                </span>
                <Link
                  to={`/pc/${pc.id}`}
                  className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No PCs found matching "{search}"
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;