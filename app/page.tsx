"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import Image from "next/image";

type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  createdAt: string;
};
function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-neutral-950 mb-8 rounded-lg shadow">
      <span className="text-2xl font-bold">VideoWithAI</span>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
        Login
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-neutral-400 border-t border-neutral-800">
      Made with <span className="text-red-500">❤️</span> Shivanand &copy; {new Date().getFullYear()}
    </footer>
  );
}
export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getVideos()
      .then((data) => {
        const safeData = data as { videos?: Video[] };
        setVideos(safeData.videos || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load videos");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">VideoWithAI</h1>
      {loading && <div className="text-center">Loading videos...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos
          .filter(
            (video) =>
              video &&
              typeof video._id === "string" &&
              typeof video.title === "string" &&
              typeof video.description === "string" &&
              typeof video.createdAt === "string"
          )
          .map((video) => (
            <div key={video._id} className="bg-neutral-900 rounded-lg p-4 shadow">
              {video.thumbnailUrl && (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={320}
                  height={180}
                  className="rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <p className="text-neutral-400 text-sm">{video.description}</p>
              <p className="text-neutral-500 text-xs mt-2">
                {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
      {videos.length === 0 && !loading && !error && (
        <div className="text-center text-neutral-400 mt-8">No videos found.</div>
      )}
    </div>
  );
}