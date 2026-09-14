# He Yichen — research notebook

Personal academic site for He Yichen, a PhD researcher at the National University of Singapore. The site uses a custom black-and-green terminal interface to frame research outputs, working notes, and profile information.

## Content map

- `/` — profile, research focus, selected publications, skills, and recent posts
- `/publications/` — selected publications plus the Jekyll publication collection
- `/year-archive/` — all long-form research notes in reverse chronological order
- `/cv/` — education, work experience, skills, and teaching
- `/404.html` — custom terminal-style missing-page screen
- `_posts/` — Markdown research notes and embedded PDFs
- `_publications/` — publication collection records
- `_data/research.yml` — curated homepage/publication data
- `images/` and `files/` — profile photography, diagrams, papers, slides, and other assets

## Local development

This is a Jekyll site. With Ruby and Bundler installed:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open `http://localhost:4000`. The repository also includes a `Dockerfile` for running the site with a Ruby 3.2 toolchain.

## Updating the site

Edit the author and links in `_config.yml`, curated research cards in `_data/research.yml`, and navigation labels in `_data/navigation.yml`. New posts belong in `_posts/`; use the existing front matter pattern to preserve their URLs and metadata.
