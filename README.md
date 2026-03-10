# oh-model-router

[English](#english) | [中文](#中文)

---

## English

### Local Model Router and Manager for OpenClaw

Intelligent routing between local and cloud models with automatic fallback and cost optimization.

#### Features

- 🔀 **Smart Routing**: Automatically choose the best model for each task
- 💰 **Cost Optimization**: Prefer local models when possible
- 🔄 **Auto Fallback**: Switch to cloud if local fails
- 📊 **Performance Tracking**: Monitor speed, quality, and cost
- 🏠 **Local First**: Privacy-focused, runs models locally via Ollama
- ⚙️ **Easy Configuration**: Simple YAML/JSON config

#### Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/oh-model-router.git
   cd oh-model-router
   ```

2. **Install Ollama** (if not already installed)
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

3. **Pull some models**
   ```bash
   ollama pull qwen2.5
   ollama pull llama3
   ```

4. **Configure routing**
   ```bash
   cp config.example.json config.json
   # Edit config.json
   ```

5. **Start routing**
   ```bash
   node index.js start
   ```

#### Usage Examples

**Route a query:**
```bash
node index.js route "Explain quantum computing"
```

**Check model status:**
```bash
node index.js status
```

**Benchmark models:**
```bash
node index.js benchmark
```

#### Routing Strategy

The router considers:
- **Task complexity**: Simple tasks → local, complex → cloud
- **Model availability**: Is the local model running?
- **Cost constraints**: Stay within budget
- **Performance requirements**: Speed vs quality trade-off
- **Privacy level**: Sensitive data stays local

#### Configuration

```json
{
  "local": {
    "provider": "ollama",
    "models": ["qwen2.5", "llama3"],
    "endpoint": "http://localhost:11434"
  },
  "cloud": {
    "providers": ["anthropic", "openai"],
    "fallback": true
  },
  "routing": {
    "strategy": "cost-optimized",
    "localFirst": true,
    "maxCostPerQuery": 0.01
  }
}
```

#### Supported Models

**Local (via Ollama):**
- Qwen 2.5
- Llama 3
- Mistral
- Gemma
- DeepSeek

**Cloud:**
- Claude (Anthropic)
- GPT-4 (OpenAI)
- Gemini (Google)

#### Requirements

- Node.js >= 18
- Ollama (for local models)
- 8GB RAM minimum (16GB recommended)

#### License

MIT

---

## 中文

### OpenClaw 本地模型路由和管理器

智能路由本地和云端模型，自动降级和成本优化。

#### 功能特性

- 🔀 **智能路由**：自动为每个任务选择最佳模型
- 💰 **成本优化**：优先使用本地模型
- 🔄 **自动降级**：本地失败时切换到云端
- 📊 **性能追踪**：监控速度、质量和成本
- 🏠 **本地优先**：注重隐私，通过 Ollama 本地运行模型
- ⚙️ **简单配置**：简单的 YAML/JSON 配置

#### 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/oh-model-router.git
   cd oh-model-router
   ```

2. **安装 Ollama**（如果尚未安装）
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

3. **拉取模型**
   ```bash
   ollama pull qwen2.5
   ollama pull llama3
   ```

4. **配置路由**
   ```bash
   cp config.example.json config.json
   # 编辑 config.json
   ```

5. **启动路由**
   ```bash
   node index.js start
   ```

#### 使用示例

**路由查询：**
```bash
node index.js route "解释量子计算"
```

**检查模型状态：**
```bash
node index.js status
```

**基准测试：**
```bash
node index.js benchmark
```

#### 路由策略

路由器考虑：
- **任务复杂度**：简单任务 → 本地，复杂任务 → 云端
- **模型可用性**：本地模型是否运行？
- **成本约束**：保持在预算内
- **性能要求**：速度 vs 质量权衡
- **隐私级别**：敏感数据保持本地

#### 配置

```json
{
  "local": {
    "provider": "ollama",
    "models": ["qwen2.5", "llama3"],
    "endpoint": "http://localhost:11434"
  },
  "cloud": {
    "providers": ["anthropic", "openai"],
    "fallback": true
  },
  "routing": {
    "strategy": "cost-optimized",
    "localFirst": true,
    "maxCostPerQuery": 0.01
  }
}
```

#### 支持的模型

**本地（通过 Ollama）：**
- Qwen 2.5
- Llama 3
- Mistral
- Gemma
- DeepSeek

**云端：**
- Claude（Anthropic）
- GPT-4（OpenAI）
- Gemini（Google）

#### 依赖要求

- Node.js >= 18
- Ollama（用于本地模型）
- 最少 8GB 内存（推荐 16GB）

#### 许可证

MIT
