// Set theme
function setTheme() {
  if (localStorage.getItem("theme") == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

setTheme();

// Theme-toggle
document.getElementById('mode-toggle').addEventListener('click', async () => {
  if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  setTheme();
});

// Focus-mode-toggle
document.getElementById('focus-toggle').addEventListener('click', async () => {
  const body = document.getElementsByTagName('body')[0];
  const docu = document.documentElement;  
  body.classList.toggle('focus-mode');
});

// Focus heading
document.querySelectorAll('.heading-nr').forEach(hnr => {
  hnr.addEventListener('click', async () => {
    this.requestFullscreen();
  });
});


// Nav-toggle
document.getElementById('menu-toggle').addEventListener('click', async () => {
  const navAside = document.getElementById('nav-container');
  navAside.classList.toggle('nav-open');
});

function onlyShowBasic() {
  // Show only basic content
  document.querySelectorAll('.tag_intermediate, .tag_advanced').forEach(heading => {
    let article = heading.parentNode
    article.classList.toggle('hidden');
  });
}

// Make big tables great again
document.querySelectorAll('table').forEach(table => {
  let parentWidth = table.parentNode.offsetWidth
  if (table.offsetWidth / parentWidth > 0.7) {
    table.style.width = "100%";
  }
});

// Remove nav-menu if link is clicked
document.querySelectorAll('#toc a').forEach(link => {
  link.addEventListener('click', async () => {
    let navAside = document.getElementById('nav-container');  
    document.getElementById('nav-container').classList.remove('nav-open');
  });
});

// Smooth scrolling functionality using JavaScript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = 
              document.querySelector(this.getAttribute('href'));
              console.log(targetElement);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'instant'
        });
    });
});

// Insert copy-button in code blocks
document.querySelectorAll('pre').forEach(pre => {
  let copySymbol = '<img src="img/copy.svg" alt="Kopiera">' 
  const button = document.createElement('button');
  button.innerHTML = copySymbol;
  button.className = 'copy-btn';
  pre.appendChild(button);

  // Click event
  button.addEventListener('click', async () => {
    const code = pre.querySelector('code').innerText;

    try {
      await navigator.clipboard.writeText(code);
      setTimeout(() => button.innerHTML = copySymbol, 2000);
    } catch (err) {
      console.error('Kunde inte kopiera text: ', err);
      button.textContent = 'Fel!';
    }
  });
});

// Highlight links
document.querySelectorAll('.section-link > a').forEach(sectionLink => {
  sectionLink.addEventListener('click', async () => {
    if (sectionLink.classList.contains('section-open')) {
      sectionLink.classList.remove('section-open');
    } else {
      sectionLink.classList.add('section-open');
    }

    // Get ul-tag that is sibling to a-tag
    let articlesList = sectionLink.nextElementSibling;

    // Toggle ul-tagg classname 'open'
    if (articlesList.classList.contains('articles-open')) {
      articlesList.classList.remove('articles-open');
    } else {
      // Close all dropdowns
      document.querySelectorAll('.section-link ul').forEach(dropDown => {
        dropDown.classList.remove('articles-open')
      })
      articlesList.classList.add('articles-open');
    }
  });
});

// Scrollspy

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("#toc a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getElementsByTagName('h2')[0].getAttribute("id");
      const link = document.querySelector('#toc a[href="#' + id + '"]');
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-20% 0px -80% 0px"
  }
);

sections.forEach((section) => observer.observe(section));