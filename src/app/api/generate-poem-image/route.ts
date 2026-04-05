import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerationClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { poemData } = await request.json();

    if (!poemData) {
      return NextResponse.json({ error: 'Poem data is required' }, { status: 400 });
    }

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new ImageGenerationClient(config, customHeaders);

    // 构建图片生成提示词
    const prompt = `请为一首古诗词生成精美的中国风插画。

诗词信息：
- 诗题：《${poemData.title}》
- 作者：${poemData.author}（${poemData.dynasty}）
- 分类：${poemData.category} - ${poemData.festival}
- 诗句：${poemData.content}

要求：
1. 风格：中国传统水墨画风格，色彩淡雅优美
2. 内容：根据诗词意境创作，体现诗词的主题和情感
3. 氛围：符合${poemData.festival}的特点（如春天的生机、夏天的热烈、秋天的宁静、冬天的纯净等）
4. 构图：画面优美，有留白意境
5. 适合小朋友观看，不要过于复杂
6. 画面要能帮助小朋友理解诗词内容`;

    const response = await client.generate({
      prompt,
      size: '2K',
      watermark: false,
    });

    const helper = client.getResponseHelper(response);

    if (!helper.success || helper.imageUrls.length === 0) {
      throw new Error('Image generation failed');
    }

    return NextResponse.json({
      success: true,
      imageUrl: helper.imageUrls[0],
    });
  } catch (error) {
    console.error('Error generating poem image:', error);
    return NextResponse.json(
      { error: 'Failed to generate poem image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
