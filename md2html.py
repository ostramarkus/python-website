import re
import markdown
from slugify import slugify
from bs4 import BeautifulSoup

class Document:
    """Main class for md2html. Represents a document to be converted."""
    def __init__(self, md_path, template_path, title="Untitled", insert_tag="main", url="", html_file="index.html", id=""):
        self.bs4_parser = 'html.parser'
        self.id = id
        self.md_path = md_path
        self.template_path = template_path
        self.title = title
        self.html_file = html_file        
        self.verbose = False
        self.url = url

        self.content_soup = None 
        self.template_soup = None
        self.toc = None
        self.soup = None

        # Load and process content Markdown
        self.content_soup = self.process_content()

        # Create table of contents
        self.toc = TOC(self)
        toc_title = self.content_soup.new_tag('h4')
        toc_title.string = self.title

        # Load template and insert content
        template = Template(self, template_path)
        template.set_title(self.title)
        template.insert_content(self.content_soup, insert_tag)

        if not template.soup.aside:
            raise ValueError("Template missing <aside> for table of contents.")

        template.soup.aside.append(toc_title)
        template.soup.aside.append(self.toc.soup)
        template.soup.body['id'] = self.id
        # Assing merged document to 'soup' attribute
        self.soup = template.soup

    def process_content(self):
        """Clean and structure Markdown soup before merging with template."""
        return (SoupProcessor(self.load_markdown(self.md_path), html_file=self.html_file, url=self.url)
            .clean_up_headings()
            .id_headings()
            .wrap_elements('h2', 'section', ['h2'])
            .wrap_elements('h4', 'article', ['h2', 'h3', 'h4'])
            .div_wrap('table', class_name='table-container')
            .div_wrap('pre', class_name='code-container')
            .span_wrap(['h3', 'h4'], '⏺', 'tag_basic')
            .span_wrap(['h3', 'h4'], '⏹', 'tag_intermediate')
            .span_wrap(['h3', 'h4'], '◆', 'tag_advanced')
            .number_headings()
            .soup
        )

    def insert_main_nav(self, nav_data, id='#main-nav'):
        """Create and insert main navigation. Return as soup"""
        main_nav_soup = self.create_main_nav_soup(nav_data, id=self.id)
        main_nav_tag = self.soup.select(id)[0]
        main_nav_tag.append(main_nav_soup)
        return self

    def create_main_nav_soup(self, nav_data, id=""):
        """Create HTML for main navigation using BeautifulSoup. Return as soup."""
        soup = BeautifulSoup("", self.bs4_parser)

        # skapa huvud <ul>-elementet
        ul_tag = soup.new_tag("ul")

        # skapa <li> och <a> för varje länk
        for link_id, link_title, link_path in nav_data:
            li_tag = soup.new_tag("li", id=f"link-{link_id}")
            a_tag = soup.new_tag("a", href=link_path)
            a_tag.string = link_title
            if id == link_id:
                a_tag['class'] = 'active'
            li_tag.append(a_tag)
            ul_tag.append(li_tag)

        soup.append(ul_tag)
        return soup

    def load_markdown(self, md_path):
        """Load a Markdown file and return soup."""
        try:
            with open(md_path, encoding='utf-8') as md_file:
                md_str = md_file.read()
                html_str = markdown.markdown(md_str, extensions=['fenced_code', 'tables'])
        except FileNotFoundError:
            print('File', md_path, 'not found.')
            exit()
        return BeautifulSoup(html_str, self.bs4_parser)

    def remove_trailing_slashes(self, html_str):
        """Remove trailing slashes from void HTML tags"""
        void_tags = ["area", "base", "br", "col", "embed", "hr", "img",
                    "input", "link", "meta", "param", "source", "track", "wbr"]

        for tag in void_tags:
            html_str = re.sub(rf'<{tag}([^>]*)\s*/>', rf'<{tag}\1>', html_str)
        return html_str

    def as_html(self):
        """Decode soup to HTML. Remove trailing slashes and return as str."""
        html_output = self.soup.decode(formatter="html")
        html_output = self.remove_trailing_slashes(html_output)
        return html_output

    def save_html(self, save_path):
        """Save document as HTML-file"""
        html_str = self.as_html()
        with open(save_path, 'w', encoding='utf-8') as output_file:
            output_file.write(html_str)

    def __repr__(self):
        return f"<Document title='{self.title}' path='{self.md_path}'>"

