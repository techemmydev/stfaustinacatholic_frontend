import React, { useState } from "react";
import { Play, Volume2, Download, Calendar, Search } from "lucide-react";

const sermons = [
  {
    id: 1,
    title: "The Light of Christ in Advent",
    speaker: "Fr. Thomas O'Connor",
    date: "December 1, 2025",
    duration: "18:32",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1610022069496-955617dd718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    description:
      "Reflecting on the hope and anticipation of the Advent season as we prepare our hearts for Christmas.",
    scripture: "Isaiah 9:2-7",
  },
  {
    id: 2,
    title: "Living the Beatitudes Today",
    speaker: "Fr. Michael Rodriguez",
    date: "November 24, 2025",
    duration: "22:15",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1610022069496-955617dd718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    description:
      "Exploring how Jesus calls us to live the Beatitudes in our modern world.",
    scripture: "Matthew 5:1-12",
  },
  {
    id: 3,
    title: "The Power of Forgiveness",
    speaker: "Fr. Thomas O'Connor",
    date: "November 17, 2025",
    duration: "15:48",
    type: "audio",
    thumbnail:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    description:
      "Understanding God's mercy and how we are called to forgive as we have been forgiven.",
    scripture: "Matthew 18:21-35",
  },
  // ... add remaining sermons here
];

const photoGallery = [
  {
    id: 1,
    title: "Christmas Mass 2024",
    date: "December 25, 2024",
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    id: 2,
    title: "First Communion Celebration",
    date: "May 12, 2024",
    image:
      "https://images.unsplash.com/photo-1760319726429-fcda77d3cb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    id: 3,
    title: "First Communion Celebration",
    date: "May 12, 2024",
    image:
      "https://images.unsplash.com/photo-1760319726429-fcda77d3cb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  // ... add remaining photos here
];

export function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || sermon.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="font-inter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center lg:mt-10">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-[#d4af37] ml-1" />
          </div>
          <h1 className="text-white mb-6">Sermons & Media</h1>
          <p className="text-xl text-gray-200">
            Watch and listen to homilies, teachings, and spiritual reflections
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {["all", "video", "audio"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    filterType === type
                      ? "bg-[#8B2635] text-white"
                      : "bg-gray-100 text-[#2d2d2d] hover:bg-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="mb-8 text-[#1e3a5f]">Recent Sermons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative group">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {sermon.type === "video" ? (
                    <Play className="w-16 h-16 text-white" />
                  ) : (
                    <Volume2 className="w-16 h-16 text-white" />
                  )}
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#8B2635] text-white text-sm rounded-full">
                  {sermon.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-[#666666]">
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span>{sermon.date}</span>
                </div>
                <h3 className="mb-2 text-[#1e3a5f]">{sermon.title}</h3>
                <p className="text-[#8B2635] text-sm mb-3">{sermon.speaker}</p>
                <p className="text-[#666666] mb-3">{sermon.description}</p>
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-[#666666]">
                    {sermon.scripture}
                  </span>
                  <button className="text-[#8B2635] hover:text-[#6d1d2a]">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-8 text-[#1e3a5f]">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photoGallery.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="text-white m-0">{photo.title}</h4>
                  <p className="text-sm text-gray-200">{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-6">Stay Connected</h2>
          <p className="text-xl text-gray-200 mb-8">
            Subscribe to our YouTube channel and podcast to never miss a sermon
            or teaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg">
              Subscribe on YouTube
            </button>
            <button className="px-8 py-3 bg-white text-[#1e3a5f] rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              Listen on Podcast
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
