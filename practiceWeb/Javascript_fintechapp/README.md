# Frontend Projects

A small collection of frontend work by Adex Main. Each top-level folder is an independent project or implementation, while this repository keeps the related work together for easy review.

## Open in VS Code

Open `Frontend-Projects.code-workspace` instead of the repository folder. The Explorer will show four named project roots:

| Project | Stack | Status | How to open |
| --- | --- | --- | --- |
| `portfolio/` | HTML, CSS | Published portfolio | Open `index.html` in a browser |
| `ledgerly-js/` | HTML, CSS, JavaScript | Complete prototype | Open `index.html` in a browser |
| `ledgerly-react/` | React | Complete prototype | Run the React commands below |
| `my-app/` | React | In progress | Treat as a sandbox until it has its own README |

The `build/` and `node_modules/` folders are generated files. They stay in the repository where needed for deployment, but are hidden from the VS Code Explorer and search results.

## Project links

- `portfolio/` is the main presentation site.
- `ledgerly-js/` and `ledgerly-react/` are two implementations of the same Ledgerly fintech concept.
- `my-app/` is unfinished practice work and is intentionally labeled as such.

## Run Ledgerly React

```bash
cd ledgerly-react
npm install
npm start
```

## Check Ledgerly React

```bash
cd ledgerly-react
npm test -- --watchAll=false
npm run build
```

## Contribution rule

Keep each project self-contained. Add a short `README.md` inside a project when it needs its own setup steps, and move abandoned experiments into an `archive/` folder rather than leaving unclear top-level names.
