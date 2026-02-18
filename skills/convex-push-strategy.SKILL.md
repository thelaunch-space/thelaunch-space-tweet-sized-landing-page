---
name: convex-push-strategy
description: Push topic clusters and tool opportunities to Launch Control (Convex database)
metadata: { "openclaw": { "emoji": "🧠", "requires": { "bins": ["curl"], "env": [] } } }
---

# Push Strategy Data to Launch Control

Vidura pushes two types of structured data to Convex after his analysis runs: topic clusters (from Monday/Wednesday analysis) and tool opportunities (from Friday scans). This keeps the Launch Control dashboard current with Vidura's strategic output.

## Setup

API key file: `/home/node/openclaw/credentials/convex-api-key.txt`
Base URL: `https://impartial-pelican-672.convex.site`

## 1. Push Topic Cluster

After Monday cluster mapping or Wednesday topic generation, push each new topic cluster.

Run this with `exec`:

```bash
API_KEY=$(cat /home/node/openclaw/credentials/convex-api-key.txt)

curl -s -X POST https://impartial-pelican-672.convex.site/ingestTopicCluster \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "pillarName": "AI Employees for Small Business",
    "clusterTopic": "How to hire AI agents for customer support",
    "status": "planned",
    "targetKeyword": "ai agents customer support small business",
    "intentType": "informational",
    "agentName": "Vidura",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ"
  }'
```

Expected response: `{"success":true,"id":"..."}`

## 2. Push Tool Opportunity

After Friday tool scan, push each tool opportunity identified.

Run this with `exec`:

```bash
API_KEY=$(cat /home/node/openclaw/credentials/convex-api-key.txt)

curl -s -X POST https://impartial-pelican-672.convex.site/ingestToolOpportunity \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "sourceQuestion": "How do I check if my blog posts are ranking?",
    "whyTool": "Founders ask this weekly — a simple rank checker would capture search traffic",
    "toolName": "Blog Rank Checker",
    "toolSolution": "Enter a URL, see Google position for target keyword",
    "targetKeyword": "check blog google ranking free",
    "complexity": "simple",
    "status": "proposed",
    "agentName": "Vidura",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ"
  }'
```

Expected response: `{"success":true,"id":"..."}`

## When to Push

- After Monday cluster mapping: push each new topic cluster
- After Wednesday topic generation: push any new clusters identified
- After Friday tool scan: push each tool opportunity identified
- Note: Activity milestones (morning_analysis, cluster_mapping, etc.) use the separate `convex-push-activity` skill

## Field Rules

- `agentName`: Always exactly `"Vidura"` (capitalized)
- `status` for clusters: `"planned"` at creation time
- `status` for tools: `"proposed"` at creation time
- `intentType`: One of `"informational"`, `"comparison"`, `"decision"`
- `complexity`: One of `"simple"`, `"medium"`
- `createdAt`: ISO 8601 format. Use `date -u +"%Y-%m-%dT%H:%M:%SZ"` to generate.

## When Things Fail

If curl returns an error or non-200 response:
1. Post to #vidura-strategy: `⚠️ Convex push failed for [item]. Error: [response]. Moving on.`
2. Continue your normal workflow. Do NOT retry. Do NOT block.
3. The data is still in analysis reports — Convex is additive, not a replacement.
