#!/usr/bin/env node

/**
 * oh-model-router - Local Model Router and Manager
 * 
 * Intelligent routing between local and cloud models.
 */

const fs = require('fs');
const path = require('path');

class ModelRouter {
  constructor() {
    this.config = this.loadConfig();
    this.stats = { local: 0, cloud: 0, totalCost: 0 };
  }

  loadConfig() {
    const defaultConfig = {
      local: {
        provider: 'ollama',
        models: ['qwen2.5', 'llama3'],
        endpoint: 'http://localhost:11434'
      },
      cloud: {
        providers: ['anthropic', 'openai'],
        fallback: true
      },
      routing: {
        strategy: 'cost-optimized',
        localFirst: true,
        maxCostPerQuery: 0.01
      }
    };

    try {
      const configPath = path.join(__dirname, 'config.json');
      if (fs.existsSync(configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return { ...defaultConfig, ...fileConfig };
      }
    } catch (e) {
      console.warn('Config not found, using defaults');
    }

    return defaultConfig;
  }

  async route(query, options = {}) {
    console.log(`🔀 Routing query: "${query.substring(0, 50)}..."`);

    const complexity = this.assessComplexity(query);
    const sensitive = this.checkSensitivity(query);

    let target = 'local';

    // Decision logic
    if (sensitive) {
      console.log('   🔒 Sensitive data detected → forcing local');
      target = 'local';
    } else if (complexity > 0.7 && this.config.cloud.fallback) {
      console.log('   🧠 High complexity → using cloud');
      target = 'cloud';
    } else if (this.config.routing.localFirst) {
      console.log('   🏠 Local-first policy → trying local');
      target = 'local';
    }

    // Try execution
    try {
      const result = await this.execute(target, query);
      this.stats[target]++;
      return result;
    } catch (e) {
      if (target === 'local' && this.config.cloud.fallback) {
        console.log('   ⚠️  Local failed, falling back to cloud');
        const result = await this.execute('cloud', query);
        this.stats.cloud++;
        return result;
      }
      throw e;
    }
  }

  assessComplexity(query) {
    // Simple heuristic: length + keywords
    let score = 0;
    
    if (query.length > 500) score += 0.3;
    if (query.includes('explain') || query.includes('analyze')) score += 0.2;
    if (query.includes('code') || query.includes('implement')) score += 0.3;
    if (query.includes('complex') || query.includes('detailed')) score += 0.2;

    return Math.min(score, 1.0);
  }

  checkSensitivity(query) {
    const sensitiveKeywords = ['password', 'secret', 'private', 'confidential', 'api key'];
    return sensitiveKeywords.some(kw => query.toLowerCase().includes(kw));
  }

  async execute(target, query) {
    if (target === 'local') {
      return this.executeLocal(query);
    } else {
      return this.executeCloud(query);
    }
  }

  async executeLocal(query) {
    // Simulate local execution via Ollama
    console.log(`   📡 Calling Ollama at ${this.config.local.endpoint}`);
    
    // In production, would make actual HTTP request to Ollama
    return {
      target: 'local',
      model: this.config.local.models[0],
      response: `[Local response to: ${query}]`,
      cost: 0,
      latency: Math.random() * 2000 + 500
    };
  }

  async executeCloud(query) {
    // Simulate cloud execution
    console.log(`   ☁️  Calling cloud provider`);
    
    // In production, would call actual cloud API
    const cost = query.length * 0.00001; // Rough estimate
    this.stats.totalCost += cost;

    return {
      target: 'cloud',
      model: 'claude-opus-4-6',
      response: `[Cloud response to: ${query}]`,
      cost,
      latency: Math.random() * 3000 + 1000
    };
  }

  async status() {
    console.log('📊 Model Router Status\n');

    // Check local models
    console.log('Local Models:');
    for (const model of this.config.local.models) {
      const available = await this.checkLocalModel(model);
      const icon = available ? '✅' : '❌';
      console.log(`  ${icon} ${model}`);
    }

    // Stats
    console.log('\nUsage Stats:');
    console.log(`  Local queries: ${this.stats.local}`);
    console.log(`  Cloud queries: ${this.stats.cloud}`);
    console.log(`  Total cost: $${this.stats.totalCost.toFixed(4)}`);

    // Config
    console.log('\nRouting Strategy:');
    console.log(`  Strategy: ${this.config.routing.strategy}`);
    console.log(`  Local first: ${this.config.routing.localFirst}`);
    console.log(`  Max cost/query: $${this.config.routing.maxCostPerQuery}`);
  }

  async checkLocalModel(model) {
    // In production, would check if Ollama has the model
    return Math.random() > 0.3; // Simulate availability
  }

  async benchmark() {
    console.log('🏃 Running benchmark...\n');

    const testQueries = [
      'What is 2+2?',
      'Explain quantum computing in detail',
      'Write a Python function to sort a list'
    ];

    for (const query of testQueries) {
      console.log(`Testing: "${query}"`);
      
      const localStart = Date.now();
      await this.executeLocal(query);
      const localTime = Date.now() - localStart;

      const cloudStart = Date.now();
      await this.executeCloud(query);
      const cloudTime = Date.now() - cloudStart;

      console.log(`  Local: ${localTime}ms, Cloud: ${cloudTime}ms`);
      console.log('');
    }
  }
}

// CLI interface
if (require.main === module) {
  const router = new ModelRouter();
  const command = process.argv[2];
  const args = process.argv.slice(3);

  (async () => {
    try {
      switch (command) {
        case 'route':
          const result = await router.route(args.join(' '));
          console.log('\n✅ Result:', result);
          break;
        case 'status':
          await router.status();
          break;
        case 'benchmark':
          await router.benchmark();
          break;
        case 'start':
          console.log('🚀 Model router started');
          console.log('Use "route", "status", or "benchmark" commands');
          break;
        default:
          console.log('Usage: oh-model-router <route|status|benchmark|start> [args]');
      }
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  })();
}

module.exports = ModelRouter;
