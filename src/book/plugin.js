require(['honkit'], function (honkit) {
  honkit.events.bind('page.change', function () {
    const elements = document.getElementsByClassName('mermaid');
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = elements[i].innerHTML.replace('class_diagram_inheritance', '<|--');
    }
    $(document).ready(() => {
      mermaid.init();
    });
  });
});
