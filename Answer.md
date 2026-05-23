# ANSWERS

# 1. How to run

Download or clone the project and open `index.html` in any modern browser.

No dependencies or installation are required.

---

# 2. Stack & design choices

I chose HTML, CSS, and JavaScript because the assignment is interaction-heavy but small in scope. Vanilla JavaScript keeps the project lightweight while still demonstrating DOM manipulation, validation, state management, and responsive UI skills without relying on frameworks.

### Design Decision 1

I used a two-column card layout on desktop so users can continuously see the calculated totals while editing inputs. This reduces eye movement and makes the interface feel more interactive.

### Design Decision 2

I used large preset tip buttons instead of only a text input because selecting common tip percentages is faster and more touch-friendly on mobile devices.

---

# 3. Responsive & accessibility

On a 1440px screen, the app displays inputs and results side-by-side for faster scanning and better use of horizontal space.

On a 360px mobile screen, the layout stacks vertically and buttons resize into a 2-column grid for easier tapping.

### Accessibility handled

I added:
- Proper labels for all inputs
- Visible keyboard focus states
- Mobile-friendly numeric keyboards using `inputmode`
- Inline validation messages

### Accessibility skipped

I did not implement full screen-reader announcement support using advanced ARIA live regions due to time constraints. With more time, I would improve dynamic announcements for updated totals and validation feedback.

---

# 4. AI usage

I used ChatGPT to:
- Brainstorm UI structure
- Refine validation logic
- Improve responsive layout ideas
- Review accessibility considerations

One specific change I made:

The initial AI suggestion used HTML `type="number"` inputs. I replaced them with `type="text"` plus manual sanitization because browser number inputs allow inconsistent behavior like exponential notation (`1e5`) and poor mobile UX.

---

# 5. Honest gap

One area that could be improved is smarter currency input formatting while typing.

Currently, the app sanitizes invalid characters, but with another day I would implement:
- Better cursor preservation
- Real-time formatted currency input
- Improved handling for pasted malformed values
- More advanced remainder distribution logic for bill splitting

---

# Rounding Policy

I intentionally rounded the per-person amount upward to 2 decimal places using:

`Math.ceil(value * 100) / 100`

This prevents the group from underpaying due to floating-point rounding issues.
