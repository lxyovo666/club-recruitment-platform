export const tagGroups = [
  {
    title: "兴趣方向",
    tags: ["编程", "摄影", "街舞", "辩论", "志愿服务", "音乐", "篮球", "动漫"],
  },
  {
    title: "能力倾向",
    tags: ["表达", "组织", "创作", "技术", "策划", "运营"],
  },
  {
    title: "参与方式",
    tags: ["轻量参与", "固定训练", "比赛导向", "社交导向"],
  },
  {
    title: "成长目标",
    tags: ["交朋友", "提升技能", "丰富履历", "参加比赛", "释放兴趣"],
  },
];

export const allTags = tagGroups.flatMap((group) => group.tags);
