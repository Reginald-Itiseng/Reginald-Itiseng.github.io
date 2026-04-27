---
title: "Project Log: PathKernel HPGL Toolpath Generator"
date: 2026-04-27 16:20:00 +0200
categories:
  - projects
tags:
  - fabrication
  - cnc
  - hpgl
  - toolpaths
excerpt: "Built PathKernel to generate HPGL tool paths for a Bungard CCD PCB milling machine."
header:
  teaser: "/assets/images/featured_projects/project-thumbnail-placeholder.svg"
---

## Project Goal

PathKernel is a tool I built to generate HPGL tool paths for a Bungard CCD
machine. The goal was to make the path generation step more direct, predictable,
and easier to adjust when preparing fabrication jobs for PCB milling.

The Bungard CCD is capable, but getting clean machine-ready output depends on
the tool path being clear about movement, tool engagement, and the order of
operations. PathKernel was my way of taking more control over that translation
instead of treating the HPGL output as a black box.

## Why I Built It

When working with fabrication machines, the final machine file is where many
small assumptions become real motion. A path that looks acceptable on screen can
still waste time, move inefficiently, or behave unexpectedly once it reaches the
machine.

For this project, I wanted a generator that could focus on the practical needs
of the Bungard workflow:

- Produce HPGL output that the Bungard CCD can read
- Keep travel moves and cutting moves easy to reason about
- Make tool path generation repeatable across similar jobs
- Create a foundation I can keep improving as I test more boards

## What PathKernel Does

PathKernel converts design intent into a sequence of HPGL commands for the
machine. At its core, it is responsible for building paths, ordering movement,
and writing the command output in a format that matches the Bungard CCD's
expected workflow.

The first version focuses on the essentials:

- Generating machine-readable HPGL
- Separating rapid/travel moves from tool-down moves
- Structuring paths so they can be inspected before running the job
- Keeping the output predictable enough for repeated fabrication tests

## Development Notes

I approached PathKernel as a small but important piece of fabrication
infrastructure. The project sits between the design file and the machine, so I
paid attention to clarity more than cleverness. I wanted the output to be easy
to inspect, edit, and debug.

A major part of the build was thinking through how coordinates should be handled
before they become physical motion. The Bungard CCD responds to HPGL commands,
so PathKernel needed to treat each move as part of a larger machining sequence,
not just as a line in a file.

## Early Results

The first prototype successfully generates HPGL tool paths for the Bungard CCD
workflow. It gives me a clearer path from a planned PCB operation to a file that
can be sent to the machine.

The biggest win so far is control. Instead of only hoping that the generated
output is suitable, I can now inspect the path logic, adjust generation rules,
and improve the machine file step by step.

## What I Learned

This project reminded me that fabrication software is also part of the machine.
Even if the hardware is accurate, the job still depends on the instructions
being clean, intentional, and suited to the process.

Working on PathKernel also gave me a better understanding of how small software
decisions affect physical outcomes. Coordinate handling, move ordering, and file
format details all show up later as time, surface finish, and reliability at the
machine.

## Next Iteration

The next version will focus on making PathKernel easier to validate before a
job reaches the Bungard CCD.

- Add visual previews of generated paths
- Improve path ordering to reduce unnecessary travel moves
- Add clearer configuration for tool diameter and operation type
- Test against more board layouts and document machine behavior
- Add photos and screenshots of the generator, HPGL output, and finished cuts

## Media To Add

I will add images once I have the project shots ready.

- PathKernel interface or code view
- Example HPGL output
- Bungard CCD setup
- Test board before milling
- Finished milled board
