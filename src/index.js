const mermaidRegexMd = /^```mermaid((.*[\r\n]+)+?)?```$/im;
const mermaidRegexAdoc = /^\[mermaid\]\n\.\.\.\.((.*[\r\n]+)+?)?\.\.\.\.$/im;

function processMermaidBlockList(page) {
  let match;
  if (page.type === 'markdown') {
    while ((match = mermaidRegexMd.exec(page.content))) {
      const rawBlock = match[0];
      const mermaidContent = match[1];
      page.content = page.content.replace(
        rawBlock,
        '<div class="mermaid">' +
          mermaidContent.replace('<|--', 'class_diagram_inheritance') +
          '</div>'
      );
    }
  } else if (page.type === 'asciidoc') {
    while ((match = mermaidRegexAdoc.exec(page.content))) {
      const rawBlock = match[0];
      const mermaidContent = match[1];
      page.content = page.content.replace(
        rawBlock,
        '+++<div class="mermaid">' +
          mermaidContent.replace('<|--', 'class_diagram_inheritance') +
          '</div>+++'
      );
    }
  }
  return page;
}

module.exports = {
  book: {
    assets: './dist/assets',
    js: ['plugin.js', 'mermaid.min.js']
  },
  hooks: {
    'page:before': processMermaidBlockList
  }
};
