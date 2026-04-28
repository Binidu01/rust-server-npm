<div align="center">

# ⚡ bini-rust-server

**Production server for Bini.js apps — Rust core, Node.js API runtime.**

[![npm version](https://img.shields.io/npm/v/bini-rust-server?style=flat-square&color=f97316&label=npm)](https://www.npmjs.com/package/bini-rust-server)
[![npm downloads](https://img.shields.io/npm/dm/bini-rust-server?style=flat-square&color=f97316)](https://www.npmjs.com/package/bini-rust-server)
[![license](https://img.shields.io/npm/l/bini-rust-server?style=flat-square&color=22c55e)](https://github.com/Binidu01/bini-rust-server/blob/main/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/Binidu01/bini-rust-server/build.yml?style=flat-square&label=build)](https://github.com/Binidu01/bini-rust-server/actions)
[![GitHub release](https://img.shields.io/github/v/release/Binidu01/bini-rust-server?style=flat-square&color=6366f1&label=latest)](https://github.com/Binidu01/bini-rust-server/releases/latest)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)](https://nodejs.org)
[![Platforms](https://img.shields.io/badge/platforms-win%20%7C%20mac%20%7C%20linux-blue?style=flat-square)](#supported-platforms)

</div>

---

## ✨ Features

| | |
|---|---|
| 🚀 **Blazing fast** | Rust-powered static serving with [Axum](https://github.com/tokio-rs/axum) |
| 📁 **File-based API routes** | Drop `.ts` files in `src/app/api/` — they just work |
| 🔧 **Zero config** | No build step for your backend code |
| 🌐 **Production ready** | Battle-tested for real-world deployments |
| 📦 **Single binary** | Easy distribution via npm — no Rust toolchain needed |

---

## 📦 Installation

```bash
# npm
npm install bini-rust-server --save-dev

# pnpm
pnpm add bini-rust-server -D

# yarn
yarn add bini-rust-server --dev
```

---

## 🚀 Quick Start

**1. Add to your `package.json` scripts:**

```json
{
  "scripts": {
    "start": "bini-rust-server"
  }
}
```

**2. Run the server:**

```bash
npm start
```

That's it. Your Rust server is running. 🎉


---

## ⚙️ Configuration

All configuration is done via environment variables — no config files needed.

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `BINI_DIST_DIR` | Static files directory | `dist/` |
| `BINI_API_DIR` | API routes directory | `src/app/api` |
| `BINI_BODY_TIMEOUT_SECS` | Request body read timeout | `30` |
| `BINI_HANDLER_TIMEOUT_SECS` | API handler timeout | `30` |
| `BINI_BODY_SIZE_LIMIT` | Max request body size | `10MB` |

---

## 🖥 Supported Platforms

| Platform | Architecture | Status |
|---|---|---|
| Windows | x64 | ✅ |
| macOS | x64 (Intel) | ✅ |
| macOS | arm64 (Apple Silicon) | ✅ |
| Linux | x64 | ✅ |

Pre-built binaries are bundled with the npm package. **No Rust toolchain required.**

---

## 📋 Requirements

- **Node.js** `>= 20`
- No Rust toolchain needed — pre-built binaries are included

---

## 📄 License

MIT © [Binidu01](https://github.com/Binidu01)

---

## 🔗 Links

- [📦 npm Package](https://www.npmjs.com/package/bini-rust-server)
- [🐛 Report an Issue](https://github.com/Binidu01/bini-rust-server/issues)
- [📝 Changelog](https://github.com/Binidu01/bini-rust-server/releases)

---

<div align="center">

Built with ❤️ using [Rust](https://www.rust-lang.org/), [Axum](https://github.com/tokio-rs/axum), and [Node.js](https://nodejs.org)

</div>