'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, BookOpen, User, CheckCircle2, XCircle, Target } from 'lucide-react';

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

interface PoemDetailClientProps {
  poem: Poem;
}

export default function PoemDetailClient({ poem }: PoemDetailClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (showResults) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));

    const question = poem?.questions?.find((q) => q.id === questionId);
    if (question) {
      if (answer === question.correctAnswer) {
        // 正确答案
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      } else {
        // 错误答案
        setShowWrongAnswer(questionId);
        setTimeout(() => setShowWrongAnswer(null), 5000);
      }
    }

    // 自动进入下一题
    setTimeout(() => {
      if (currentQuestionIndex < (poem?.questions?.length || 0) - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const getProgress = () => {
    if (!poem?.questions) return 0;
    const answered = Object.keys(selectedAnswers).length;
    return (answered / poem.questions.length) * 100;
  };

  const getScore = () => {
    if (!poem?.questions) return 0;
    let score = 0;
    poem.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const currentQuestion = poem.questions?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {poem.category} · {poem.festival}
              </Badge>
              <Badge variant="outline">第 {poem.number} 首</Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 诗词展示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 诗词信息 */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{poem.title}</CardTitle>
                  <CardDescription className="text-base">
                    {poem.dynasty} · {poem.author}
                  </CardDescription>
                </div>
                {poem.category === '节气' && poem.season && (
                  <Badge variant="secondary" className="text-base">
                    {poem.season}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <p className="text-xl leading-relaxed text-gray-800 text-center font-medium">
                  {poem.content}
                </p>
              </div>

              {poem.authorIntro && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-600">作者介绍</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pl-7">{poem.authorIntro}</p>
                </div>
              )}

              {poem.background && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold text-pink-600">背景介绍</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pl-7">{poem.background}</p>
                </div>
              )}

              {poem.translation && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-600">诗意翻译</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pl-7">{poem.translation}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 图片区 */}
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-pink-600" />
                诗词意境图
              </CardTitle>
            </CardHeader>
            <CardContent>
              {poem.imageUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={poem.imageUrl}
                    alt={poem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <p className="text-gray-500">图片生成中...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* 问答区 */}
        {poem.questions && poem.questions.length > 0 && (
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-orange-600" />
                    诗词问答挑战
                  </CardTitle>
                  <CardDescription>答对问题，巩固记忆！</CardDescription>
                </div>
                {!showResults && (
                  <Badge variant="outline" className="text-base">
                    {currentQuestionIndex + 1} / {poem.questions.length}
                  </Badge>
                )}
              </div>
              {!showResults && (
                <div className="mt-4">
                  <Progress value={getProgress()} className="h-2" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!showResults && currentQuestion ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg">
                    <p className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentQuestion.options.map((option, idx) => {
                        const optionLetter = ['A', 'B', 'C', 'D'][idx];
                        const isSelected = selectedAnswers[currentQuestion.id] === optionLetter;
                        const isCorrect = currentQuestion.correctAnswer === optionLetter;

                        return (
                          <Button
                            key={idx}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`w-full justify-start text-left h-auto py-4 px-6 transition-all ${
                              isSelected ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'
                            }`}
                            onClick={() => handleAnswerSelect(currentQuestion.id, optionLetter)}
                            disabled={!!selectedAnswers[currentQuestion.id]}
                          >
                            <span className="font-bold mr-3">{optionLetter}.</span>
                            <span>{option}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 错误答案提示 */}
                  {showWrongAnswer === currentQuestion.id && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        <span className="font-semibold">答案错误</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>正确答案：</strong>{currentQuestion.correctAnswer}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>解释：</strong>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* 正确答案庆祝 */}
                  {showCelebration && selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold text-lg">回答正确！太棒了！🎉</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-800">挑战完成！</h3>
                  <p className="text-lg text-gray-600">
                    你答对了 <span className="text-purple-600 font-bold">{getScore()}</span> /{' '}
                    {poem.questions.length} 道题
                  </p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <Button
                      onClick={() => {
                        setSelectedAnswers({});
                        setCurrentQuestionIndex(0);
                        setShowResults(false);
                      }}
                      variant="outline"
                    >
                      重新挑战
                    </Button>
                    <Button
                      onClick={() => router.push(`/poem/${poem.number + 1}`)}
                      disabled={poem.number >= 80 || !poem.number}
                    >
                      下一首诗
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 导航按钮 */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => router.push(`/poem/${poem.number - 1}`)}
            disabled={poem.number <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            上一首
          </Button>
          <Button
            onClick={() => router.push(`/poem/${poem.number + 1}`)}
            disabled={poem.number >= 80 || !poem.number}
          >
            下一首
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
