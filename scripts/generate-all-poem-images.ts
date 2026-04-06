#!/usr/bin/env pnpm exec tsx
/**
 * 为所有80首诗词生成意境图
 * 从静态数据文件中读取诗词信息
 */

import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { readFileSync } from 'fs';

// 读取诗词数据
const poemsData = JSON.parse(readFileSync('./public/data/poems.json', 'utf-8'));
const poems = poemsData.poems;

// 生成图片
async function generateImages() {
  const config = new Config();
  const client = new ImageGenerationClient(config);

  // 创建输出目录
  const outputDir = path.join(process.cwd(), 'public', 'poems');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`🎨 开始生成 ${poems.length} 首诗词的图片...`);

  for (let i = 0; i < poems.length; i++) {
    const poem = poems[i];
    const outputPath = path.join(outputDir, `poem-${poem.number}.jpg`);

    // 检查文件是否已存在
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  第 ${poem.number} 首《${poem.title}》图片已存在，跳过`);
      continue;
    }

    try {
      console.log(`🎨 [${i + 1}/${poems.length}] 正在生成第 ${poem.number} 首《${poem.title}》的图片...`);

      const prompt = `请为一首古诗词生成精美的中国风插画。

诗词信息：
- 诗题：《${poem.title}》
- 作者：${poem.author}（${poem.dynasty}）
- 分类：${poem.category} - ${poem.festival}
- 诗句：${poem.content}

要求：
1. 风格：中国传统水墨画风格，色彩淡雅优美
2. 内容：根据诗词意境创作，体现诗词的主题和情感
3. 氛围：符合${poem.festival}的特点（如春天的生机、夏天的热烈、秋天的宁静、冬天的纯净等）
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
        console.log(`✅ 第 ${poem.number} 首《${poem.title}》图片生成成功！`);

        // 等待2秒避免请求过快
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.error(`❌ 第 ${poem.number} 首《${poem.title}》图片生成失败`);
        console.error(`错误信息:`, helper.errorMessages);
      }
    } catch (error) {
      console.error(`❌ 第 ${poem.number} 首《${poem.title}》图片生成出错:`, error instanceof Error ? error.message : String(error));
    }
  }

  console.log('\n🎉 所有图片生成完成！');
}

// 运行脚本
generateImages().catch(console.error);