class SoupProcessor:
    """Processes Beautiful Soup objects"""
    def __init__(self, soup, html_file="index.html", url="https://python.ostrawebb.se"):
        self.soup = soup   
        self.html_file = html_file
        self.url = url
        

    def id_headings(self):
        """Clean up headings by removing <strong> tags and empty headings."""
        for heading in self.soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            heading['id'] = slugify(heading.text) 
        return self

    def wrap_elements(self, heading_tag, wrapper_tag, stop_tags):
        for heading in list(self.soup.find_all(heading_tag)):
            wrapper = self.soup.new_tag(wrapper_tag)
            heading.insert_before(wrapper)
            wrapper.append(heading)
            next_node = wrapper.next_sibling
            while next_node and next_node.name not in stop_tags:
                sibling = next_node.next_sibling
                wrapper.append(next_node)
                next_node = sibling
        return self

    def clean_up_headings(self):
        """Clean up headings by removing <strong> tags and empty headings."""
        for header in self.soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            for strong in header.find_all("strong"):
                strong.unwrap()
            # Remove empty headings
            if not header.get_text(strip=True):
                header.decompose()    
        return self

    def number_headings(self):
        # TODO: Implement in site-config.yaml
                
        for i, section in enumerate(self.soup.find_all(['section']), start=1):
            span = self.soup.new_tag('span')
            span['class'] = 'heading-nr'
            span.string = str(i) + '. '
            h2 = section.find('h2')            
            h2.insert(0, span)
            
            link_a = self.soup.new_tag('a')
            link_a['data-link'] = self.url + self.html_file + "#" + h2['id']
            link_a['class'] = 'perma-link'
            link_a.string = '🔗'
            h2.append(link_a)            
        
            for j, heading in enumerate(section.find_all(['h3', 'h4']), start=1):
                nr_span = self.soup.new_tag('span')
                nr_span['class'] = 'heading-nr'
                nr_span.string = str(i) + '.' + str(j) + ' '
                heading.insert(0, nr_span)
                
                link_a = self.soup.new_tag('a')
                link_a['class'] = 'perma-link'
                link_a['href'] = self.url + self.html_file + "#" + heading['id']
                link_a.string = '🔗'
                heading.append(link_a)

        return self

    def div_wrap(self, tag_name, class_name='generic-div'):
        """Wrap elements in div"""
        for tag in self.soup.find_all(tag_name):
            div = self.soup.new_tag('div')
            div['class'] = class_name
            tag.wrap(div)
        return self

    def span_wrap(self, tag_name, char, class_name):
        for element in self.soup.find_all(tag_name):
            if element.text[0] == char:
                element['class'] = class_name
                element.string = element.text[2:]
        return self

class Template:
    """A class representing a HTML template"""
    def __init__(self, document, template_path):
        self.document = document
        self.soup = self.load_template(template_path)

    def html_file_to_soup(self, path):
        """Read an HTML file and return a BeautifulSoup object"""
        with open(path, encoding='utf-8') as html_file:
            html_str = html_file.read()
        return self.make_soup(html_str)

    def set_title(self, title):
        self.soup.find('title').string = title

    def load_template(self, template_path):
        """Read an HTML file and return a BeautifulSoup object"""
        with open(template_path, encoding='utf-8') as html_file:
            html_str = html_file.read()
        return BeautifulSoup(html_str, self.document.bs4_parser)

    def insert_content(self, content_soup, tag_name='main'):
        self.soup.find(tag_name).append(content_soup)
        return self

class TOC:
    """Class representiong a table of contents for a Document"""
    def __init__(self, document):
        self.document = document
        self.bs4_parser = document.bs4_parser
        self.soup = BeautifulSoup('', self.bs4_parser)
        self.structure = self.get_structure(document.content_soup)
        self.soup = self.create_toc_soup(self.structure)

    def get_structure(self, soup):
        """Extract TOC structure from the soup object."""

        # Iterate all <section> save id-attribute and inner text of <h2>
        structure = []
        for section in soup.find_all('section'):
            section_title_tag = section.find('h2')
            section_id = section_title_tag['id']
            if section_title_tag:
                section_title = section_title_tag.text.replace('🔗', '')
            else:
                continue
                
            section_data = {'id': section_id, 'title': section_title}

            # Iterate all sub-headings and save id-attribute and inner text of headings           
            section_headings = []
            for heading in section.find_all(['h3', 'h4']):
                heading_title = heading.text.replace('🔗', '')
                try:
                    heading_id = heading['id']
                except KeyError:
                    heading_id = 'generic'

                try:
                    heading_tag = heading['class']
                except KeyError:
                    heading_tag = 'generic'


                article_data = {'id': heading_id, 'title': heading_title, 'tag': heading_tag}
                section_headings.append(article_data)
            
            section_data['articles'] = section_headings
            structure.append(section_data)
        return structure

    def create_toc_soup(self, toc_data):
        ul = BeautifulSoup('<ul id="toc"></ul>', self.bs4_parser).ul
        for section in toc_data:
            li = self._build_section(section)
            ul.append(li)
        return ul

    def _build_section(self, section):
        li = BeautifulSoup('', self.bs4_parser).new_tag('li', **{'class': 'section-link'})
        a = self.soup.new_tag('a', href=f"#{section['id']}")
        a.string = section['title']
        li.append(a)
        if section['articles']:
            sub_ul = self.soup.new_tag('ul')
            for article in section['articles']:
                sub_li = self._build_article(article)
                sub_ul.append(sub_li)
            li.append(sub_ul)
        return li

    def _build_article(self, article):
        li = self.soup.new_tag('li', **{'class': 'article-link'})
        a = self.soup.new_tag('a', href=f"#{article['id']}", **{'class': article['tag']})
        a.string = article['title']
        li.append(a)
        return li

    def __str__(self):
        return self.html