// 诗词数据结构定义
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Poem {
  id: number;
  number: number; // 序号
  title: string; // 诗题
  festival: string; // 节气或节日名称
  category: string; // 分类：节气或节日
  season?: string; // 季节（仅节气）
  author: string; // 作者
 朝代: string; // 朝代
  content: string; // 诗的内容
  authorIntro: string; // 作者介绍
  background: string; // 诗的背景介绍
  translation: string; // 诗的大致翻译
  imageUrl?: string; // 诗词相关图片
  questions: Question[]; // 3个相关问题
}

export interface PoemCategory {
  name: string;
  type: '节气' | '节日';
  poems: number[]; // 诗词ID列表
}
