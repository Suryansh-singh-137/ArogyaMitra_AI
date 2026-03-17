export interface OutbreakItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export async function fetchIndiaOutbreaks(): Promise<OutbreakItem[]> {
  const res = await fetch("https://apps.who.int/rss/dontf.rss");
  if (!res.ok) {
    throw new Error(`WHO RSS error ${res.status}`);
  }
  const xml = await res.text();

  const items: OutbreakItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const getTag = (tag: string) => {
      const m = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i").exec(
        itemXml,
      );
      return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    };

    const title = getTag("title");
    const description = getTag("description");
    const link = getTag("link");
    const pubDate = getTag("pubDate");

    const haystack = `${title} ${description}`.toLowerCase();
    if (!haystack.includes("india")) continue;

    items.push({ title, description, link, pubDate });
  }

  return items;
}

