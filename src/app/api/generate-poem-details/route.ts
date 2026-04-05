import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { poemData } = await request.json();

    if (!poemData) {
      return NextResponse.json({ error: 'Poem data is required' }, { status: 400 });
    }

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 构建提示词，生成诗词的详细信息
    const prompt = `你是一位专业的古诗词教育专家，专门为小朋友讲解诗词。请根据以下诗词信息，生成适合小朋友理解的内容：

诗词信息：
- 序号：${poemData.number}
- 诗题：${poemData.title}
- 分类：${poemData.category}
- 节气/节日：${poemData.festival}
- 作者：${poemData.author}
- 朝代：${poemData.dynasty}
- 诗句：${poemData.content}

请生成以下内容，以JSON格式返回，不要使用markdown格式，直接返回JSON字符串：

{
  "authorIntro": "作者介绍（适合小学生理解，50-100字）",
  "background": "诗词背景介绍（适合小学生理解，80-150字，说明写作的时代背景、生活背景或创作缘由）",
  "translation": "诗词的大意翻译（用现代白话文，通俗易懂，适合小学生理解）",
  "questions": [
    {
      "id": "q1",
      "question": "问题1（关于诗词内容、作者或背景的理解性问题，4个选项，单选题）",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctAnswer": "正确选项（A/B/C/D）",
      "explanation": "答案解释（说明为什么这个答案是正确的，100-150字）"
    },
    {
      "id": "q2",
      "question": "问题2（关于诗词意境、修辞或表达手法的理解性问题，4个选项，单选题）",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctAnswer": "正确选项（A/B/C/D）",
      "explanation": "答案解释"
    },
    {
      "id": "q3",
      "question": "问题3（关于诗词中字词含义或文化知识的理解性问题，4个选项，单选题）",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctAnswer": "正确选项（A/B/C/D）",
      "explanation": "答案解释"
    }
  ]
}

要求：
1. 所有内容用中文
2. 语言通俗易懂，适合6-12岁小朋友
3. 问题要有教育意义，帮助小朋友理解诗词
4. 答案解释要详细，帮助小朋友学习
5. 直接返回JSON字符串，不要包含其他文字`;

    const messages = [{ role: 'user' as const, content: prompt }];
    const response = await client.invoke(messages, {
      model: 'doubao-seed-2-0-lite-260215',
      temperature: 0.7,
    });

    // 尝试解析JSON
    let result;
    try {
      // 清理可能存在的markdown代码块标记
      let cleanContent = response.content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      result = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', response.content);
      throw new Error('Failed to parse generated content');
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error generating poem details:', error);
    return NextResponse.json(
      { error: 'Failed to generate poem details', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
