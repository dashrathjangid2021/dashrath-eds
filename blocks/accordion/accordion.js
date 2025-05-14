export default function decorate(block) {
  // Create container
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Process each row
  Array.from(block.children).forEach((row) => {
    // Validate row structure
    if (!row.children || row.children.length < 2) {
      console.warn('Invalid accordion item structure', row);
      return;
    }

    // Create accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';

    // Create header
    const summary = document.createElement('summary');
    summary.className = 'accordion-header';

    // Safely handle title content
    const titleCell = row.children[0];
    if (titleCell) {
      summary.innerHTML = titleCell.innerHTML || '';
    }

    // Create content area
    const content = document.createElement('div');
    content.className = 'accordion-content';

    // Safely handle content
    const contentCell = row.children[1];
    if (contentCell) {
      content.innerHTML = contentCell.innerHTML || '';
    }

    // Assemble components
    details.append(summary, content);
    accordionContainer.appendChild(details);
  });

  // Replace original content
  block.textContent = '';
  block.appendChild(accordionContainer);
}
