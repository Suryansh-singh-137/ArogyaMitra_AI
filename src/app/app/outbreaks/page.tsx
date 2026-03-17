import { fetchIndiaOutbreaks, type OutbreakItem } from "@/lib/outbreaks";
import { AlertTriangle, ExternalLink, CalendarDays } from "lucide-react";

export const revalidate = 86400; // 1 day

export default async function OutbreaksPage() {
  let outbreaks: OutbreakItem[] = [];
  let error: string | null = null;

  try {
    outbreaks = await fetchIndiaOutbreaks();
  } catch {
    error = "Could not load latest disease outbreak alerts. Please try again later.";
  }

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-20 space-y-5">
        <header>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            Disease Outbreak Alerts
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            WHO Disease Outbreak News — India संबंधित हाल की सूचनाएँ
          </p>
        </header>

        {error && (
          <div
            className="flex gap-3 p-4 rounded-2xl border"
            style={{ background: "#FCEBEB", borderColor: "#F09595" }}
          >
            <AlertTriangle
              size={18}
              style={{ color: "#A32D2D", flexShrink: 0, marginTop: 2 }}
            />
            <p className="text-sm" style={{ color: "#A32D2D" }}>
              {error}
            </p>
          </div>
        )}

        {!error && outbreaks.length === 0 && (
          <>
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "#85325c15" }}
              >
                <AlertTriangle size={28} style={{ color: "#85325c" }} />
              </div>
              <p
                className="font-semibold mb-1"
                style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
              >
                No recent India-specific alerts
              </p>
              <p className="text-sm" style={{ color: "#8a6a7a" }}>
                वर्तमान में WHO Disease Outbreak News में India का कोई सक्रिय अपडेट नहीं दिख रहा। 
              </p>
            </div>
            
            {/* Past Major Outbreaks Fallback */}
            <div>
              <h3 
                className="font-bold text-lg mb-3 mt-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
              >
                Past Major Outbreaks (India)
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Nipah Virus Outbreak - Kerala",
                    date: "September 2023",
                    desc: "An outbreak of Nipah virus was reported in Kerala, India. Containment zones were established and close contacts were isolated to prevent further transmission. The virus is primarily transmitted by fruit bats.",
                    link: "https://www.who.int/emergencies/disease-outbreak-news/item/2023-DON490"
                  },
                  {
                    title: "COVID-19 Pandemic - Nationwide",
                    date: "2020 - 2023",
                    desc: "A massive nationwide outbreak of SARS-CoV-2 causing severe respiratory illness. Multiple waves affected the country, leading to nationwide vaccination drives and massive public health interventions.",
                    link: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  },
                  {
                    title: "Zika Virus - Multiple States",
                    date: "October 2021",
                    desc: "Cases of Zika virus disease were reported in Uttar Pradesh, Kerala, and Maharashtra. Intensive vector control measures and fever surveillance were activated across affected regions.",
                    link: "https://www.who.int/emergencies/disease-outbreak-news/item/zika-virus-disease---india"
                  }
                ].map((past, i) => (
                  <article
                    key={i}
                    className="bg-[#faf6f0] rounded-2xl border border-[#e8d5c4] p-4 opacity-90"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-sm font-semibold leading-snug"
                        style={{
                          fontFamily: "var(--font-playfair)",
                          color: "#3d1a2e",
                        }}
                      >
                        {past.title}
                      </h3>
                      <span
                        className="flex items-center gap-1 text-[11px] flex-shrink-0 font-medium"
                        style={{ color: "#8a6a7a" }}
                      >
                        <CalendarDays size={11} />
                        {past.date}
                      </span>
                    </div>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "#6a4a5a" }}
                    >
                      {past.desc}
                    </p>
                    <div className="flex justify-end mt-3 pt-2 border-t border-[#f0e8e0]">
                      <a
                        href={past.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition hover:border-[#85325c]"
                        style={{
                          borderColor: "#e0c8d0",
                          color: "#85325c",
                        }}
                      >
                        Read Historical Update
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}

        {outbreaks.length > 0 && (
          <div className="space-y-3">
            {outbreaks.map((o) => (
              <article
                key={o.link}
                className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "#3d1a2e",
                    }}
                  >
                    {o.title}
                  </h3>
                  <span
                    className="flex items-center gap-1 text-[11px] flex-shrink-0"
                    style={{ color: "#8a6a7a" }}
                  >
                    <CalendarDays size={11} />
                    {o.pubDate ? new Date(o.pubDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }) : "Recent"}
                  </span>
                </div>
                <p
                  className="text-xs mt-2 line-clamp-4"
                  style={{ color: "#6a4a5a" }}
                  dangerouslySetInnerHTML={{ __html: o.description }}
                />
                <div className="flex justify-end mt-3 pt-2 border-t border-[#f0e8e0]">
                  <a
                    href={o.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border hover:border-[#85325c]"
                    style={{
                      borderColor: "#e0c8d0",
                      color: "#85325c",
                      background: "#faf6f0",
                    }}
                  >
                    View full WHO update
                    <ExternalLink size={11} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="text-center text-xs pb-2" style={{ color: "#b89aaa" }}>
          Source: World Health Organization Disease Outbreak News (DON). जानकारी केवल जागरूकता के लिए है।
        </p>
      </div>
    </div>
  );
}

