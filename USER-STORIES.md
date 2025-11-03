## User Stories and Acceptance Criteria

### User Story 1: View documents

- As a user, I want to see available documents when I open the app.

#### Acceptance criteria

- A loading indicator appears while documents are being fetched.
- On success, each document shows name, version, created time, contributors, and attachments.
- On failure, an error toast is shown.
- Accessibility: the loading indicator has an accessible name and is announced appropriately; error toasts are announced once and are dismissible with the keyboard.

---

### User Story 2: Sort documents

- As a user, I want to sort documents by different fields.

#### Acceptance criteria

- I can choose sorting by Name, Version, or Oldest.
- The visible documents reflect the selected sort.
- The selected sort is shown in the control.
- Accessibility: the sorting control is a labeled select, keyboard operable, and its current value is exposed to assistive technologies.

---

### User Story 3: Switch layout

- As a user, I want to choose between list and grid views on larger screens.

#### Acceptance criteria

- On desktop, I can switch to list or grid.
- On mobile, the default layout is grid; layout controls may be hidden.
- Responsive: when crossing the mobile breakpoint, the layout updates to match the breakpoint defaults.
- Accessibility: layout controls expose role and state to assistive technologies (e.g., radiogroup with options that indicate the checked state) and are fully keyboard operable.

---

### User Story 4: Add a new document

- As a user, I want to add a document using a modal form.

#### Acceptance criteria

- I can open a modal with the form.
- Name and Version are required; Contributors and Attachments accept comma-separated values.
- On successful save, I see a success toast and the document appears in the list.
- On failure, I see an error toast and the modal remains open.
- Accessibility:
  - inputs have labels
  - invalid fields set aria-invalid and show error messages in an alert region
  - the modal traps focus while open and has appropriate labeling
  - the errors are described with texts and not only color

---

### User Story 5: See notifications in real time

- As a user, I want to see how many notifications have arrived.

#### Acceptance criteria

- A notifications badge shows the total notifications received.
- The badge updates when a new notification arrives.
- Accessibility: the notifications region conveys updates to assistive technologies without being intrusive (e.g., status/politeness), and the badge has an accessible name reflecting the count.

---

### User Story 10: Empty state

- As a user, I want guidance when there are no documents.

#### Acceptance criteria

- An empty state message is shown when there are no documents.
- An action is available to add a new document.
- Accessibility: the empty state message is clearly announced and the action to add a document is keyboard operable and labeled.
