# 品杰科技

统一内网系统入口，支持分类浏览、搜索和移动端适配。

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
# 同时启动前后端（推荐）
npm run dev & npm run server:dev

# 或分别启动
npm run dev        # 前端 http://localhost:5173
npm run server:dev # 后端 http://localhost:3001
```

### 生产构建
```bash
npm run build
```

## 项目结构

```
├── data/               # JSON数据文件
│   ├── categories.json # 分类配置
│   └── systems.json    # 系统链接配置
├── public/             # 静态资源
├── server/             # Express后端
│   └── index.js
├── src/                # Vue前端
│   ├── components/     # 组件
│   ├── views/          # 页面
│   ├── router/         # 路由
│   ├── store/          # Pinia状态管理
│   └── styles/         # 全局样式
├── index.html
├── vite.config.js
└── package.json
```

## 配置系统链接

编辑 `data/systems.json` 添加或修改系统：

```json
{
  "id": "sys-1",
  "name": "系统名称",
  "url": "http://system.company.com",
  "description": "系统简介",
  "icon": "document",
  "category": "cat-1",
  "tags": ["标签1", "标签2"],
  "department": "所属部门",
  "isActive": true,
  "sortOrder": 0
}
```

## 配置分类

编辑 `data/categories.json` 管理分类：

```json
{
  "id": "cat-1",
  "name": "分类名称",
  "description": "分类描述",
  "icon": "Monitor",
  "sortOrder": 0
}
```

## API接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/systems | 获取所有系统 |
| POST | /api/systems | 创建系统 |
| PUT | /api/systems/:id | 更新系统 |
| DELETE | /api/systems/:id | 删除系统 |
| GET | /api/categories | 获取所有分类 |
| POST | /api/categories | 创建分类 |
| PUT | /api/categories/:id | 更新分类 |
| DELETE | /api/categories/:id | 删除分类 |

## 技术栈

- **前端**: Vue 3 + Vite + Element Plus + Pinia
- **后端**: Node.js + Express
- **数据**: JSON文件存储