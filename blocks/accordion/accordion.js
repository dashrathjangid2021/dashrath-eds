export default function decorate(block) {
  // Debug: Log initial block state
  console.log('Initial block content:', block.innerHTML);

  // Create container
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Process each row
  Array.from(block.children).forEach((row, index) => {
    console.log(`Processing row ${index}:`, row);

    // Skip if not a valid row
    if (!row.tagName || row.tagName !== 'DIV') {
      console.warn(`Skipping invalid row at index ${index}`);
      return;
    }

    // Get cells - Franklin uses DIVs for cells
    const cells = Array.from(row.children).filter((child) => child.tagName === 'DIV');

    // Validate we have at least title and content
    if (cells.length < 2) {
      console.warn(`Skipping row ${index} - insufficient cells (${cells.length})`);
      return;
    }

    // Create accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';

    // Create header from first cell
    const summary = document.createElement('summary');
    summary.className = 'accordion-header';
    summary.innerHTML = cells[0].innerHTML || '[Missing Title]';

    // Create content from second cell
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerHTML = cells[1].innerHTML || '[Missing Content]';

    // Assemble components
    details.append(summary, content);
    accordionContainer.appendChild(details);
  });

  // Final validation
  if (accordionContainer.children.length === 0) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'accordion-error';
    errorMsg.textContent = 'No valid accordion items found. Please check your content structure.';
    block.replaceWith(errorMsg);
    console.error('No valid accordion items were processed');
    return;
  }

  // Replace original content
  block.innerHTML = '';
  block.appendChild(accordionContainer);
  console.log('Accordion successfully initialized');
}
