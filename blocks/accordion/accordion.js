export default function decorate(block) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  const rows = Array.from(block.children);
  let hasValidItem = false;

  rows.forEach((row, rowIndex) => {
    // Only process element nodes
    if (!(row instanceof HTMLElement)) return;

    // Get direct children (cells)
    const cells = Array.from(row.children).filter((child) => child instanceof HTMLElement);

    // Expect at least two cells: title and content
    if (cells.length < 2) {
      console.warn(`Row ${rowIndex} skipped: expected at least 2 cells, found ${cells.length}`);
      return;
    }

    const titleContent = cells[0].innerHTML?.trim() || '[Missing Title]';
    const bodyContent = cells[1].innerHTML?.trim() || '[Missing Content]';

    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-header';
    summary.innerHTML = titleContent;

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerHTML = bodyContent;

    details.append(summary, content);
    accordionContainer.appendChild(details);
    hasValidItem = true;
  });

  if (hasValidItem) {
    block.innerHTML = '';
    block.appendChild(accordionContainer);
    console.log('Accordion initialized successfully with', accordionContainer.children.length, 'items.');
  } else {
    const error = document.createElement('div');
    error.className = 'accordion-error';
    error.textContent = 'No valid accordion items found. Ensure each item has at least a title and content.';
    block.innerHTML = '';
    block.appendChild(error);
    console.error('Accordion block error: no valid items processed.');
  }
}
