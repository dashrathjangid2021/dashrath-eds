/*
 * Accordion Block with multiple items support
 */
export default function decorate(block) {
  // Create a container for all accordion items
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Process each row as an accordion item
  [...block.children].forEach((row) => {
    if (row.children.length >= 2) {
      const label = row.children[0];
      const body = row.children[1];

      // Create details (accordion item) element
      const details = document.createElement('details');
      details.className = 'accordion-item';

      // Create summary (clickable header)
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';

      // Handle potential div wrapping
      const labelContent = label.firstElementChild?.tagName === 'DIV'
        ? label.firstElementChild : label;
      summary.append(...labelContent.childNodes);

      // Process body content
      body.className = 'accordion-item-body';
      const bodyContent = body.firstElementChild?.tagName === 'DIV'
        ? body.firstElementChild : body;
      body.innerHTML = bodyContent.innerHTML;

      // Assemble the accordion item
      details.append(summary, body);
      accordionContainer.appendChild(details);
    }
  });

  // Replace the original block with our new structure
  block.innerHTML = '';
  block.appendChild(accordionContainer);
}
