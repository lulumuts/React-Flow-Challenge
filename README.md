# React Flow – Update Profile Field

A React Flow application with custom nodes for updating profile fields. Built with React, Vite, TipTap, and Turn.io Expression Language integration.

![Update Profile Field Node](docs-screenshot.png)

## Features

### Basic React Flow configuration
- Custom node type for the "Update Profile Field" card
- Custom edges with purple styling
- Add-node (+) button to create new nodes below the current one
- Connection handles on the left for flow edges

### Field input
- **Field name types** – Includes profile fields such as Name, Surname, Location, Opted In, Language, Birthday, Is Blocked, and custom fields
- **Languages** – ISO 639-3 languages fetched from `src/lib/languageOptions.js`
- **Searchable** – Field type is searchable in the input field
- **Icons** – Field type icons provided by Turn.io, located in `src/assets/field-types/`
  - Type_01-STRING.svg (Text)
  - Translate_01-LANGUAGE.svg (Language)
  - Toggle_03Right-BOOLEAN.svg (Boolean)
  - Dotpoints_01-ENUM.svg (Enum)
  - CalendarDate-DATETIME.svg (Date)
  - Calculator-INTEGER.svg (Integer)

### Value field
- **TipTap** – WYSIWYG editor for rich text input
- **Not editable by default** – Value field is disabled until a field is selected
- **Turn.io Expression Language** – Integrated expression suggestions:
  - Schema defined in `src/lib/turnioExpressionSchema.js` using Turn.io documentation
  - Mock data in `src/lib/expressionSuggestions.js` (API key placeholder)
  - Business logic in `src/Components/molecules/ExpressionSuggestionList.jsx`
  - Typing `@` in the input displays the expressions list
  - Clicking the `@` button also displays the expressions list

### Field types
- **Text** – No dropdown (⬇️) button; inline text editing with TipTap
- **Date / Boolean / Enum** – Dropdown (⬇️) button present for picking values
- **Clear button** – When a value is selected, an ✕ button appears to clear the input; the field is not editable while a value is set

### Saving
- **Submit button** – When the value field is populated (for Date/Boolean/Enum types), a Submit button appears to save the values
- **Dynamic updates** – When a new selection is made in the card, the saved value updates with the new data

### Icons
- Field type icons downloaded from Google Drive and included in `src/assets/field-types/`

## Project structure

```
src/
├── Components/
│   ├── molecules/
│   │   ├── ExpressionSuggestionList.jsx  # Expression @ suggestions UI
│   │   ├── InputSelectField.jsx          # Field dropdown
│   │   ├── TiptapValueField.jsx          # Value editor (TipTap + expressions)
│   │   ├── ValueFieldWithPicker.jsx      # Value field with Date/Boolean/Enum pickers
│   │   └── ...
│   └── organisms/
│       └── Card.jsx                       # Custom node component
├── lib/
│   ├── expressionSuggestions.js          # Mock expression data
│   ├── languageOptions.js                # ISO 639-3 language options
│   └── turnioExpressionSchema.js         # Turn.io expression schema
└── assets/
    └── field-types/                      # Turn.io field type icons
```

## Getting started

```bash
npm install
npm run dev
```

## Tech stack

- React + Vite
- [@xyflow/react](https://reactflow.dev/) – React Flow
- [TipTap](https://tiptap.dev/) – Rich text editor
- MUI (Material UI) – Select, buttons, date picker
- Turn.io Expression Language – Profile field expressions
