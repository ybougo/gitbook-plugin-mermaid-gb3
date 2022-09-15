require(['gitbook'], function (gitbook) {
  gitbook.events.bind('page.change', function () {
    // wait loading
    setTimeout(() => {
      mermaid.init();
    }, 500);
  });
});
