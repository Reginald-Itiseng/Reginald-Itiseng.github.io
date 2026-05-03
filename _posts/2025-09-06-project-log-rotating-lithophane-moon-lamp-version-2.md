---
title: "Project Log: Rotating Lithophane Moon Lamp Version 2"
date: 2025-09-06 19:00:00 +0200
categories:
  - projects
tags:
  - 3d-printing
  - lighting
  - iot
  - fabrication
excerpt: "Developed a second moon lamp concept with a rotating lithophane moon, RGB lighting, and Wi-Fi control."
header:
  teaser: "/assets/images/featured_projects/project-thumbnail-placeholder.svg"

blueprint_model: "/assets/models/2025-09-06-project-log-rotating-lithophane-moon-lamp-version-2/moonLamp.glb"
blueprint_model_scale: 0.5
blueprint_model_offset_x: 0
---
## Overview

![Moon Lamp Hero](/assets/images/moonlamp/hero.jpg)

This project is a modified **lithophane moon lamp** that combines ambient lighting with subtle kinetic motion.  
The goal was to make a familiar decorative object feel more deliberate: a moon that emits light, holds shadow, and turns slowly without exposing its mechanism.

The result is a self-contained lighting object that begins moving as soon as it powers on. No interface is required. The behavior is built into the object.

---

## Concept

![Concept Sketch](/assets/images/moonlamp/concept.jpg)

Lithophane lamps already create depth through light and shadow.  
By introducing motion, the surface details shift gradually across the light source. Craters, relief, and thin-wall variations become temporal rather than static.

Rather than over-engineering the mechanism, I intentionally kept the interaction between the motor and the lamp **simple and passive**:
- No rigid coupling
- No gears
- No visible mechanical complexity

The moon rests on a rotating platform. **Friction + weight** transfer motion naturally, allowing the lamp to rotate without a visible axle or mechanical interruption.

---

## Electronics & System Design

![Electronics](/assets/images/moonlamp/electronics.jpg)

The system is built around a compact and efficient embedded setup:

- **Microcontroller:** Seeed Studio XIAO ESP32-C3  
- **Lighting Control:** WLED firmware  
- **Motor:** 28BYJ-48 Stepper Motor  
- **Driver:** ULN2003 Stepper Driver Board  

The ESP32-C3 handles both:
- LED control via WLED
- Stepper motor actuation from boot

This keeps the architecture small: one controller, one power domain, and one startup sequence. Lighting and motion are treated as one behavior rather than two separate subsystems.

The 28BYJ-48 was chosen because it is inexpensive, compact, geared, and capable of slow rotation without requiring a custom gearbox. Its tradeoff is precision and noise: it is not a high-torque industrial motor, and the ULN2003 driver does not offer the quietness of modern microstepping drivers. For this object, the priority was slow presence over mechanical perfection.

---

## Motion System

![Rotation Platform](/assets/images/moonlamp/mechanism.jpg)

The rotation mechanism is intentionally minimal:

- A **flat rotating platform** driven by the stepper motor  
- The lithophane moon **rests freely on top**
- Motion is transferred through **surface friction**

This approach avoids:
- Shaft alignment challenges  
- Complex couplers  
- Visible mechanical artifacts  

It also makes assembly more forgiving. The moon does not need to be locked to the platform; it only needs enough contact area and weight to follow the rotation.

The motor runs at a **very low speed**, creating a slow, almost imperceptible rotation. The motion is meant to register at the edge of attention: visible over time, quiet in the moment.

---

## Firmware Behavior

![Code / System Diagram](/assets/images/moonlamp/code.jpg)

At power-on:

1. The ESP32-C3 boots into WLED
2. LED animation begins immediately
3. The stepper motor starts rotating at a constant slow rate

The motion is continuous and does not rely on user input. This reinforces the lamp as a **self-contained object** rather than a device waiting for commands.

---

## Design Decisions

![Details](/assets/images/moonlamp/details.jpg)

Some key decisions that shaped the final result:

- **Simplicity over precision**  
  Friction drive instead of mechanical coupling. The result is easier to build, with fewer alignment constraints.

- **Always-on motion**  
  No UI or controls. The lamp behaves as an object with presence, not a gadget with settings.

- **Integration over modularity**  
  One microcontroller handles lighting and motion, reducing wiring and startup complexity.

- **Subtlety in movement**  
  Motion is slow enough to be felt before it is noticed.

---

## Outcome

![Final Shot](/assets/images/moonlamp/final.jpg)

This project demonstrates how a small mechanical change can alter the character of a familiar object.

It sits at the intersection of:
- Embedded systems  
- Product design  
- Ambient interaction  

A simple lamp becomes something closer to a **living artifact**: quiet, cyclical, and self-contained.

---

## Future Improvements

- Quieter motor driver (e.g., silent stepper driver)
- Adjustable rotation speed via WLED UI
- Hidden bearing system for smoother motion
- Battery-powered version for full portability
