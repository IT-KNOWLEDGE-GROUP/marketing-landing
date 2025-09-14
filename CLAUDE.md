# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Quick Reference

For comprehensive project documentation, architecture details, and development guidelines, please refer to:

**[AGENTS.md](./AGENTS.md)** - Complete project documentation and AI agent guidance

## 🎯 Project Summary

This is a **modular landing page system** built with:
- **Nuxt.js 4** + **Nuxt UI Pro** + **Nuxt Content**
- **Layout-based components** (not semantic components)
- **Modular composition** for flexible page creation

## ⚡ Quick Commands

```bash
pnpm install          # Install dependencies
pnpm dev             # Start dev server
pnpm lint            # Run linting (required before commits)
pnpm typecheck       # Run TypeScript checks (required before commits)
pnpm generate        # Generate static site
```

## 🚀 Quick Start

1. **Create content**: `content/landing/{name}.yml`
2. **Add route**: Update `nuxt.config.ts` prerender routes
3. **Add assets**: Create `/public/images/landing-{name}/` folder
4. **Test**: Run dev server and verify page loads

## 📚 Full Documentation

For detailed information about:
- Component system and architecture
- Development guidelines and conventions
- Content creation and management
- Troubleshooting and best practices

**👉 See [AGENTS.md](./AGENTS.md)**

---

💡 **Tip**: This project uses layout-oriented components (`LandingVerticalSection`, `LandingHorizontalSection`, etc.) rather than semantic ones, enabling flexible page composition.