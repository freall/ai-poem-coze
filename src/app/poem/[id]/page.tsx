import PoemDetailClient from './PoemDetailClient';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Poem {
  id: number;
  number: number;
  title: string;
  festival: string;
  category: string;
  season?: string;
  author: string;
  dynasty: string;
  content: string;
  authorIntro?: string;
  background?: string;
  translation?: string;
  imageUrl?: string;
  questions?: Question[];
}

// 生成所有80首诗词的静态路径
export async function generateStaticParams() {
  return Array.from({ length: 80 }, (_, i) => ({
    id: String(i + 1),
  }));
}

async function fetchPoemData(id: string): Promise<Poem | null> {
  try {
    // 直接从文件系统读取JSON数据
    const filePath = join(process.cwd(), 'public', 'data', 'poems.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const allPoemsData = JSON.parse(fileContent);
    const foundPoem = allPoemsData.poems.find((p: Poem) => p.number === parseInt(id));

    if (foundPoem) {
      const pregeneratedImage = `/poems/poem-${foundPoem.number}.jpg`;
      return {
        ...foundPoem,
        imageUrl: pregeneratedImage,
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch poem:', error);
    return null;
  }
}

export default async function PoemDetailPage({ params }: { params: { id: string } }) {
  const poem = await fetchPoemData(params.id);

  if (!poem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">诗词未找到</p>
          <Link href="/" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return <PoemDetailClient poem={poem} />;
}
