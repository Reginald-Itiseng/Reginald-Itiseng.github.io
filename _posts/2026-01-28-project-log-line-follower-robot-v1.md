---
title: "Project Log: Line Follower Robot v1"
date: 2026-01-28 17:00:23 +0200
categories:
  - projects
tags:
  - robotics
  - embedded
  - control
excerpt: "Designed and tuned a line follower robot with modular firmware and PID steering control."
header:
  teaser: "/assets/images/featured_projects/thumbs/controllerInterface-16x9.jpg"
---

## Project Goal

Build a reliable line follower that can complete a taped track at stable speed
without overshooting corners.

## What I Built

- ESP32-based controller with a dual motor driver
- IR sensor array for line detection
- PID loop for smooth steering correction
- Modular firmware structure for faster tuning

## Results

The robot now completes short tracks consistently and recovers from small drift
faster than the first prototype.

## Next Iteration

- Add lap-time logging
- Improve sharp-corner recovery
- Publish the full firmware and wiring diagram
