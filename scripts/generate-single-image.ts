#!/usr/bin/env pnpm exec tsx
/**
 * 为单首诗词生成图片
 */

import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

async function generateSingleImage(poemNumber: number, title: string, author: string, dynasty: string, content: string) {
  const config = new Config();
  const client = new ImageGenerationClient(config);
  const outputDir = path.join(process.cwd(), 'public', 'poems');
  const outputPath = path.join(outputDir, `poem-${poemNumber}.jpg`);

  try {
    console.log(`🎨 正在生成第 ${poemNumber} 首《${title}》的图片...`);

    const prompt = `请为一首诗词生成精美的中国风插画。

诗词信息：
- 诗题：《${title}》
- 作者：${author}（${dynasty}）
- 诗句：${content}

要求：
1. 风格：中国传统水墨画风格，色彩淡雅优美
2. 内容：根据诗词意境创作，体现诗词的主题和情感
3. 氛围：符合重阳节的特点，展现秋天的壮阔景色，表现开阔的江天和黄花
4. 构图：画面优美，有留白意境
5. 适合小朋友观看，不要过于复杂
6. 画面要能帮助小朋友理解诗词内容`;

    const response = await client.generate({
      prompt,
      size: '2K',
      watermark: false,
    });

    const helper = client.getResponseHelper(response);

    if (helper.success && helper.imageUrls.length > 0) {
      // 下载图片
      const imageResponse = await axios.get(helper.imageUrls[0], {
        responseType: 'arraybuffer',
        timeout: 30000,
      });
      fs.writeFileSync(outputPath, imageResponse.data);
      console.log(`✅ 第 ${poemNumber} 首《${title}》图片生成成功！`);
    } else {
      console.error(`❌ 图片生成失败`);
      console.error(`错误信息:`, helper.errorMessages);
    }
  } catch (error) {
    console.error(`❌ 图片生成出错:`, error instanceof Error ? error.message : String(error));
  }
}


