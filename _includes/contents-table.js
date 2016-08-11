<script>
  // courtesy of https://jsfiddle.net/bryanbraun/nc6rL9hk/

  anchors.options.visible = 'always';
  anchors.add('h2');
  generateTableOfContents(anchors.elements);

  function generateTableOfContents(els) {
    var anchoredElText,
        anchoredElHref,
        ul = document.createElement('UL');

    document.getElementById('table-of-contents').appendChild(ul);

    for (var i = 0; i < els.length; i++) {
      anchoredElText = els[i].textContent;
      anchoredElHref = els[i].querySelector('.anchorjs-link').getAttribute('href');
      addNavItem(ul, anchoredElHref, anchoredElText);
    }
  }

  function addNavItem(ul, href, text) {
    var listItem = document.createElement('LI'),
        anchorItem = document.createElement('A'),
        textNode = document.createTextNode(text);

    anchorItem.href = href;
    ul.appendChild(listItem);
    listItem.appendChild(anchorItem);
    anchorItem.appendChild(textNode);
  }
</script>
