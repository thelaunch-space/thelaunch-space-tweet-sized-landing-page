# Convex SSOT Schema Updates — Agent Query Endpoints

> Created: 2026-03-06
> Purpose: Document new/extended endpoints enabling agents to read from Convex instead of Google Sheets

---

## New Endpoints

### `GET /query/blogs`

**Agent:** Vyasa (enrichment cycle, blog listing)
**Replaces:** Google Sheets `next-enrich` and `list-published` reads

| Mode | Param | Returns |
|------|-------|---------|
| Next for enrichment | `?needs_enrichment=true` | Single blog object (nulls-first by lastEnrichmentDate) or `null` |
| Filter by status | `?status=published` | Array of blogs with that status |
| All blogs | _(no params)_ | Array of all blogs |

Response fields: `_id, title, slug, url, prUrl, keyword, status, wordCount, publishedAt, createdAt, briefId, enrichmentCount, lastEnrichmentDate, enrichmentLog`

### `GET /query/questions`

**Agent:** Vibhishana (evening report counts)
**Replaces:** Google Sheets question count reads

| Mode | Param | Returns |
|------|-------|---------|
| Summary counts | `?summary=true` | `{ total, byStatus: { new: N, brief_created: N, skipped: N } }` |
| Recent questions | `?limit=N` (default 50) | Array of questions, newest first |

### `POST /update/linkedin-post-status`

**Agent:** Valmiki (status transitions)
**Replaces:** Direct status updates that previously had no HTTP endpoint

Request: `{ insightName, sourceBlogSlug, newStatus, krishnaFeedback? }`
Response: `{ success: true, id: "<convex_id>" }`

---

## Extended Endpoints

### `GET /query/briefs` (extended)

**Agent:** Vibhishana (evening report), all agents (status checks)
**New modes added:**

| Mode | Param | Returns |
|------|-------|---------|
| Summary counts | `?summary=true` | `{ total, byStatus: { pending_review: N, approved: N, writing: N, ... } }` |
| All briefs | `?status=all` | Array of all briefs (no filter) |
| Existing statuses | `?status=brief_ready` etc. | _(unchanged behavior)_ |

Expanded allowed statuses: `brief_ready, pending_review, needs_revision, writing, published, approved, dropped`

### `GET /query/linkedin-posts` (extended)

**Agent:** Valmiki (filtered reads)
**New mode added:**

| Mode | Param | Returns |
|------|-------|---------|
| Filter by status | `?status=needs_revision` | Array of posts with that status |
| All posts | _(no params)_ | _(unchanged behavior)_ |

New response fields added: `impressions, comments, likes, goLiveDate, goLiveTime`

### `POST /push/linkedin-posts` (extended args)

**Agent:** Valmiki (performance metrics)
**New optional fields:** `impressions, comments, likes, goLiveDate, goLiveTime`

Existing calls without these fields work identically (all optional).

---

## Schema Change

`linkedinPosts` table — 5 new optional fields:

```
impressions: v.optional(v.number())
comments: v.optional(v.number())
likes: v.optional(v.number())
goLiveDate: v.optional(v.string())
goLiveTime: v.optional(v.string())
```

---

## Backward Compatibility

- All new fields are `v.optional()` — existing agent pushes unaffected
- Existing `/query/briefs` calls with old statuses return identical results
- Existing `/query/linkedin-posts` calls without `?status` return identical results
- Existing `/push/linkedin-posts` calls without metric fields work identically
- No existing endpoints removed or renamed

---

## Agent Migration Map

| Agent | Sheets Operation | Convex Endpoint |
|-------|-----------------|-----------------|
| Vyasa | `next-enrich` read | `GET /query/blogs?needs_enrichment=true` |
| Vyasa | `list-published` read | `GET /query/blogs?status=published` |
| Vyasa | `set-enrichment` write | `POST /update/blog-enrichment` (already existed) |
| Vyasa | `set-published` write | `POST /push/blogs` (already existed) |
| Vibhishana | Evening report counts | `GET /query/briefs?summary=true` + `GET /query/questions?summary=true` |
| Valmiki | Performance metrics write | `POST /push/linkedin-posts` (with new metric fields) |
| Valmiki | Status filtering read | `GET /query/linkedin-posts?status=needs_revision` |
| All | Blog status counts | `GET /query/blogs?status=X` |
