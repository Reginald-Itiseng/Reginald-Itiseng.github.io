---
title: "Project Log: PathKernel HPGL Toolpath Generator"
date: 2026-04-27 16:20:00 +0200
categories:
  - projects
tags:
  - fabrication
  - cnc
  - pcb
  - python
  - hpgl
  - toolpaths
excerpt: "Built PathKernel, a Python tool created to keep PCB milling classes moving by turning Gerber files into HPGL operations for the Bungard CCD PCB plotter."
header:
  teaser: "/assets/images/featured_projects/2026-04-27-project-log-pathkernel-hpgl-toolpaths/intro_image.png"
---

## Project Goal

PathKernel is a Python tool I built specifically for the Bungard CCD PCB
plotter workflow. Its main job is to take Gerber files, process them for PCB
isolation milling, and generate HPGL tool paths that can be used in RoutePro
2000.

The goal was to make PCB milling preparation more direct, understandable, and
repeatable. Instead of relying on a black-box conversion step, I wanted control
over how each PCB operation is generated and how the selected tools affect the
final machine output.

<figure>
  <img src="/assets/images/featured_projects/2026-04-27-project-log-pathkernel-hpgl-toolpaths/intro_image.png" alt="PathKernel interface showing imported Gerber layers, generated PCB geometry, and cutout planner settings">
  <figcaption>PathKernel previewing imported Gerber layers, generated toolpath geometry, and cutout settings.</figcaption>
</figure>

## Why I Built It

PathKernel started as a practical problem in the electronics lab. The Bungard
CCD normally uses Bungard's IsoCam software to process Gerber layers for
milling, but the IsoCam dongle was missing or had never been purchased. Without
that software access, the PCB plotter could not be used properly for class work.

CopperCAM was a possible alternative and could generate proper machine files,
but it required a licence purchase. University procurement can take time, and
classes could not afford to lose that time waiting for software access.

That gap created the need for a temporary solution that could also become a
long-term lab tool. PathKernel was built to fill that need.

When working with the Bungard CCD, the quality of the final PCB depends heavily
on the tool paths. The software step needs to understand the difference between
making traces, clearing unused copper, drilling holes, and cutting the board
outline.

I built PathKernel to make that workflow easier to manage:

- Import Gerber files for PCB processing
- Select active tools before generating operations
- Generate HPGL files compatible with RoutePro 2000
- Separate PCB jobs into clear fabrication operations
- Support single-sided and double-sided PCB workflows

## What PathKernel Does

PathKernel turns PCB design files into machine-ready operations for the Bungard
CCD. The software currently supports importing Gerber files, selecting which
tools are active, and using those tools to generate the proper output for each
fabrication step.

Supported operations include:

- **Isolation milling:** cutting around traces to electrically separate them
- **Hatching:** clearing unused copper from larger areas of the board
- **Board cutout:** generating the outline path for cutting the PCB shape
- **Drilling:** producing drill operations for vias and through-hole parts
- **Double-sided PCB support:** helping align and process both board sides more easily

The tool selection step is important because each operation needs to respect the
active tool settings. A drilling operation, for example, should not be treated
the same way as trace isolation or copper clearing.

## Development Notes

I approached PathKernel as fabrication infrastructure. It sits between the PCB
design files and the machine, so the output needs to be predictable, inspectable,
and practical on real hardware.

The project was vibe coded to move fast because the lab needed something usable
quickly. I used Codex to rapidly prototype the Python software, then tested it
against real Gerber files and fixed runtime issues as they appeared. The loop was
simple: generate files, test the output, find what failed, correct the logic, and
try again.

A major part of the project was thinking through how Gerber geometry becomes
physical motion. The software has to translate design data into paths that make
sense for a milling bit, not just reproduce the drawing. That includes operation
order, tool choice, offsets, clearances, and export formatting for the RoutePro
2000 workflow.

Double-sided PCB support also shaped the project. Milling one side of a board is
already sensitive to alignment and setup; doing both sides requires the software
to make the workflow easier rather than adding more manual guesswork.

## Results

PathKernel currently provides a clearer path from Gerber files to HPGL files for
the Bungard CCD. It can generate the main operations needed for PCB milling:
isolation, hatching, drilling, and board cutout.

The biggest win is control. I can choose tools, generate operation-specific
outputs, inspect the logic, and prepare files for RoutePro 2000 in a workflow
that matches how I actually use the machine.

## Benchmark Test

To test PathKernel against a real board, I used the electric scooter control
board PCB as a benchmark. This board was a good test case because it was already
a working PCB from my [Electric Scooter Fab Academy final project](/projects/project-log-electric-scooter-fab-academy-final-project/),
so I could compare PathKernel's output against a known design instead of testing
with an abstract sample file.

