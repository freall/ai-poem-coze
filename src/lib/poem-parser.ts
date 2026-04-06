// 诗词数据解析和存储
// 从附件内容中提取并解析诗词数据

export interface RawPoemData {
  number: number;
  title: string;
  festival: string;
  category: string;
  season?: string;
  author: string;
  dynasty: string;
  content: string;
}

// 解析附件中的诗词内容
export function parsePoemsFromContent(content: string): RawPoemData[] {
  const poems: RawPoemData[] = [];
  const lines = content.split('\n');
  let currentSeason = '';
  let currentFestival = '';
  let currentSection = '';
  let poemCounter = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 识别大分类（节气/节日）
    if (trimmedLine.includes('## （一）24节气类')) {
      currentSection = '节气';
      continue;
    } else if (trimmedLine.includes('## （二）传统节日类')) {
      currentSection = '节日';
      continue;
    }

    // 识别季节
    if (trimmedLine.includes('### 春季节气')) {
      currentSeason = '春季';
      continue;
    } else if (trimmedLine.includes('### 夏季节气')) {
      currentSeason = '夏季';
      continue;
    } else if (trimmedLine.includes('### 秋季节气')) {
      currentSeason = '秋季';
      continue;
    } else if (trimmedLine.includes('### 冬季节气')) {
      currentSeason = '冬季';
      continue;
    }

    // 识别节日
    if (trimmedLine.startsWith('### ') && currentSection === '节日') {
      const match = trimmedLine.match(/### (.+?)（/);
      if (match) {
        currentFestival = match[1];
      }
      continue;
    }

    // 解析诗词行
    // 支持两种格式：
    // 1. 节气格式：序号. 节气：《诗题》（朝代·作者）—— 诗句
    // 2. 节日格式：序号. 《诗题》（朝代·作者）—— 诗句
    const poemPattern = /^(\d+)\.\s*(?:([^：:]+)[：:])?\s*《(.+)》（([^·]+)·([^）]+)）——\s*(.+)$/;
    const match = trimmedLine.match(poemPattern);

    if (match) {
      poemCounter++;
      poems.push({
        number: poemCounter,
        title: match[3],
        festival: currentSection === '节气' ? currentSeason : currentFestival,
        category: currentSection,
        season: currentSection === '节气' ? currentSeason : undefined,
        author: match[5],
        dynasty: match[4],
        content: match[6],
      });
    }
  }

  return poems;
}

// 按分类获取诗词
export function getPoemsByCategory(poems: RawPoemData[]) {
  const categories = new Map<string, RawPoemData[]>();

  poems.forEach(poem => {
    const key = `${poem.category} - ${poem.festival}`;
    if (!categories.has(key)) {
      categories.set(key, []);
    }
    categories.get(key)!.push(poem);
  });

  return Array.from(categories.entries()).map(([name, poems]) => ({
    name,
    category: poems[0].category,
    festival: poems[0].festival,
    poems: poems.map(p => p.number),
  }));
}

// 获取节气分类（按季节）
export function getSolarTermsBySeason(poems: RawPoemData[]) {
  const seasons = ['春季', '夏季', '秋季', '冬季'];
  const result: { season: string; festivals: string[] }[] = [];

  seasons.forEach(season => {
    const seasonPoems = poems.filter(p => p.category === '节气' && p.season === season);
    if (seasonPoems.length > 0) {
      result.push({
        season,
        festivals: seasonPoems.map(p => p.title), // 这里应该是节气名
      });
    }
  });

  return result;
}
