# Python Website - Swedish Programming Learning Resource

A static website generator that converts Markdown content into a fully-featured HTML website for teaching Python programming in Swedish. Built with Python and designed to generate educational content with automatic table of contents, navigation, and semantic HTML structure.

## 📖 About

This project creates an interactive learning website at [python.ostrawebb.se](https://python.ostrawebb.se) that teaches Python programming fundamentals and advanced topics to Swedish-speaking students. The site is generated from Markdown source files using custom Python conversion tools.

## ✨ Features

- **Markdown-to-HTML Conversion**: Custom converter built with BeautifulSoup for fine-grained control
- **Automatic Table of Contents**: Generates dynamic TOC from heading structure
- **Smart Navigation**: Auto-generated main navigation menu from configuration
- **Semantic HTML**: Properly structured sections, articles, and content hierarchy
- **Heading Management**: 
  - Auto-numbered sections (1., 1.1, 1.2, etc.)
  - Permanent links for deep linking to content
  - ID generation for all headings
- **Content Styling Support**:
  - Difficulty level indicators (🟡 Basic, 🔴 Intermediate, ◆ Advanced)
  - Code block containers
  - Table containers
- **Templating System**: Uses HTML templates for consistent site layout
- **YAML Configuration**: Simple page configuration in `site-config.yaml`

## 🗂️ Project Structure

```
.
├── main.py                 # Main entry point - orchestrates the build
├── md2html.py              # Core conversion library
├── site-config.yaml        # Page configuration
├── pyproject.toml          # Project metadata
├── md/                     # Markdown source files
├── templates/              # HTML template files
├── public_html/            # Generated HTML output
├── wip/                    # Work in progress files
└── poetry.lock             # Dependency lock file
```

## 🛠️ Installation

### Prerequisites
- Python 3.12 or higher
- [Poetry](https://python-poetry.org/) or [UV](https://docs.astral.sh/uv/) for dependency management

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ostramarkus/python-website.git
cd python-website
```

2. Install dependencies:
```bash
poetry install
# or
uv sync
```

## 📝 Usage

### Building the Site

Run the main script to generate all pages:

```bash
python main.py
```

This will:
1. Read `site-config.yaml` for page definitions
2. Convert Markdown files from the `md/` directory
3. Apply the HTML template from `templates/main.html`
4. Generate static HTML files in `public_html/`
5. Log progress for each generated page

### Adding New Pages

1. Create a Markdown file in the `md/` directory:
```markdown
# Page Title

## Section 1
Content here...

## Section 2
Content here...
```

2. Add an entry to `site-config.yaml`:
```yaml
- id: mypage
  title: My Page Title
  link_text: My Page
  md_file: mypage.md
  html_file: mypage.html
  generate: yes
```

3. Run `python main.py` to regenerate the site

### Difficulty Level Indicators

Prefix headings with special characters to mark difficulty levels:

- `⏺ Basic Topic` → Marked as basic level
- `⏹ Intermediate Topic` → Marked as intermediate level  
- `◆ Advanced Topic` → Marked as advanced level

## 📦 Dependencies

- **markdown** (3.9+): Markdown parsing and HTML conversion
- **beautifulsoup4**: HTML parsing and manipulation
- **python-slugify**: URL-safe slug generation for heading IDs
- **pyyaml**: YAML configuration file parsing

## 🔧 Core Components

### `md2html.py`

Main conversion library with the following key classes:

- **Document**: Orchestrates the conversion process
  - Loads Markdown and template files
  - Manages content and template merging
  - Generates TOC and navigation
  
- **SoupProcessor**: Post-processes BeautifulSoup objects
  - Cleans and structures HTML
  - Adds IDs to headings
  - Wraps elements for semantic structure
  - Numbers headings hierarchically
  
- **Template**: Manages HTML templates
  - Loads and parses template files
  - Inserts content into template
  - Sets page titles
  
- **TOC**: Generates table of contents
  - Extracts heading structure
  - Creates nested navigation links
  - Supports multi-level hierarchy

### `main.py`

Entry point that:
1. Reads site configuration from YAML
2. Creates navigation data structure
3. Iterates through configured pages
4. Generates HTML for each page
5. Saves output to `public_html/`
6. Logs build progress

## 📄 Site Configuration

`site-config.yaml` defines all pages with:

- `id`: Unique page identifier
- `title`: Page title (shown in browser tab)
- `link_text`: Navigation menu text
- `md_file`: Source Markdown filename
- `html_file`: Output HTML filename
- `generate`: Whether to generate this page

## 🌐 Currently Published Pages

- **Hem** (Home): Introduction to Python programming
- **Grunder** (Basics): Python fundamentals
- **Fortsättning** (Continuation): Advanced Python topics
- **Tillämpningar** (Applications): Practical Python applications
- **Utvecklingsmiljö och verktyg** (Development Environment): Tools and setup

## 📚 Topics Covered

Topics are organized by difficulty and include code examples, explanations, and linked sections. Each page features:

- Hierarchical heading structure with automatic numbering
- Responsive table of contents sidebar
- Code syntax highlighting support
- Permanent deep-linking to any section

## 👤 Author

Created by **Markus Pettersson** for educational purposes.

**Live Site**: https://python.ostrawebb.se
