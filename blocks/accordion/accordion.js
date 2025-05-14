export default function decorate(block) {
  block.classList.add('accordion-container');
  Array.from(block.children).forEach((row) => {
    row.outerHTML = `
      <details class="accordion-item">
        <summary class="accordion-header">
          ${row.children[0].innerHTML}
        </summary>
        <div class="accordion-content">
          ${row.children[1].innerHTML}
        </div>
      </details>
    `;
  });
}
