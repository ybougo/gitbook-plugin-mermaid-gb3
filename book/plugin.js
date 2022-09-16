require(['honkit'], function (honkit) {
  honkit.events.bind('page.change', function () {
    let elements = document.getElementsByClassName('mermaid');
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = elements[i].innerHTML.replace('class_diagram_inheritance', '<|--');
    }
    // wait loading
    setTimeout(() => {
      mermaid.init();
    }, 500);
  });
});
