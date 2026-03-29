import type { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "interest",
    title: "哪类活动最容易让你持续投入？",
    helper: "选最接近你真实兴趣的一项。",
    options: [
      { label: "做作品、写代码、解决问题", value: "tech-build", tags: ["编程", "技术", "提升技能"] },
      { label: "用镜头、舞台或内容表达自己", value: "creative-stage", tags: ["摄影", "创作", "表达"] },
      { label: "运动训练和竞技对抗", value: "sports", tags: ["篮球", "比赛导向"] },
      { label: "认识人、参与轻松活动", value: "social", tags: ["社交导向", "交朋友"] },
    ],
  },
  {
    id: "style",
    title: "你更喜欢哪种参与方式？",
    helper: "没有标准答案，只看你想要的大学节奏。",
    options: [
      { label: "时间灵活，轻松参与", value: "light", tags: ["轻量参与"], intensity: "light" },
      { label: "固定节奏，愿意稳定投入", value: "steady", tags: ["固定训练"], intensity: "high" },
      { label: "项目导向，阶段性冲刺", value: "project", tags: ["策划", "提升技能"], intensity: "medium" },
      { label: "朋友一起玩最重要", value: "friends", tags: ["社交导向", "交朋友"], intensity: "light" },
    ],
  },
  {
    id: "goal",
    title: "你最希望社团给你带来什么？",
    helper: "选最核心的一项。",
    options: [
      { label: "提升技能，做出作品", value: "skill", tags: ["提升技能", "丰富履历"] },
      { label: "交朋友，快速融入校园", value: "friends", tags: ["交朋友", "社交导向"] },
      { label: "参加比赛，挑战自己", value: "competition", tags: ["参加比赛", "比赛导向"] },
      { label: "保留兴趣，让大学更有趣", value: "fun", tags: ["释放兴趣", "创作"] },
    ],
  },
  {
    id: "role",
    title: "你更期待在团队里扮演什么角色？",
    helper: "这会影响推荐的社团风格。",
    options: [
      { label: "台前表达和展示", value: "front", tags: ["表达"] },
      { label: "幕后执行和技术支持", value: "back", tags: ["技术", "运营"] },
      { label: "策划组织和推动项目", value: "lead", tags: ["策划", "组织"] },
      { label: "边做边找自己的位置", value: "open", tags: ["轻量参与", "交朋友"] },
    ],
  },
];
