# Jade Polo - portfolio

Personal portfolio covering coordination, web projects, creative work, research, and contact information.

## Local preview

From the project directory, run:

```powershell
node preview-server.cjs
```

Open <http://127.0.0.1:8080/>. The site uses plain HTML, CSS, and JavaScript; no install or build step is required.

## Pages

- `/` - introduction and areas of work
- `/about/` - background and experience
- `/virtual-assistance-project-coordination/` - coordination and practice tracker
- `/developer-projects/` - web projects and project briefs
- `/creative-projects/` - creative projects and image comparisons
- `/research-content/` - research and writing
- `/contact/` - contact form and links

Project briefs open on their respective pages. The practice tracker saves edits in the visitor's browser. The contact form prepares a message in the visitor's email application; it does not send email from the site.

## Deployment

Publish the contents of this directory as a static site, using this directory as the root and no build command. Keep clean URLs for the page directories (each has an `index.html`). Asset URLs begin at `/`, so the site must be served from the domain root. After publishing, verify the downloadable CV, contact email, project links, and mobile navigation on the live domain.

