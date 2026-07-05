/*
 * 网站内容配置
 * 后续新增案例：复制 projects 数组中的一个 {...}，修改文字、分类和图片路径即可。
 * category 必须与 categories 中的 id 对应；图片放入 assets/images 文件夹。
 */
window.SITE_CONTENT = {
  categories: [
    { id: "all", label: "全部" },
    { id: "courtyard", label: "私人庭院" },
    { id: "residential", label: "地产景观" },
    { id: "roof", label: "屋顶花园" }
  ],
  services: [
    { number: "01", title: "私人定制庭院", text: "别墅庭院、联排花园、阳台露台，从生活方式出发量身设计。" },
    { number: "02", title: "景观设计", text: "梳理场地、功能与风格，完成从概念方案到施工图的系统设计。" },
    { number: "03", title: "工程施工", text: "自有专业团队统筹材料、工艺与进度，保障设计效果完整落地。" },
    { number: "04", title: "焕新与养护", text: "面向已建庭院提供局部提升、植物调整和长期维护建议。" }
  ],
  projects: [
    { title: "龙湾花园", category: "courtyard", categoryLabel: "私人庭院", image: "assets/images/page-20.jpg", size: "large" },
    { title: "南塘府联排", category: "courtyard", categoryLabel: "私人庭院", image: "assets/images/page-21.jpg", size: "standard" },
    { title: "学院路 7 号", category: "courtyard", categoryLabel: "私人庭院", image: "assets/images/page-22.jpg", size: "standard" },
    { title: "华侨别墅", category: "courtyard", categoryLabel: "私人庭院", image: "assets/images/page-23.jpg", size: "wide" },
    { title: "办公建筑屋顶花园", category: "roof", categoryLabel: "屋顶花园", image: "assets/images/page-24.jpg", size: "standard" },
    { title: "光辉之城", category: "residential", categoryLabel: "地产景观", image: "assets/images/page-10.jpg", size: "standard" },
    { title: "未来海岸", category: "residential", categoryLabel: "地产景观", image: "assets/images/page-11.jpg", size: "standard" },
    { title: "瓯江城", category: "residential", categoryLabel: "地产景观", image: "assets/images/page-13.jpg", size: "wide" }
  ],
  process: [
    { number: "01", title: "需求沟通", text: "了解场地信息、家庭需求、审美偏好与项目预算。" },
    { number: "02", title: "现场踏勘", text: "测量现状，分析采光、动线、视线与施工条件。" },
    { number: "03", title: "方案设计", text: "确定空间结构、风格方向、材料与植物系统。" },
    { number: "04", title: "深化施工", text: "完善施工图纸，组织专业团队进场并全程管控。" },
    { number: "05", title: "交付养护", text: "验收交付，并提供植物养护与后续使用建议。" }
  ]
};
