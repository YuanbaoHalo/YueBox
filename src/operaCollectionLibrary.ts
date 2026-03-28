// 越剧收藏库 - 全量本地 mp3，每个条目含 4 句唱词逐句解锁

export interface OperaCollectionItem {
  id: string
  title: string
  performer: string
  displayTitle: string
  rawFileName: string
  audioPath: string
  lyrics: [string, string, string, string]
  needsReview: boolean
}

export const OPERA_COLLECTION_LIBRARY: OperaCollectionItem[] = [
  {
    "id": "raw-34",
    "title": "红楼梦·天上掉下个林妹妹",
    "performer": "徐玉兰",
    "displayTitle": "红楼梦·天上掉下个林妹妹｜徐玉兰",
    "rawFileName": "徐玉兰 - 【越剧】红楼梦 天上掉下个林妹妹_L.mp3",
    "audioPath": "/audio-raw/%E5%BE%90%E7%8E%89%E5%85%B0%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E5%A4%A9%E4%B8%8A%E6%8E%89%E4%B8%8B%E4%B8%AA%E6%9E%97%E5%A6%B9%E5%A6%B9_L.mp3",
    "lyrics": [
      "天上掉下个林妹妹",
      "似一朵轻云刚出岫",
      "娴静犹如花照水",
      "行动好比风扶柳"
    ],
    "needsReview": false
  },
  {
    "id": "raw-22",
    "title": "梁祝·十八相送",
    "performer": "钱惠丽",
    "displayTitle": "梁祝·十八相送｜钱惠丽",
    "rawFileName": "钱惠丽  - 【越剧】梁祝 十八相送_L.mp3",
    "audioPath": "/audio-raw/%E9%92%B1%E6%83%A0%E4%B8%BD%20%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%A2%81%E7%A5%9D%20%E5%8D%81%E5%85%AB%E7%9B%B8%E9%80%81_L.mp3",
    "lyrics": [
      "十八相送情绵绵",
      "同窗三载意难言",
      "一步一回频回首",
      "此去天涯何日还"
    ],
    "needsReview": false
  },
  {
    "id": "raw-37",
    "title": "西厢记·琴心",
    "performer": "袁雪芬",
    "displayTitle": "西厢记·琴心｜袁雪芬",
    "rawFileName": "袁雪芬 - 【越剧】西厢记 琴心_H.mp3",
    "audioPath": "/audio-raw/%E8%A2%81%E9%9B%AA%E8%8A%AC%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E8%A5%BF%E5%8E%A2%E8%AE%B0%20%E7%90%B4%E5%BF%83_H.mp3",
    "lyrics": [
      "春辞兰槛逐芳尘",
      "心事难言对谁诉",
      "一曲相思寄幽怀",
      "月下琴音动芳心"
    ],
    "needsReview": false
  },
  {
    "id": "raw-38",
    "title": "白蛇传·西湖山水还依旧",
    "performer": "张咏梅",
    "displayTitle": "白蛇传·西湖山水还依旧｜张咏梅",
    "rawFileName": "张咏梅 - 【越剧】白蛇传 西湖山水还依旧_H.mp3",
    "audioPath": "/audio-raw/%E5%BC%A0%E5%92%8F%E6%A2%85%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%99%BD%E8%9B%87%E4%BC%A0%20%E8%A5%BF%E6%B9%96%E5%B1%B1%E6%B0%B4%E8%BF%98%E4%BE%9D%E6%97%A7_H.mp3",
    "lyrics": [
      "西湖山水还依旧",
      "断桥伊人不复见",
      "情深难诉心头恨",
      "一片痴心付东流"
    ],
    "needsReview": false
  },
  {
    "id": "raw-30",
    "title": "追鱼·鲤鱼真是眼睛亮",
    "performer": "王志萍",
    "displayTitle": "追鱼·鲤鱼真是眼睛亮｜王志萍",
    "rawFileName": "王志萍 - 【越剧】追鱼 鲤鱼真是眼睛亮_H.mp3",
    "audioPath": "/audio-raw/%E7%8E%8B%E5%BF%97%E8%90%8D%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E8%BF%BD%E9%B1%BC%20%E9%B2%A4%E9%B1%BC%E7%9C%9F%E6%98%AF%E7%9C%BC%E7%9D%9B%E4%BA%AE_H.mp3",
    "lyrics": [
      "鲤鱼眼明情意长",
      "一见书生暗自狂",
      "人妖殊途难相守",
      "痴心一片空思量"
    ],
    "needsReview": false
  },
  {
    "id": "raw-7",
    "title": "红楼梦·黛玉葬花",
    "performer": "单仰萍",
    "displayTitle": "红楼梦·黛玉葬花｜单仰萍",
    "rawFileName": "单仰萍 - 【越剧】红楼梦 黛玉葬花_H.mp3",
    "audioPath": "/audio-raw/%E5%8D%95%E4%BB%B0%E8%90%8D%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E9%BB%9B%E7%8E%89%E8%91%AC%E8%8A%B1_H.mp3",
    "lyrics": [
      "花谢花飞花满天",
      "红消香断有谁怜",
      "一朝春尽红颜老",
      "花落人亡两不知"
    ],
    "needsReview": false
  },
  {
    "id": "raw-12",
    "title": "梁祝·楼台会",
    "performer": "傅全香",
    "displayTitle": "梁祝·楼台会｜傅全香",
    "rawFileName": "傅全香 - 【越剧】梁山伯与祝英台 楼台会_H.mp3",
    "audioPath": "/audio-raw/%E5%82%85%E5%85%A8%E9%A6%99%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%A2%81%E5%B1%B1%E4%BC%AF%E4%B8%8E%E7%A5%9D%E8%8B%B1%E5%8F%B0%20%E6%A5%BC%E5%8F%B0%E4%BC%9A_H.mp3",
    "lyrics": [
      "楼台相会泪潸然",
      "千言万语诉心间",
      "生不能同衾共枕",
      "死愿化蝶共翩翩"
    ],
    "needsReview": false
  },
  {
    "id": "raw-10",
    "title": "西厢记·夜听琴",
    "performer": "方亚芬",
    "displayTitle": "西厢记·夜听琴｜方亚芬",
    "rawFileName": "方亚芬 - 【越剧】西厢记 夜听琴_L.mp3",
    "audioPath": "/audio-raw/%E6%96%B9%E4%BA%9A%E8%8A%AC%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E8%A5%BF%E5%8E%A2%E8%AE%B0%20%E5%A4%9C%E5%90%AC%E7%90%B4_L.mp3",
    "lyrics": [
      "月色溶溶夜沉沉",
      "琴声袅袅诉衷情",
      "隔墙暗递相思意",
      "声声入耳动芳心"
    ],
    "needsReview": false
  },
  {
    "id": "raw-21",
    "title": "白蛇传·合钵",
    "performer": "戚雅仙",
    "displayTitle": "白蛇传·合钵｜戚雅仙",
    "rawFileName": "戚雅仙 - 【越剧】白蛇传 合钵_H.mp3",
    "audioPath": "/audio-raw/%E6%88%9A%E9%9B%85%E4%BB%99%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%99%BD%E8%9B%87%E4%BC%A0%20%E5%90%88%E9%92%B5_H.mp3",
    "lyrics": [
      "西湖依旧水连天",
      "雷峰塔下锁情缘",
      "千年修得同舟梦",
      "一朝离散泪潸然"
    ],
    "needsReview": false
  },
  {
    "id": "raw-17",
    "title": "穆桂英挂帅·出征",
    "performer": "吕瑞英",
    "displayTitle": "穆桂英挂帅·出征｜吕瑞英",
    "rawFileName": "吕瑞英 - 【越剧】穆桂英挂帅 出征_H.mp3",
    "audioPath": "/audio-raw/%E5%90%95%E7%91%9E%E8%8B%B1%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A9%86%E6%A1%82%E8%8B%B1%E6%8C%82%E5%B8%85%20%E5%87%BA%E5%BE%81_H.mp3",
    "lyrics": [
      "辕门外炮声震天",
      "天波府走出将军",
      "铁甲披身威风凛",
      "誓扫边关定乾坤"
    ],
    "needsReview": false
  },
  {
    "id": "raw-26",
    "title": "红楼梦·黛玉葬花",
    "performer": "王文娟",
    "displayTitle": "红楼梦·黛玉葬花｜王文娟",
    "rawFileName": "王文娟 - 【越剧】红楼梦 黛玉葬花_H.mp3",
    "audioPath": "/audio-raw/%E7%8E%8B%E6%96%87%E5%A8%9F%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E9%BB%9B%E7%8E%89%E8%91%AC%E8%8A%B1_H.mp3",
    "lyrics": [
      "花谢花飞春将尽",
      "葬花人比落花悲",
      "一朝红颜随水逝",
      "此恨绵绵无尽时"
    ],
    "needsReview": false
  },
  {
    "id": "raw-4",
    "title": "梁祝·回十八",
    "performer": "陈琦",
    "displayTitle": "梁祝·回十八｜陈琦",
    "rawFileName": "陈琦 - 【越剧】梁祝 回十八_H.mp3",
    "audioPath": "/audio-raw/%E9%99%88%E7%90%A6%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%A2%81%E7%A5%9D%20%E5%9B%9E%E5%8D%81%E5%85%AB_H.mp3",
    "lyrics": [
      "十八相送步步难",
      "回首凝望泪潸然",
      "山盟海誓今犹在",
      "此去天涯何日还"
    ],
    "needsReview": false
  },
  {
    "id": "raw-2",
    "title": "盘妻索妻·洞房悄悄静幽幽",
    "performer": "陈丽君",
    "displayTitle": "盘妻索妻·洞房悄悄静幽幽｜陈丽君",
    "rawFileName": "陈丽君 - 【越剧】盘妻索妻 洞房悄悄静幽幽_H.mp3",
    "audioPath": "/audio-raw/%E9%99%88%E4%B8%BD%E5%90%9B%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%9B%98%E5%A6%BB%E7%B4%A2%E5%A6%BB%20%E6%B4%9E%E6%88%BF%E6%82%84%E6%82%84%E9%9D%99%E5%B9%BD%E5%B9%BD_H.mp3",
    "lyrics": [
      "洞房悄悄静幽幽",
      "红烛摇曳照孤愁",
      "郎君何处迟迟返",
      "独守空帏泪暗流"
    ],
    "needsReview": false
  },
  {
    "id": "raw-40",
    "title": "柳毅传书·惜别",
    "performer": "竺水招",
    "displayTitle": "柳毅传书·惜别｜竺水招",
    "rawFileName": "竺水招 - 【越剧】柳毅传书 惜别_H.mp3",
    "audioPath": "/audio-raw/%E7%AB%BA%E6%B0%B4%E6%8B%9B%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%9F%B3%E6%AF%85%E4%BC%A0%E4%B9%A6%20%E6%83%9C%E5%88%AB_H.mp3",
    "lyrics": [
      "洞庭湖畔惜别时",
      "执手相看泪眼迷",
      "此去人间路迢迢",
      "鱼书难寄相思意"
    ],
    "needsReview": false
  },
  {
    "id": "raw-19",
    "title": "五女拜寿·奉汤",
    "performer": "茅威涛",
    "displayTitle": "五女拜寿·奉汤｜茅威涛",
    "rawFileName": "茅威涛 - 【越剧】五女拜寿 奉汤_L.mp3",
    "audioPath": "/audio-raw/%E8%8C%85%E5%A8%81%E6%B6%9B%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E4%BA%94%E5%A5%B3%E6%8B%9C%E5%AF%BF%20%E5%A5%89%E6%B1%A4_L.mp3",
    "lyrics": [
      "爹娘寿诞喜盈门",
      "五女拜寿献汤羹",
      "愿祝双亲多康健",
      "岁岁平安享天伦"
    ],
    "needsReview": false
  },
  {
    "id": "raw-23",
    "title": "红楼梦·宝玉哭灵",
    "performer": "钱惠丽",
    "displayTitle": "红楼梦·宝玉哭灵｜钱惠丽",
    "rawFileName": "钱惠丽 - 【越剧】红楼梦 宝玉哭灵_H.mp3",
    "audioPath": "/audio-raw/%E9%92%B1%E6%83%A0%E4%B8%BD%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E5%AE%9D%E7%8E%89%E5%93%AD%E7%81%B5_H.mp3",
    "lyrics": [
      "灵前一哭肝肠断",
      "往日音容入梦来",
      "诗稿残篇犹在处",
      "伊人已去不复回"
    ],
    "needsReview": false
  },
  {
    "id": "raw-5",
    "title": "梁祝·记得草桥两结拜",
    "performer": "陈颖",
    "displayTitle": "梁祝·记得草桥两结拜｜陈颖",
    "rawFileName": "陈颖 - 【越剧】梁祝 记得草桥两结拜_H.mp3",
    "audioPath": "/audio-raw/%E9%99%88%E9%A2%96%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%A2%81%E7%A5%9D%20%E8%AE%B0%E5%BE%97%E8%8D%89%E6%A1%A5%E4%B8%A4%E7%BB%93%E6%8B%9C_H.mp3",
    "lyrics": [
      "草桥结拜情意真",
      "携手同窗共苦辛",
      "三载情深难割舍",
      "相送一程泪沾巾"
    ],
    "needsReview": false
  },
  {
    "id": "raw-14",
    "title": "盘夫·官人好比天上月",
    "performer": "金采凤",
    "displayTitle": "盘夫·官人好比天上月｜金采凤",
    "rawFileName": "金采凤 - 【越剧】盘夫 官人好比天上月_H.mp3",
    "audioPath": "/audio-raw/%E9%87%91%E9%87%87%E5%87%A4%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%9B%98%E5%A4%AB%20%E5%AE%98%E4%BA%BA%E5%A5%BD%E6%AF%94%E5%A4%A9%E4%B8%8A%E6%9C%88_H.mp3",
    "lyrics": [
      "官人好比天上月",
      "妾身恰似水中莲",
      "月映莲花两相照",
      "愿与君共此生缘"
    ],
    "needsReview": false
  },
  {
    "id": "raw-25",
    "title": "柳毅传书·有故人来自洞庭对我告",
    "performer": "商芳臣",
    "displayTitle": "柳毅传书·有故人来自洞庭对我告｜商芳臣",
    "rawFileName": "商芳臣 - 【越剧】柳毅传书 有故人来自洞庭对我告_H.mp3",
    "audioPath": "/audio-raw/%E5%95%86%E8%8A%B3%E8%87%A3%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%9F%B3%E6%AF%85%E4%BC%A0%E4%B9%A6%20%E6%9C%89%E6%95%85%E4%BA%BA%E6%9D%A5%E8%87%AA%E6%B4%9E%E5%BA%AD%E5%AF%B9%E6%88%91%E5%91%8A_H.mp3",
    "lyrics": [
      "洞庭水深波浪急",
      "龙女含冤泣无声",
      "托君一纸传书去",
      "但求脱苦得重生"
    ],
    "needsReview": false
  },
  {
    "id": "raw-8",
    "title": "祥林嫂·洞房",
    "performer": "范瑞娟",
    "displayTitle": "祥林嫂·洞房｜范瑞娟",
    "rawFileName": "范瑞娟 - 【越剧】祥林嫂 洞房_H.mp3",
    "audioPath": "/audio-raw/%E8%8C%83%E7%91%9E%E5%A8%9F%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A5%A5%E6%9E%97%E5%AB%82%20%E6%B4%9E%E6%88%BF_H.mp3",
    "lyrics": [
      "洞房花烛夜难眠",
      "旧情未断新愁添",
      "此身已作他人妇",
      "独对孤灯诉心间"
    ],
    "needsReview": false
  },
  {
    "id": "raw-24",
    "title": "红楼梦·金玉良缘",
    "performer": "钱惠丽",
    "displayTitle": "红楼梦·金玉良缘｜钱惠丽",
    "rawFileName": "钱惠丽 - 【越剧】红楼梦 金玉良缘_H.mp3",
    "audioPath": "/audio-raw/%E9%92%B1%E6%83%A0%E4%B8%BD%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E9%87%91%E7%8E%89%E8%89%AF%E7%BC%98_H.mp3",
    "lyrics": [
      "凤冠霞帔非心愿",
      "洞房花烛泪暗弹",
      "金玉良缘原是梦",
      "木石前盟断肠时"
    ],
    "needsReview": false
  },
  {
    "id": "raw-3",
    "title": "新梁祝·草桥结拜",
    "performer": "陈丽君+李云霄",
    "displayTitle": "新梁祝·草桥结拜｜陈丽君+李云霄",
    "rawFileName": "陈丽君+李云霄 - 【越剧】新梁祝 草桥结拜_H.mp3",
    "audioPath": "/audio-raw/%E9%99%88%E4%B8%BD%E5%90%9B+%E6%9D%8E%E4%BA%91%E9%9C%84%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%96%B0%E6%A2%81%E7%A5%9D%20%E8%8D%89%E6%A1%A5%E7%BB%93%E6%8B%9C_H.mp3",
    "lyrics": [
      "草桥相逢缘分深",
      "义结金兰两少年",
      "同窗共读三载过",
      "情谊深厚胜骨亲"
    ],
    "needsReview": false
  },
  {
    "id": "raw-6",
    "title": "碧玉簪·新房之中冷清清",
    "performer": "单仰萍",
    "displayTitle": "碧玉簪·新房之中冷清清｜单仰萍",
    "rawFileName": "单仰萍 - 【越剧】碧玉簪 新房之中冷清清_H.mp3",
    "audioPath": "/audio-raw/%E5%8D%95%E4%BB%B0%E8%90%8D%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A2%A7%E7%8E%89%E7%B0%AA%20%E6%96%B0%E6%88%BF%E4%B9%8B%E4%B8%AD%E5%86%B7%E6%B8%85%E6%B8%85_H.mp3",
    "lyrics": [
      "新房之中冷清清",
      "孤灯相伴泪盈盈",
      "一朝错嫁心难诉",
      "万般愁苦寄谁听"
    ],
    "needsReview": false
  },
  {
    "id": "raw-28",
    "title": "春香传·阵阵细雨阵阵风",
    "performer": "王志萍",
    "displayTitle": "春香传·阵阵细雨阵阵风｜王志萍",
    "rawFileName": "王志萍 - 【越剧】春香传 阵阵细雨阵阵风_L.mp3",
    "audioPath": "/audio-raw/%E7%8E%8B%E5%BF%97%E8%90%8D%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%98%A5%E9%A6%99%E4%BC%A0%20%E9%98%B5%E9%98%B5%E7%BB%86%E9%9B%A8%E9%98%B5%E9%98%B5%E9%A3%8E_L.mp3",
    "lyrics": [
      "阵阵细雨湿芭蕉",
      "声声滴碎相思情",
      "春风吹过花自落",
      "一片愁心对谁诉"
    ],
    "needsReview": false
  },
  {
    "id": "raw-31",
    "title": "情探·状元公不要太书呆",
    "performer": "吴小楼",
    "displayTitle": "情探·状元公不要太书呆｜吴小楼",
    "rawFileName": "吴小楼 - 【越剧】情探 状元公不要太书呆_H.mp3",
    "audioPath": "/audio-raw/%E5%90%B4%E5%B0%8F%E6%A5%BC%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%83%85%E6%8E%A2%20%E7%8A%B6%E5%85%83%E5%85%AC%E4%B8%8D%E8%A6%81%E5%A4%AA%E4%B9%A6%E5%91%86_H.mp3",
    "lyrics": [
      "当年誓言犹在耳",
      "今日富贵便忘情",
      "负义薄幸终有报",
      "莫道苍天不分明"
    ],
    "needsReview": false
  },
  {
    "id": "raw-33",
    "title": "红楼梦·金玉良缘",
    "performer": "徐玉兰",
    "displayTitle": "红楼梦·金玉良缘｜徐玉兰",
    "rawFileName": "徐玉兰 - 【越剧】红楼梦 金玉良缘_H.mp3",
    "audioPath": "/audio-raw/%E5%BE%90%E7%8E%89%E5%85%B0%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E9%87%91%E7%8E%89%E8%89%AF%E7%BC%98_H.mp3",
    "lyrics": [
      "木石前盟随风散",
      "金玉良缘奈若何",
      "宝钗无语泪暗落",
      "黛玉含冤归离恨"
    ],
    "needsReview": false
  },
  {
    "id": "raw-13",
    "title": "碧玉簪·三盖衣",
    "performer": "金采风",
    "displayTitle": "碧玉簪·三盖衣｜金采风",
    "rawFileName": "金采风 - 【越剧】碧玉簪 三盖衣_H.mp3",
    "audioPath": "/audio-raw/%E9%87%91%E9%87%87%E9%A3%8E%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A2%A7%E7%8E%89%E7%B0%AA%20%E4%B8%89%E7%9B%96%E8%A1%A3_H.mp3",
    "lyrics": [
      "三盖罗衾情意深",
      "含情脉脉覆香衾",
      "此恩此爱难忘却",
      "夫妻情重似黄金"
    ],
    "needsReview": false
  },
  {
    "id": "raw-16",
    "title": "送花楼会·我为你小姐珍珠凤",
    "performer": "陆锦花",
    "displayTitle": "送花楼会·我为你小姐珍珠凤｜陆锦花",
    "rawFileName": "陆锦花 - 【越剧】送花楼会 我为你小姐珍珠凤_H.mp3",
    "audioPath": "/audio-raw/%E9%99%86%E9%94%A6%E8%8A%B1%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E9%80%81%E8%8A%B1%E6%A5%BC%E4%BC%9A%20%E6%88%91%E4%B8%BA%E4%BD%A0%E5%B0%8F%E5%A7%90%E7%8F%8D%E7%8F%A0%E5%87%A4_H.mp3",
    "lyrics": [
      "珍珠凤冠千里送",
      "一片痴情寄此身",
      "深情厚谊君须记",
      "此去天涯莫负人"
    ],
    "needsReview": false
  },
  {
    "id": "raw-18",
    "title": "何文秀·算命",
    "performer": "茅威涛",
    "displayTitle": "何文秀·算命｜茅威涛",
    "rawFileName": "茅威涛 - 【越剧】何文秀 算命_L.mp3",
    "audioPath": "/audio-raw/%E8%8C%85%E5%A8%81%E6%B6%9B%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E4%BD%95%E6%96%87%E7%A7%80%20%E7%AE%97%E5%91%BD_L.mp3",
    "lyrics": [
      "算命先生口若悬",
      "富贵穷通总是缘",
      "一番言语欺世俗",
      "无凭无据骗银钱"
    ],
    "needsReview": false
  },
  {
    "id": "raw-11",
    "title": "祥林嫂·听他一番心酸话",
    "performer": "方亚芬",
    "displayTitle": "祥林嫂·听他一番心酸话｜方亚芬",
    "rawFileName": "方亚芬 - 【越剧】祥林嫂 听他一番心酸话_H.mp3",
    "audioPath": "/audio-raw/%E6%96%B9%E4%BA%9A%E8%8A%AC%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A5%A5%E6%9E%97%E5%AB%82%20%E5%90%AC%E4%BB%96%E4%B8%80%E7%95%AA%E5%BF%83%E9%85%B8%E8%AF%9D_H.mp3",
    "lyrics": [
      "听他一番辛酸话",
      "字字如针刺我心",
      "半生漂泊多磨难",
      "几度风霜苦难陈"
    ],
    "needsReview": false
  },
  {
    "id": "raw-36",
    "title": "红楼梦·宝玉哭灵",
    "performer": "尹桂芳",
    "displayTitle": "红楼梦·宝玉哭灵｜尹桂芳",
    "rawFileName": "尹桂芳 - 【越剧】红楼梦 宝玉哭灵_H.mp3",
    "audioPath": "/audio-raw/%E5%B0%B9%E6%A1%82%E8%8A%B3%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E5%AE%9D%E7%8E%89%E5%93%AD%E7%81%B5_H.mp3",
    "lyrics": [
      "林妹妹香消玉殒去",
      "宝玉哭灵泪满腮",
      "往日恩情成追忆",
      "此恨绵绵无尽时"
    ],
    "needsReview": false
  },
  {
    "id": "raw-35",
    "title": "碧玉簪·归宁",
    "performer": "姚水娟",
    "displayTitle": "碧玉簪·归宁｜姚水娟",
    "rawFileName": "姚水娟 - 【越剧】碧玉簪 归宁_H.mp3",
    "audioPath": "/audio-raw/%E5%A7%9A%E6%B0%B4%E5%A8%9F%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A2%A7%E7%8E%89%E7%B0%AA%20%E5%BD%92%E5%AE%81_H.mp3",
    "lyrics": [
      "归宁路上心如焚",
      "深闺委屈向谁陈",
      "当年误解今已解",
      "夫妻情重共白头"
    ],
    "needsReview": false
  },
  {
    "id": "raw-20",
    "title": "孔雀东南飞·惜别离",
    "performer": "茅威涛",
    "displayTitle": "孔雀东南飞·惜别离｜茅威涛",
    "rawFileName": "茅威涛 -【越剧】孔雀东南飞 惜别离_L.mp3",
    "audioPath": "/audio-raw/%E8%8C%85%E5%A8%81%E6%B6%9B%20-%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E5%AD%94%E9%9B%80%E4%B8%9C%E5%8D%97%E9%A3%9E%20%E6%83%9C%E5%88%AB%E7%A6%BB_L.mp3",
    "lyrics": [
      "孔雀东南飞去远",
      "五里一徘徊留连",
      "君既为吏难脱身",
      "守节持志情不迁"
    ],
    "needsReview": false
  },
  {
    "id": "raw-15",
    "title": "九斤姑娘·我格祖父会起早",
    "performer": "李云霄",
    "displayTitle": "九斤姑娘·我格祖父会起早｜李云霄",
    "rawFileName": "李云霄 - 【越剧】九斤姑娘 我格祖父会起早_H.mp3",
    "audioPath": "/audio-raw/%E6%9D%8E%E4%BA%91%E9%9C%84%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E4%B9%9D%E6%96%A4%E5%A7%91%E5%A8%98%20%E6%88%91%E6%A0%BC%E7%A5%96%E7%88%B6%E4%BC%9A%E8%B5%B7%E6%97%A9_H.mp3",
    "lyrics": [
      "祖父起早天未明",
      "鸡鸣犬吠未曾听",
      "摸黑劳作勤耕种",
      "一生辛苦为儿孙"
    ],
    "needsReview": false
  },
  {
    "id": "raw-39",
    "title": "李翠英·告状",
    "performer": "张云霞",
    "displayTitle": "李翠英·告状｜张云霞",
    "rawFileName": "张云霞 - 【越剧】李翠英 告状_H.mp3",
    "audioPath": "/audio-raw/%E5%BC%A0%E4%BA%91%E9%9C%9E%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%9D%8E%E7%BF%A0%E8%8B%B1%20%E5%91%8A%E7%8A%B6_H.mp3",
    "lyrics": [
      "手持诉状赴公堂",
      "声声泣诉断人肠",
      "青天在上明如镜",
      "沉冤昭雪有何难"
    ],
    "needsReview": false
  },
  {
    "id": "raw-27",
    "title": "慧梅·劝嫁",
    "performer": "王文娟",
    "displayTitle": "慧梅·劝嫁｜王文娟",
    "rawFileName": "王文娟 - 【越剧】慧梅 劝嫁_H.mp3",
    "audioPath": "/audio-raw/%E7%8E%8B%E6%96%87%E5%A8%9F%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%85%A7%E6%A2%85%20%E5%8A%9D%E5%AB%81_H.mp3",
    "lyrics": [
      "莫把愁眉锁春容",
      "前路尚有花正红",
      "他日若逢良人处",
      "愿得安稳共从容"
    ],
    "needsReview": false
  },
  {
    "id": "raw-29",
    "title": "毋忘曲·我本是出世贵人书生养",
    "performer": "王志萍",
    "displayTitle": "毋忘曲·我本是出世贵人书生养｜王志萍",
    "rawFileName": "王志萍 - 【越剧】毋忘曲 我本是出世贵人书生养_L.mp3",
    "audioPath": "/audio-raw/%E7%8E%8B%E5%BF%97%E8%90%8D%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E6%AF%8B%E5%BF%98%E6%9B%B2%20%E6%88%91%E6%9C%AC%E6%98%AF%E5%87%BA%E4%B8%96%E8%B4%B5%E4%BA%BA%E4%B9%A6%E7%94%9F%E5%85%BB_L.mp3",
    "lyrics": [
      "寒窗十载志弥坚",
      "苦读诗书不问年",
      "今朝得遂平生愿",
      "莫忘布衣旧时缘"
    ],
    "needsReview": false
  },
  {
    "id": "raw-1",
    "title": "血手印·法场祭夫",
    "performer": "毕春芳",
    "displayTitle": "血手印·法场祭夫｜毕春芳",
    "rawFileName": "毕春芳 - 【越剧】血手印 法场祭夫_H.mp3",
    "audioPath": "/audio-raw/%E6%AF%95%E6%98%A5%E8%8A%B3%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E8%A1%80%E6%89%8B%E5%8D%B0%20%E6%B3%95%E5%9C%BA%E7%A5%AD%E5%A4%AB_H.mp3",
    "lyrics": [
      "法场风冷祭孤魂",
      "血泪和成一纸冤",
      "含屈九泉难瞑目",
      "望郎珍重莫悲伤"
    ],
    "needsReview": false
  },
  {
    "id": "raw-9",
    "title": "碧玉簪·谯楼打罢二更鼓",
    "performer": "方亚芬",
    "displayTitle": "碧玉簪·谯楼打罢二更鼓｜方亚芬",
    "rawFileName": "方亚芬 - 【越剧】碧玉簪 谯楼打罢二更鼓_H.mp3",
    "audioPath": "/audio-raw/%E6%96%B9%E4%BA%9A%E8%8A%AC%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%A2%A7%E7%8E%89%E7%B0%AA%20%E8%B0%AF%E6%A5%BC%E6%89%93%E7%BD%A2%E4%BA%8C%E6%9B%B4%E9%BC%93_H.mp3",
    "lyrics": [
      "谯楼打罢二更鼓",
      "灯昏人静夜漫漫",
      "郎君一去无音讯",
      "独守空房泪不干"
    ],
    "needsReview": false
  },
  {
    "id": "raw-32",
    "title": "红楼梦·笞宝玉",
    "performer": "徐天红",
    "displayTitle": "红楼梦·笞宝玉｜徐天红",
    "rawFileName": "徐天红 - 【越剧】红楼梦 笞宝玉_H.mp3",
    "audioPath": "/audio-raw/%E5%BE%90%E5%A4%A9%E7%BA%A2%20-%20%E3%80%90%E8%B6%8A%E5%89%A7%E3%80%91%E7%BA%A2%E6%A5%BC%E6%A2%A6%20%E7%AC%9E%E5%AE%9D%E7%8E%89_H.mp3",
    "lyrics": [
      "不肖孽障惹祸端",
      "父心虽疼执家法",
      "手举荆条泪先落",
      "骨肉情深难割舍"
    ],
    "needsReview": false
  }
]

// ─── 解锁状态 (localStorage) ───
const colKey = (id: string) => `yuebox-col-${id}`

export function loadColUnlocked(id: string): number[] {
  const v = localStorage.getItem(colKey(id))
  return v ? JSON.parse(v) : []
}

export function unlockColLyric(id: string): number {
  const item = OPERA_COLLECTION_LIBRARY.find(x => x.id === id)
  if (!item) return 0
  const unlocked = loadColUnlocked(id)
  const next = unlocked.length
  if (next >= item.lyrics.length) return unlocked.length
  const newUnlocked = [...unlocked, next]
  localStorage.setItem(colKey(id), JSON.stringify(newUnlocked))
  return newUnlocked.length
}

export function isColComplete(id: string): boolean {
  const item = OPERA_COLLECTION_LIBRARY.find(x => x.id === id)
  if (!item) return false
  return loadColUnlocked(id).length >= item.lyrics.length
}

// 基于收藏库的完成唱段数（供徽章系统使用）
export function loadCompletedCountFromCol(): number {
  return OPERA_COLLECTION_LIBRARY.filter(item => isColComplete(item.id)).length
}
