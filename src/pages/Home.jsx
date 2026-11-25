import { Link } from "react-router-dom";
import { pcs } from "../data";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minRam, setMinRam] = useState(0);
  const [cpuBrand, setCpuBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(6000);

  // Combined search + filter logic
  const filteredPcs = pcs.filter((pc) => {
    const matchesSearch = pc.name.toLowerCase().includes(search.toLowerCase());
    const matchesRam = pc.ram >= minRam;
    const matchesCpu =
      cpuBrand === "All" ||
      pc.cpu.toLowerCase().includes(cpuBrand.toLowerCase()); 
    const matchesPrice = pc.price <= maxPrice;

    return matchesSearch && matchesRam && matchesCpu && matchesPrice;
  });

  // Reset all filters helper
  const resetFilters = () => {
    setSearch("");
    setMinRam(0);
    setCpuBrand("All");
    setMaxPrice(6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">PC Finder</h1>
        <p className="text-gray-400">
          Find the perfect PC for your games and software
        </p>
      </div>

      {/* Search & Filter Toggle Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search PCs by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg transition flex items-center gap-2 cursor-pointer"
        >
          <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Collapsible Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CPU Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CPU Brand
            </label>
            <select
              value={cpuBrand}
              onChange={(e) => setCpuBrand(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Brands</option>
              <option value="Intel">Intel</option>
              <option value="AMD">AMD</option>
            </select>
          </div>

          {/* Minimum RAM Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum RAM
            </label>
            <select
              value={minRam}
              onChange={(e) => setMinRam(Number(e.target.value))}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Any RAM</option>
              <option value={8}>8GB+</option>
              <option value={16}>16GB+</option>
              <option value={32}>32GB+</option>
              <option value={64}>64GB+</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-300 mb-2">
              <label>Max Price</label>
              <span className="text-blue-400 font-semibold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Reset Button */}
          <div className="md:col-span-3 flex justify-end border-t border-gray-800 pt-4">
            <button
              onClick={resetFilters}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

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
          <p className="text-gray-400 text-lg mb-4">
            No PCs found matching your current filters.
          </p>
          <button
            onClick={resetFilters}
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
