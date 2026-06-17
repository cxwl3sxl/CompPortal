# 内网门户

统一内网系统入口，支持分类浏览、搜索和移动端适配。

## 快速开始

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # 输出到 dist/
```

> 纯静态前端，无后端依赖。`public/` 下的 JSON 文件在浏览器端通过 `fetch()` 加载。

## 项目结构

```
├── public/               # 静态资源（直接部署）
│   ├── portal.json       # 门户数据（分类定义 + 系统子文件引用）
│   ├── systems/          # 各分类的系统列表
│   │   ├── public-systems.json
│   │   ├── product-deployment.json
│   │   ├── dev-tools.json
│   │   └── internal-network.json
│   ├── site.json         # 站点标题配置
│   ├── help.json         # 帮助内容配置
│   ├── logo.svg
│   └── favicon.svg
├── src/                  # Vue 前端
│   ├── components/       # 组件
│   ├── views/            # 页面
│   ├── router/           # 路由
│   ├── store/            # Pinia 状态管理
│   └── styles/           # 全局样式
├── index.html
├── vite.config.js
└── package.json
```

## 配置数据

### portal.json — 分类与系统入口

顶层数组，每项定义一个分类，`systems` 指向 `public/systems/` 下的子文件：

```json
{
  "name": "公网系统",
  "description": "部署于公网的各个系统",
  "icon": "globe",
  "systems": "systems/public-systems.json"
}
```

| 字段 | 说明 |
|------|------|
| `name` | 分类名称 |
| `description` | 分类描述 |
| `icon` | Font Awesome 图标名（fas） |
| `systems` | 系统列表子文件的路径 |

### 系统条目格式

子文件为对象数组，每个对象代表一个系统：

```json
{
  "name": "急救秘书管理中心",
  "url": "https://sec-mgr-center.pjservice.cn/",
  "description": "急救秘书管理、注册中心",
  "icon": "file-word",
  "tags": ["急救秘书"],
  "department": "研发部"
}
```

| 字段 | 说明 |
|------|------|
| `name` | 系统名称 |
| `url` | 系统链接 |
| `description` | 系统描述 |
| `icon` | (可选) Font Awesome 图标名，为空则使用多彩渐变默认图标 |
| `tags` | 标签数组，用于搜索匹配 |
| `department` | 所属部门 |

> 编辑后无需重新构建，刷新浏览器即可生效。生产环境重新部署 `dist/` 即可。

## 配置站点标题

编辑 `public/site.json` 修改站点标题和 badge：

```json
{
  "title": "品杰科技",
  "badge": "Portal",
  "logo": "/logo.svg"
}
```

| 字段 | 说明 |
|------|------|
| `title` | 站点标题，显示在顶部导航栏 |
| `badge` | 标签文字，显示在标题右侧 |
| `logo` | Logo 图片路径 |

> 请求失败或文件缺失时，默认显示标题为"XX公司"。

## 配置帮助内容

编辑 `public/help.json` 修改帮助弹窗中的使用说明（字符串数组，每项渲染为一条有序列表）：

```json
[
  "本系统部署于 192.168.0.31 上",
  "如果需要新增系统，请远程到服务器（桌面有快捷方式：门户注册）或联系研发部处理",
  "系统注册表位于portal.json以及其引用的文件中",
  "系统图标支持fa系列图标，如果为空则使用默认图标",
  "fa系列图标点击右侧“ICON清单查询”"
]
```

> 请求失败时，默认显示"欢迎使用XX公司门户网站"。

## 技术栈

- **框架**: Vue 3 + Vite
- **UI 库**: Element Plus + Font Awesome 6
- **状态管理**: Pinia
- **样式**: SCSS + CSS Custom Properties (深色/浅色双主题)
- **数据**: JSON 文件 (浏览器端 fetch 加载，无需后端)