---
title: "Project Log: Electric Scooter Fab Academy Final Project"
date: 2025-06-20 16:00:00 +0200
categories:
  - projects
tags:
  - fab-academy
  - mobility
  - fabrication
  - electronics
  - embedded-systems
excerpt: "Built an electric scooter as my Fab Academy final project, combining a welded steel frame, custom electronics, RS485 motor control, 3D printed parts, and ride testing."
link: "https://fabacademy.org/2025/labs/rwanda/students/reginald-itiseng/final-project.html"
header:
  teaser: "/assets/images/featured_projects/2025-06-20-project-log-electric-scooter-fab-academy-final-project/WhatsApp%20Image%202025-06-19%20at%2023.03.34_3180ab92.jpg"
---

## Project Goal

The electric scooter was my Fab Academy final project, built as a compact personal mobility prototype for short trips and campus-style travel.

The goal was to design and fabricate a working electric scooter that combined mechanical design, metal fabrication, embedded electronics, PCB design, 3D printing, firmware, and full-system testing.

## What I Built

![Electric Scooter Prototype](/assets/images/featured_projects/2025-06-20-project-log-electric-scooter-fab-academy-final-project/WhatsApp%20Image%202025-06-19%20at%2023.03.34_3180ab92.jpg)

<figure class="project-media project-media--embed">
  <iframe src="https://www.youtube.com/embed/ZH2wQx_GX2g?si=c9IvLCdTWXq-HqPA" title="Electric scooter project video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Electric scooter prototype video.</figcaption>
</figure>

- Mild steel square tube scooter frame
- BLDC hub motor and 36 V lithium-ion battery system
- Custom PCB for interfacing a XIAO ESP32-C3 with the motor driver
- RS485 communication circuit using a MAX485 transceiver
- Current and voltage sensing for battery monitoring
- Arduino firmware using Modbus RTU to command the motor driver
- 3D printed mounts, handles, battery holder, and electronics enclosure

The wheels, controller, and batteries were purchased components. The frame, electronics interface, mounting parts, and enclosure work were designed and fabricated as part of the project.

## Development Notes

The main challenge was system integration. The scooter needed a strong physical structure, reliable wiring, protected electronics, usable throttle behavior, and safe braking response.

The custom PCB took three iterations. The first version had unsafe mixed-voltage logic for the 3.3 V ESP32-C3. The second version corrected that issue but had swapped RX/TX lines between the microcontroller and MAX485. The third version fixed both problems and successfully communicated with the BLDC motor driver over RS485.

The firmware reads the throttle, filters the input, maps it to target RPM, sends velocity commands through Modbus RTU, reads motor feedback, and ramps speed changes for smoother control.

## Processes Used

- SolidWorks CAD design
- KiCad PCB design
- PCB isolation milling on a Bungard CCD
- Hand soldering and circuit testing
- 3D printing in PLA
- Metal cutting and welding
- Ride testing and debugging

## Results

The final prototype was ride tested and met the core goals for a first version. It supported riders up to about 90 kg, worked on flat ground and slight inclines, and achieved a tested range of about 6 km on a single charge.

The scooter uses electric braking behavior through the motor controller when the throttle is released. During testing, the frame and welded joints remained structurally sound under normal use.

## What I Learned

- How to integrate mechanical, electrical, and firmware systems into one working prototype
- Why mixed-voltage electronics need careful protection and signal planning
- How useful iterative PCB fabrication is for debugging real hardware
- How 3D printed parts can turn loose electronics into mounted assemblies
- How ride testing reveals issues that CAD and bench testing cannot show

## Next Iteration

- Improve the dashboard for speed, battery, and system status
- Refine the electronics enclosure and cable routing
- Extend the scooter's range
- Explore regenerative braking
- Develop a custom BLDC motor controller
- Improve the battery management system

Full build documentation: [Electric Scooter Final Project](https://fabacademy.org/2025/labs/rwanda/students/reginald-itiseng/final-project.html).
