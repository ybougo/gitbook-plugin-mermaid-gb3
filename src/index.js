module.exports = {
  book: {
    assets: './dist/assets',
    js: ['plugin.js', 'mermaid.min.js'],
  },
  hooks: {
    'page:before': processMermaidBlockList,
  },
};

const mermaidRegexMd = /^```mermaid((.*[\r\n]+)+?)?```$/im;
const mermaidRegexAdoc = /^\[mermaid\]\r\n\.\.\.\.((.*[\r\n]+)+?)?\.\.\.\.$/im;

function processMermaidBlockList(page) {
  let matched;
  if (isPageTypeMarkdown(page.type)) {
    while ((matched = mermaidRegexMd.exec(page.content))) {
      page.content = replaceMatchedContent(matched, page.content, page.type);
    }
  } else {
    while ((matched = mermaidRegexAdoc.exec(page.content))) {
      page.content = replaceMatchedContent(matched, page.content, page.type);
    }
  }
  return page;
}

function replaceMatchedContent(matched, content, pageType) {
  const asciidoctorRaw = isPageTypeMarkdown(pageType) ? '' : '+++';
  const rawBlock = matched[0];
  const mermaidContent = matched[1];
  return content.replace(
    rawBlock,
    `${asciidoctorRaw}<div class="mermaid">${mermaidContent.replace(
      '<|--',
      'class_diagram_inheritance'
    )}</div>${asciidoctorRaw}`
  );
}

function isPageTypeMarkdown(pageType) {
  return pageType === 'markdown';
}
