export default function decorate(block) {
  // Validate block exists
  if (!block) {
    console.error('Accordion block not found');
    return;
  }

  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Process each row only if it has proper structure
  Array.from(block.children).forEach((row) => {
    try {
      // Skip if row doesn't have at least 2 cells
      if (!row.children || row.children.length < 2) {
        console.warn('Skipping malformed accordion item - missing title or content');
        return;
      }

      const details = document.createElement('details');
      details.className = 'accordion-item';

      // SAFE TITLE HANDLING
      const summary = document.createElement('summary');
      summary.className = 'accordion-header';
      const titleCell = row.children[0];
      summary.innerHTML = titleCell?.innerHTML || '[Missing Title]'; // Fallback text

      // SAFE CONTENT HANDLING
      const content = document.createElement('div');
      content.className = 'accordion-content';
      const contentCell = row.children[1];
      content.innerHTML = contentCell?.innerHTML || '[Missing Content]'; // Fallback text

      details.append(summary, content);
      accordionContainer.appendChild(details);
    } catch (error) {
      console.error('Error processing accordion item:', error, row);
    }
  });

  // Only replace if we found valid items
  if (accordionContainer.children.length > 0) {
    block.innerHTML = '';
    block.appendChild(accordionContainer);
  } else {
    block.innerHTML = '<div class="accordion-error">No valid accordion items found. Please check your content structure.</div>';
    console.error('No valid accordion items processed');
  }
}
