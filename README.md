# Reginald-Itiseng.github.io

Portfolio site built with Jekyll + Minimal Mistakes.

## Run locally

```bash
bundle install
bundle exec bin/jekyll serve
```

## Add a new project post

Create a file in `_posts/` named like `YYYY-MM-DD-project-title.md`:

```markdown
---
title: "Project Log: Your Project Name"
date: 2026-03-13 10:00:00 +0200
categories:
  - projects
tags:
  - robotics
  - software
excerpt: "One-line summary of what you built."
header:
  teaser: "/assets/images/featured_projects/thumbs/your-thumbnail-16x9.jpg"
---

## Project Goal
## What I Built
## Results
## Next Iteration
```

Use 1200x675 images for thumbnail consistency.
