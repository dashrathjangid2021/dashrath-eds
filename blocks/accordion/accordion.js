export default function decorate(block) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  const rows = Array.from(block.children);
  let hasValidItem = false;

  rows.forEach((row) => {
    const cells = Array.from(row.children).filter((el) => el.tagName === 'DIV');

    if (cells.length >= 2) {
      const title = cells[0].innerHTML.trim() || '[Missing Title]';
      const content = cells[1].innerHTML.trim() || '[Missing Content]';

      const item = document.createElement('details');
      item.className = 'accordion-item';

      const header = document.createElement('summary');
      header.className = 'accordion-header';
      header.innerHTML = title;

      const body = document.createElement('div');
      body.className = 'accordion-content';
      body.innerHTML = content;

      item.append(header, body);
      accordionContainer.appendChild(item);
      hasValidItem = true;
    }
  });

  if (hasValidItem) {
    block.innerHTML = '';
    block.appendChild(accordionContainer);
  } else {
    const error = document.createElement('div');
    error.className = 'accordion-error';
    error.textContent = 'No valid accordion items found. Ensure each item has a title and content.';
    block.innerHTML = '';
    block.appendChild(error);
  }
}
