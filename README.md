# API Hub

Honoフレームワークで構築されたCloudflare Workers APIハブです。このプロジェクトは、APIスキーマ定義にTypeSpec、コード生成にOrvalを使用しています。

## 前提条件

- [Bun](https://bun.sh/)
- Cloudflareアカウント(デプロイ用)

## はじめに

### インストール

```bash
bun install
```

### 開発

ローカルで開発サーバーを起動:

```bash
bun run dev
```

APIは `http://localhost:8787` (Wranglerのデフォルトポート)で利用できます。

### Cloudflare型の生成

wrangler設定からCloudflareバインディングのTypeScript型を生成:

```bash
bun run cf-typegen
```

`Hono`をインスタンス化する際に、`CloudflareBindings`をジェネリクスとして渡してください:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

### デプロイ

Cloudflare Workersにデプロイ:

```bash
bun run deploy
```