The benchmark focused on whether PathKernel could process the Gerber files,
generate usable HPGL operations, and cut the board accurately on the Bungard CCD.
It was also a practical way to check the software's isolation milling behavior,
toolpath spacing, board outline handling, and overall machine workflow.

<figure class="project-media project-media--embed">
  <iframe src="https://www.youtube.com/embed/4KL2CMqa3VU?si=fNP29R1I-_j4amiD" title="PathKernel benchmark test cutting the electric scooter control board PCB" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Benchmark test: using PathKernel to cut the electric scooter control board PCB.</figcaption>
</figure>

This will be part of a longer video series documenting PathKernel properly. I
plan to make separate videos covering different parts of the workflow, including
Gerber import, tool selection, isolation milling, hatching, drilling, cutout, and
double-sided PCB setup.

## Double-Sided PCB Trial

Another important test for PathKernel was a BLDC motor driver PCB that I started
as a separate electronics project. The motor driver itself did not work in the
end, but the board was still valuable because it proved something important
about PathKernel: the software could help me fabricate a more demanding
double-sided PCB without making the process feel difficult.

That mattered because double-sided boards are usually where PCB milling becomes
more sensitive. Layer alignment, drilling, board flipping, and operation order
all have to work together. Even though the circuit still needed debugging,
PathKernel made the physical fabrication step manageable.

<figure class="project-media project-media--embed">
  <iframe src="https://www.youtube.com/embed/Qt7DD_LEXkU?si=AyUQG7e4mjskSeUo" title="BLDC motor driver PCB KiCad design phase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>BLDC motor driver PCB design phase in KiCad before fabrication with PathKernel.</figcaption>
</figure>

### Gerber Import And File Generation

After designing the board in KiCad, I exported the Gerber and drill files and
imported them into PathKernel. From there, PathKernel generated the full set of
HPGL files needed to fabricate the double-sided PCB on the Bungard CCD.

The generated operations included:

- Top layer trace isolation milling
- Bottom layer trace isolation milling
- Centering holes for aligning the board when flipping to the opposite side
- Drill files for through-hole pads and vias
- Hatching files for clearing unused copper
- Board cutout files for the final PCB outline

This step is where PathKernel became more than just a viewer. It handled the
transition from PCB design data to separated machine operations that could be
loaded into RoutePro 2000 in the correct fabrication sequence.

<figure class="project-media project-media--embed">
  <iframe src="https://www.youtube.com/embed/j9hIg2lzUk8?si=GBgjz1HT3-ipWd2N" title="Generating BLDC motor driver PCB toolpaths in PathKernel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Importing the BLDC motor driver Gerbers into PathKernel and generating isolation, drilling, hatching, alignment, and cutout files.</figcaption>
</figure>

### Bungard CCD Cutting Phase

The next part of the story is the physical cutting stage on the Bungard CCD. In
this phase, the HPGL files generated by PathKernel are loaded into RoutePro 2000
and used to mill the board: first preparing the alignment holes, then cutting
the trace isolation paths, drilling, clearing copper, and finally cutting out
the PCB.

<figure class="project-media project-media--embed">
  <iframe src="https://www.youtube.com/embed/AmluQQUAsoc?si=FvsUUm_YhDJASs59" title="PathKernel cutting the BLDC motor driver PCB" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>PCB cutting phase: fabricating the double-sided BLDC motor driver board with PathKernel.</figcaption>
</figure>

<figure>
  <img src="/assets/images/featured_projects/2026-04-27-project-log-pathkernel-hpgl-toolpaths/BLDC_driverToplayer_hero_shot.jpg" alt="Top layer of the BLDC motor driver PCB milled with PathKernel on the Bungard CCD">
  <figcaption>Top layer of the BLDC motor driver PCB after milling with PathKernel-generated toolpaths.</figcaption>
</figure>

## What I Learned

This project reminded me that fabrication software is part of the machine. Even
if the Bungard CCD is accurate, the board still depends on the generated
instructions being clean, intentional, and suited to the operation.

Working on PathKernel also gave me a better understanding of how small software
decisions affect physical outcomes. Tool selection, offsets, operation order,
file formatting, and double-sided alignment all show up later as cut quality,
time, reliability, and whether the PCB is usable.

## Next Iteration

The next version will focus on making PathKernel easier to preview and validate
before a job reaches the Bungard CCD.

- Add visual previews of generated paths
- Improve path ordering for each operation type
- Add clearer configuration for tool diameter, depth, and operation settings
- Test against more board layouts and document machine behavior
- Improve double-sided PCB setup and alignment guidance
- Add screenshots of the interface, HPGL output, and finished milled boards
