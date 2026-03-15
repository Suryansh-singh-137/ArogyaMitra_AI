"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  RefreshCw,
  AlertCircle,
  Locate,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Hospital {
  id: number;
  name: string;
  type: string;
  distance: number; // km
  lat: number;
  lon: number;
  phone?: string;
  address?: string;
  openingHours?: string;
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getHospitalType(tags: Record<string, string>): string {
  if (tags.amenity === "pharmacy") return "Pharmacy";
  if (tags.healthcare === "clinic") return "Clinic";
  if (tags.healthcare === "doctor") return "Doctor";
  if (tags.amenity === "hospital") {
    if (
      tags.operator?.toLowerCase().includes("government") ||
      tags.operator?.toLowerCase().includes("govt") ||
      tags.name?.toLowerCase().includes("phc") ||
      tags.name?.toLowerCase().includes("primary health")
    )
      return "Govt PHC";
    if (tags.name?.toLowerCase().includes("community"))
      return "Community Health Centre";
    return "Hospital";
  }
  return "Health Centre";
}

async function fetchNearbyHospitals(
  lat: number,
  lon: number,
): Promise<Hospital[]> {
  const radius = 15000; // 15km
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lon});
      node["amenity"="clinic"](around:${radius},${lat},${lon});
      node["amenity"="pharmacy"](around:${radius},${lat},${lon});
      node["healthcare"="clinic"](around:${radius},${lat},${lon});
      node["healthcare"="doctor"](around:${radius},${lat},${lon});
      way["amenity"="hospital"](around:${radius},${lat},${lon});
      way["amenity"="clinic"](around:${radius},${lat},${lon});
    );
    out center 20;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  if (!res.ok) throw new Error("Overpass API error");
  const data = await res.json();

  return (data.elements as any[])
    .map((el) => {
      const elLat = el.lat ?? el.center?.lat;
      const elLon = el.lon ?? el.center?.lon;
      if (!elLat || !elLon) return null;

      const tags = el.tags || {};
      const name =
        tags.name || tags["name:en"] || tags["name:hi"] || "Health Facility";
      const distance = getDistance(lat, lon, elLat, elLon);

      return {
        id: el.id,
        name,
        type: getHospitalType(tags),
        distance: Math.round(distance * 10) / 10,
        lat: elLat,
        lon: elLon,
        phone: tags.phone || tags["contact:phone"],
        address:
          [tags["addr:street"], tags["addr:city"]].filter(Boolean).join(", ") ||
          undefined,
        openingHours: tags.opening_hours,
      } as Hospital;
    })
    .filter(Boolean)
    .sort((a, b) => a!.distance - b!.distance)
    .slice(0, 12) as Hospital[];
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Govt PHC": { bg: "#EAF3DE", text: "#3B6D11" },
  Pharmacy: { bg: "#E6F1FB", text: "#185FA5" },
  Hospital: { bg: "#FAEEDA", text: "#854F0B" },
  Clinic: { bg: "#EEEDFE", text: "#534AB7" },
  "Community Health Centre": { bg: "#E1F5EE", text: "#085041" },
  Doctor: { bg: "#FBEAF0", text: "#993556" },
  "Health Centre": { bg: "#F1EFE8", text: "#5F5E5A" },
};

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("All");
  const [locating, setLocating] = useState(false);

  const fetchHospitals = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchNearbyHospitals(lat, lon);
      setHospitals(results);
      if (results.length === 0)
        setError("No health facilities found within 15km.");
    } catch {
      setError("Could not fetch hospitals. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setUserLoc({ lat, lon });
        setLocating(false);
        fetchHospitals(lat, lon);
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) {
          setError(
            "Location access denied. Please allow location permission and try again.",
          );
        } else if (err.code === 2) {
          setError("Could not detect location. Please check GPS is enabled.");
        } else {
          setError("Location request timed out. Please try again.");
        }
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
    );
  }, [fetchHospitals]);

  // Auto-get location on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const allTypes = [
    "All",
    ...Array.from(new Set(hospitals.map((h) => h.type))),
  ];
  const filtered =
    filter === "All" ? hospitals : hospitals.filter((h) => h.type === filter);

  const openMaps = (h: Hospital) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            Nearby Hospitals
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            नज़दीकी अस्पताल — Real GPS data via OpenStreetMap
          </p>
        </motion.div>

        {/* Location bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: userLoc ? "#EAF3DE" : "#f0eada" }}
              >
                <Locate
                  size={15}
                  style={{ color: userLoc ? "#3B6D11" : "#85325c" }}
                />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#3d1a2e" }}>
                  {locating
                    ? "Getting your location..."
                    : userLoc
                      ? `Location found`
                      : "Location not set"}
                </p>
                {userLoc && (
                  <p className="text-xs" style={{ color: "#8a6a7a" }}>
                    {userLoc.lat.toFixed(4)}, {userLoc.lon.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={getLocation}
              disabled={locating || loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: "#85325c", color: "#f0eada" }}
            >
              <RefreshCw size={12} className={locating ? "animate-spin" : ""} />
              {locating ? "Locating..." : "Refresh"}
            </button>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 p-4 rounded-2xl border"
              style={{ background: "#FCEBEB", borderColor: "#F09595" }}
            >
              <AlertCircle
                size={16}
                style={{ color: "#A32D2D", flexShrink: 0, marginTop: 1 }}
              />
              <div>
                <p className="text-sm" style={{ color: "#A32D2D" }}>
                  {error}
                </p>
                {error.includes("denied") && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#A32D2D", opacity: 0.8 }}
                  >
                    Go to browser settings → Site settings → Location → Allow
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-center" style={{ color: "#8a6a7a" }}>
                Searching for hospitals near you...
              </p>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl border border-[#e8d5c4] p-4 h-20"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tabs */}
        {!loading && hospitals.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border flex-shrink-0",
                  filter === type
                    ? "border-transparent text-white"
                    : "bg-white border-[#e0c8d0] hover:border-[#85325c]",
                )}
                style={
                  filter === type
                    ? { background: "#85325c", color: "#f0eada" }
                    : { color: "#85325c" }
                }
              >
                {type}{" "}
                {type === "All"
                  ? `(${hospitals.length})`
                  : `(${hospitals.filter((h) => h.type === type).length})`}
              </button>
            ))}
          </motion.div>
        )}

        {/* Hospital cards */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((hospital, i) => {
              const typeColor =
                TYPE_COLORS[hospital.type] || TYPE_COLORS["Health Centre"];
              const isClose = hospital.distance < 3;
              return (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isClose ? "#85325c" : "#f0eada" }}
                    >
                      <MapPin
                        size={18}
                        style={{ color: isClose ? "#f0eada" : "#85325c" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="font-semibold text-sm leading-tight"
                          style={{ color: "#3d1a2e" }}
                        >
                          {hospital.name}
                        </p>
                        <span
                          className="text-xs font-bold flex-shrink-0"
                          style={{ color: "#85325c" }}
                        >
                          {hospital.distance} km
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: typeColor.bg,
                            color: typeColor.text,
                          }}
                        >
                          {hospital.type}
                        </span>
                        {isClose && (
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: "#EAF3DE", color: "#3B6D11" }}
                          >
                            Nearby
                          </span>
                        )}
                        {hospital.openingHours && (
                          <span
                            className="text-[10px] flex items-center gap-1"
                            style={{ color: "#8a6a7a" }}
                          >
                            <Clock size={10} /> {hospital.openingHours}
                          </span>
                        )}
                      </div>

                      {hospital.address && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#9a7a8a" }}
                        >
                          {hospital.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#f0e8e0]">
                    <button
                      onClick={() => openMaps(hospital)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                      style={{ background: "#85325c", color: "#f0eada" }}
                    >
                      <Navigation size={12} /> Get Directions
                    </button>
                    {hospital.phone && (
                      <a
                        href={`tel:${hospital.phone}`}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all hover:border-[#85325c]"
                        style={{
                          border: "1px solid #e0c8d0",
                          color: "#85325c",
                        }}
                      >
                        <Phone size={12} /> Call
                      </a>
                    )}
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${hospital.lat}&mlon=${hospital.lon}#map=17/${hospital.lat}/${hospital.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all hover:border-[#85325c]"
                      style={{ border: "1px solid #e0c8d0", color: "#85325c" }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty + not loading */}
        {!loading && !error && hospitals.length === 0 && !locating && (
          <div className="text-center py-16">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "#85325c15" }}
            >
              <MapPin size={28} style={{ color: "#85325c" }} />
            </div>
            <p
              className="font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
            >
              Allow location to find hospitals
            </p>
            <p className="text-sm mb-4" style={{ color: "#8a6a7a" }}>
              अस्पताल खोजने के लिए location दें
            </p>
            <button
              onClick={getLocation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium mx-auto hover:opacity-80"
              style={{ background: "#85325c", color: "#f0eada" }}
            >
              <Locate size={15} /> Find Hospitals Near Me
            </button>
          </div>
        )}

        <p className="text-center text-xs pb-2" style={{ color: "#b89aaa" }}>
          Data from OpenStreetMap · Free · No API key required
        </p>
      </div>
    </div>
  );
}
