'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, BookOpen, Target, ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  category: string;
  festival: string;
  poems: number[];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPoems, setTotalPoems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // 从静态JSON文件读取数据，考虑 basePath
      const basePath = '/ai-poem-coze';
      const response = await fetch(`${basePath}/data/poems.json`);
      const result = await response.json();
      if (result) {
        setCategories(result.categories);
        setTotalPoems(result.total);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === '节气' ? '🌸' : '🎊';
  };

  const getGradientColor = (index: number) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-cyan-500 to-blue-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-amber-500',
      'from-red-500 to-pink-500',
      'from-teal-500 to-cyan-500',
      'from-violet-500 to-purple-500',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">正在加载诗词库...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                古诗词大冒险
              </h1>
            </div>
            <Badge variant="secondary" className="text-base px-4 py-1">
              共 {totalPoems} 首诗
            </Badge>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            欢迎来到古诗词大冒险
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            通过游戏化的方式学习24节气和传统节日的诗词，让诗词学习变得有趣又好记！
          </p>
        </div>

        {/* 功能特点 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-purple-600">逐个学习</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                按节气和节日分类，逐个学习每一首诗，了解作者、背景和翻译
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-pink-600" />
                <CardTitle className="text-pink-600">互动问答</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                每首诗配套3个相关问题，答对有庆祝动画，答错有详细解释
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-orange-600" />
                <CardTitle className="text-orange-600">精美配图</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                为每首诗生成相关的中国风插画，帮助理解诗词意境
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* 诗词分类列表 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
            选择一个分类开始学习
          </h3>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/poem/${category.poems[0]}`}>
                <Card
                  className={`cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 hover:shadow-purple-200/50`}
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${getGradientColor(
                      index
                    )} rounded-t-lg flex items-center justify-center`}
                  >
                    <span className="text-6xl">{getCategoryIcon(category.category)}</span>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-1">{category.festival}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.category} · {category.poems.length} 首诗
                        </CardDescription>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {category.poems.slice(0, 3).map((poemId) => (
                        <Badge key={poemId} variant="outline" className="text-xs">
                          第 {poemId} 首
                        </Badge>
                      ))}
                      {category.poems.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.poems.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </main>

      {/* 底部 */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>古诗词大冒险 - 让诗词学习变得有趣又好记</p>
        </div>
      </footer>
    </div>
  );
}
