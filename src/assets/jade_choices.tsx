import { JadeChoice } from "./types";

const jade_choices = [
  [
    { reward: "镐子", amount: 10, cost: 10 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "2星骑士召集券", amount: 1, cost: 5 },
    { reward: "委托书", amount: 3, cost: 2 },
  ],
  [
    { reward: "钻石", amount: 1288, cost: 5 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "召集券", amount: 3, cost: 3 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "钻石", amount: 1288, cost: 5 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "委托书", amount: 3, cost: 2 },
  ],
  [
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "力量精髓", amount: 1500, cost: 10 },
    { reward: "传说三阶装备箱", amount: 1, cost: 6 },
    { reward: "随机资源小袋", amount: 1, cost: 1 },
  ],
  [
    { reward: "传说三阶武器箱", amount: 1, cost: 5 },
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "觉醒石", amount: 3, cost: 30 },
    { reward: "风属性高级召集券", amount: 1, cost: 8 },
    { reward: "镐子", amount: 8, cost: 8 },
  ],
  [
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "委托书", amount: 5, cost: 3 },
    { reward: "钻石", amount: 888, cost: 3 },
  ],
  [
    { reward: "传说四阶装备箱", amount: 1, cost: 8 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "友情骑士召集券", amount: 1, cost: 8 },
    { reward: "核心", amount: 3000, cost: 5 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
  ],
  [
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "魔法粉末", amount: 1200, cost: 8 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "委托书", amount: 5, cost: 3 },
  ],
  [
    { reward: "镐子", amount: 10, cost: 10 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "镐子", amount: 3, cost: 5 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "3星骑士召集券", amount: 1, cost: 6 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
    { reward: "委托书", amount: 5, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "水枪", amount: 3, cost: 5 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "觉醒石", amount: 3, cost: 30 },
    { reward: "土属性高级召集券", amount: 1, cost: 8 },
    { reward: "3星骑士召集券", amount: 1, cost: 6 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "水枪", amount: 1, cost: 2 },
  ],
  [
    { reward: "钻石", amount: 1888, cost: 6 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "传说四阶装备箱", amount: 1, cost: 8 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "委托书", amount: 5, cost: 3 },
  ],
  [
    { reward: "3星骑士召集券", amount: 1, cost: 6 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "传说三阶装备箱", amount: 1, cost: 6 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "委托书", amount: 5, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "镐子", amount: 10, cost: 10 },
    { reward: "委托书", amount: 5, cost: 3 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "钻石", amount: 1888, cost: 6 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
    { reward: "核心", amount: 3000, cost: 5 },
  ],
  [
    { reward: "觉醒石", amount: 5, cost: 40 },
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "水枪", amount: 1, cost: 2 },
  ],
  [
    { reward: "镐子", amount: 10, cost: 10 },
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "委托书", amount: 10, cost: 5 },
  ],
  [
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
    { reward: "钻石", amount: 888, cost: 3 },
  ],
  [
    { reward: "土属性高级召集券", amount: 1, cost: 8 },
    { reward: "钻石", amount: 888, cost: 3 },
    { reward: "魔法粉末", amount: 800, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "2星骑士召集券", amount: 1, cost: 5 },
    { reward: "钻石", amount: 888, cost: 3 },
  ],
  [
    { reward: "核心", amount: 5000, cost: 8 },
    { reward: "星彩蓝宝石", amount: 5000, cost: 8 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "友情骑士召集券", amount: 1, cost: 8 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "传说四阶装备箱", amount: 1, cost: 8 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
  ],
  [
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "钻石", amount: 1888, cost: 6 },
    { reward: "镐子", amount: 3, cost: 5 },
  ],
  [
    { reward: "钻石", amount: 1288, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "觉醒石", amount: 5, cost: 40 },
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "镐子", amount: 3, cost: 5 },
  ],
  [
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "传说四阶装备箱", amount: 1, cost: 8 },
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "友情骑士召集券", amount: 1, cost: 6 },
  ],
  [
    { reward: "友情骑士召集券", amount: 1, cost: 8 },
    { reward: "委托书", amount: 10, cost: 5 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
  ],
  [
    { reward: "风属性高级召集券", amount: 1, cost: 8 },
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "土属性高级召集券", amount: 1, cost: 8 },
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 40, cost: 10 },
    { reward: "钻石", amount: 1888, cost: 6 },
    { reward: "钻石", amount: 1288, cost: 5 },
  ],
  [
    { reward: "水属性高级召集券", amount: 1, cost: 8 },
    { reward: "委托书", amount: 10, cost: 5 },
    { reward: "召集券", amount: 3, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
  ],
  [
    { reward: "觉醒石", amount: 8, cost: 64 },
    { reward: "力量精髓", amount: 500, cost: 5 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "镐子", amount: 10, cost: 10 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "随机资源小袋", amount: 1, cost: 1 },
  ],
  [
    { reward: "传说四阶装备箱", amount: 1, cost: 8 },
    { reward: "核心", amount: 5000, cost: 8 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "钻石", amount: 888, cost: 3 },
    { reward: "力量精髓", amount: 500, cost: 5 },
  ],
  [
    { reward: "钻石", amount: 1888, cost: 6 },
    { reward: "镐子", amount: 8, cost: 8 },
    { reward: "2星灵魂自选", amount: 10, cost: 2 },
  ],
  [
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "3星灵魂自选", amount: 20, cost: 8 },
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
  ],
  [
    { reward: "火属性高级召集券", amount: 1, cost: 8 },
    { reward: "镐子", amount: 3, cost: 5 },
    { reward: "2星骑士召集券", amount: 1, cost: 5 },
  ],
  [
    { reward: "3星骑士召集券", amount: 1, cost: 6 },
    { reward: "召集券", amount: 3, cost: 3 },
    { reward: "派对盲盒", amount: 1, cost: 3 },
  ],
  [
    { reward: "3星灵魂自选", amount: 10, cost: 5 },
    { reward: "钻石", amount: 1288, cost: 5 },
    { reward: "魔法粉末", amount: 1000, cost: 5 },
  ],
  [
    { reward: "觉醒石", amount: 10, cost: 70 },
    { reward: "水属性高级召集券", amount: 1, cost: 8 },
    { reward: "3星骑士召集券", amount: 1, cost: 6 },
  ],
] as const satisfies JadeChoice[];

export default jade_choices;
