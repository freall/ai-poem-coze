import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// 从poem-parser导入解析函数
const poemContent = `航天图强小学25-26学年度第二学期

语文节诗词大赛（24节气+传统节日）诗词库

## （一）24节气类

### 春季节气（立春、雨水、惊蛰、春分、清明、谷雨）

1. 立春：《立春偶成》（宋·张栻）—— 律回岁晚冰霜少，春到人间草木知。便觉眼前生意满，东风吹水绿参差。

2. 立春：《咏柳》（唐·贺知章）—— 碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。

3. 雨水：《春夜喜雨》（唐·杜甫）—— 好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。

4. 雨水：《绝句》（唐·杜甫）—— 迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。

5. 惊蛰：《观田家》（唐·韦应物）—— 微雨众卉新，一雷惊蛰始。田家几日闲，耕种从此起。

6. 惊蛰：《新雷》（清·张维屏）—— 造物无言却有情，每于寒尽觉春生。千红万紫安排著，只待新雷第一声。

7. 春分：《春分日》（唐·徐铉）—— 仲春初四日，春色正中分。绿野徘徊月，晴天断续云。燕飞犹个个，花落已纷纷。思妇高楼晚，歌声不可闻。

8. 春分：《村居》（清·高鼎）—— 草长莺飞二月天，拂堤杨柳醉春烟。儿童散学归来早，忙趁东风放纸鸢。

9. 清明：《清明》（唐·杜牧）—— 清明时节雨纷纷，路上行人欲断魂。借问酒家何处有？牧童遥指杏花村。

10. 清明：《寒食》（唐·韩翃）—— 春城无处不飞花，寒食东风御柳斜。日暮汉宫传蜡烛，轻烟散入五侯家。

11. 谷雨：《晚春》（唐·韩愈）—— 草树知春不久归，百般红紫斗芳菲。杨花榆荚无才思，惟解漫天作雪飞。

12. 谷雨：《送春》（宋·王令）—— 三月残花落更开，小檐日日燕飞来。子规夜半犹啼血，不信东风唤不回。

### 夏季节气（立夏、小满、芒种、夏至、小暑、大暑）

13. 立夏：《立夏》（宋·陆游）—— 赤帜插城扉，东君整驾归。泥新巢燕闹，花尽蜜蜂稀。槐柳阴初密，帘栊暑尚微。日斜汤沐罢，熟练试单衣。

14. 立夏：《池上》（唐·白居易）—— 小娃撑小艇，偷采白莲回。不解藏踪迹，浮萍一道开。

15. 小满：《五绝·小满》（宋·欧阳修）—— 夜莺啼绿柳，皓月醒长空。最爱垄头麦，迎风笑落红。

16. 小满：《归田园四时乐春夏二首·其二》（宋·欧阳修）—— 南风原头吹百草，草木丛深茅舍小。麦穗初齐稚子娇，桑叶正肥蚕食饱。

17. 芒种：《时雨》（宋·陆游）—— 时雨及芒种，四野皆插秧。家家麦饭美，处处菱歌长。

18. 芒种：《芒种》（唐·窦常）—— 愿见纤纤擢素手，拾穗不违农时忙。

19. 夏至：《晓出净慈寺送林子方》（宋·杨万里）—— 毕竟西湖六月中，风光不与四时同。接天莲叶无穷碧，映日荷花别样红。

20. 夏至：《夏至》（宋·范成大）—— 李核垂腰祝饐，粽丝系臂扶羸。节物竞随乡俗，老翁闲伴儿嬉。

21. 小暑：《小暑》（宋·陆游）—— 万瓦鳞鳞若火龙，日车不动汗珠融。无因羽翮氛埃外，坐觉蒸炊釜甑中。

22. 小暑：《夏日南亭怀辛大》（唐·孟浩然）—— 山光忽西落，池月渐东上。散发乘夕凉，开轩卧闲敞。荷风送香气，竹露滴清响。

23. 大暑：《大暑》（宋·曾几）—— 赤日几时过，清风无处寻。经书聊枕籍，瓜李漫浮沉。兰若静复静，茅茨深又深。炎蒸乃如许，那更惜分阴。

24. 大暑：《纳凉》（宋·秦观）—— 携扙来追柳外凉，画桥南畔倚胡床。月明船笛参差起，风定池莲自在香。

### 秋季节气（立秋、处暑、白露、秋分、寒露、霜降）

25. 立秋：《立秋》（唐·刘翰）—— 睡起秋声无觅处，满阶梧叶月明中。

26. 立秋：《山居秋暝》（唐·王维）—— 空山新雨后，天气晚来秋。明月松间照，清泉石上流。竹喧归浣女，莲动下渔舟。随意春芳歇，王孙自可留。

27. 处暑：《处暑》（宋·苏泂）—— 处暑无三日，新凉直万金。白头更世事，青草印禅心。放鹤婆娑舞，听蛩断续吟。极知仁者寿，未必海之深。

28. 处暑：《早秋》（唐·许浑）—— 遥夜泛清瑟，西风生翠萝。残萤栖玉露，早雁拂金河。高树晓还密，远山晴更多。淮南一叶下，自觉洞庭波。

29. 白露：《月夜忆舍弟》（唐·杜甫）—— 戍鼓断人行，边秋一雁声。露从今夜白，月是故乡明。有弟皆分散，无家问死生。寄书长不达，况乃未休兵。

30. 白露：《秋词二首·其一》（唐·刘禹锡）—— 自古逢秋悲寂寥，我言秋日胜春朝。晴空一鹤排云上，便引诗情到碧霄。

31. 秋分：《天净沙·秋思》（元·马致远）—— 枯藤老树昏鸦，小桥流水人家，古道西风瘦马。夕阳西下，断肠人在天涯。

32. 秋分：《秋夕》（唐·杜牧）—— 银烛秋光冷画屏，轻罗小扇扑流萤。天阶夜色凉如水，坐看牵牛织女星。

33. 寒露：《寒露》（唐·白居易）—— 袅袅凉风动，凄凄寒露零。兰衰花始白，荷破叶犹青。独立栖沙鹤，双飞照水萤。若为寥落境，仍值酒初醒。

34. 寒露：《九月九日忆山东兄弟》（唐·王维）—— 独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。

35. 霜降：《山行》（唐·杜牧）—— 远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。

36. 霜降：《霜月》（唐·李商隐）—— 初闻征雁已无蝉，百尺楼高水接天。青女素娥俱耐冷，月中霜里斗婵娟。

### 冬季节气（立冬、小雪、大雪、冬至、小寒、大寒）

37. 立冬：《立冬》（唐·李白）—— 冻笔新诗懒写，寒炉美酒时温。醉看墨花月白，恍疑雪满前村。

38. 立冬：《江雪》（唐·柳宗元）—— 千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。

39. 小雪：《小雪》（唐·戴叔伦）—— 花雪随风不厌看，更多还肯失林峦。愁人正在书窗下，一片飞来一片寒。

40. 小雪：《夜雪》（唐·白居易）—— 已讶衾枕冷，复见窗户明。夜深知雪重，时闻折竹声。

41. 大雪：《大雪》（宋·陆游）—— 大雪江南见未曾，今年方始是严凝。巧穿帘罅如相觅，重压林梢欲不胜。

42. 大雪：《白雪歌送武判官归京》（唐·岑参）—— 北风卷地白草折，胡天八月即飞雪。忽如一夜春风来，千树万树梨花开。

43. 冬至：《冬至》（唐·杜甫）—— 天时人事日相催，冬至阳生春又来。刺绣五纹添弱线，吹葭六管动飞灰。岸容待腊将舒柳，山意冲寒欲放梅。

44. 冬至：《邯郸冬至夜思家》（唐·白居易）—— 邯郸驿里逢冬至，抱膝灯前影伴身。想得家中夜深坐，还应说着远行人。

45. 小寒：《小寒》（唐·元稹）—— 小寒连大吕，欢鹊垒新巢。拾食寻河曲，衔紫绕树梢。霜鹰近北首，雊雉隐丛茅。莫怪严凝切，春冬正月交。

46. 小寒：《寒夜》（宋·杜耒）—— 寒夜客来茶当酒，竹炉汤沸火初红。寻常一样窗前月，才有梅花便不同。

47. 大寒：《大寒》（宋·陆游）—— 大寒雪未消，闭户不能出。可怜切云冠，局此容膝室。

48. 大寒：《大寒出江陵西门》（唐·陆游）—— 平明羸马出西门，淡日寒云久吐吞。`;

// 简化的解析函数
function parsePoems(content: string) {
  const poems = [];
  const lines = content.split('\n');
  let currentCategory = '';
  let currentSeason = '';
  let currentFestival = '';
  let currentSection = '';
  let poemCounter = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.includes('## （一）24节气类')) {
      currentCategory = '节气';
      currentSection = '节气';
      continue;
    } else if (trimmedLine.includes('## （二）传统节日类')) {
      currentCategory = '节日';
      currentSection = '节日';
      continue;
    }

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

    if (trimmedLine.startsWith('### ') && currentSection === '节日') {
      const match = trimmedLine.match(/### (.+?)（/);
      if (match) {
        currentFestival = match[1];
      }
      continue;
    }

    const poemPattern = /^(\d+)\.\s*([^：:]+)[：:]\s*《(.+)》（([^·]+)·([^）]+)）——\s*(.+)$/;
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

// 生成图片
async function generateImages() {
  const poems = parsePoems(poemContent);
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
