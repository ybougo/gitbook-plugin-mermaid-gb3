const mermaidRegex = /^```mermaid((.*[\r\n]+)+?)?```$/im;

function processMermaidBlockList(page) {
  let match;
  while ((match = mermaidRegex.exec(page.content))) {
    const rawBlock = match[0];
    const mermaidContent = match[1];
    page.content = page.content.replace(
      rawBlock,
      '<div class="mermaid">' + mermaidContent.replace('<|--', 'class_diagram_inheritance') + '</div>'
    );
  }
  return page;
}

module.exports = {
  website: {
    assets: './dist',
    js: ['book/plugin.js']
  },
  hooks: {
    'page:before': processMermaidBlockList
  }
};
