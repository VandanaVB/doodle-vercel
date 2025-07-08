export default function decorate(block) {
  const buttons = document.createElement("div")
  buttons.className = "cta-buttons"

  // Process each row as a button item
  ;[...block.children].forEach((row) => {
    if (row.children && row.children.length >= 2) {
      const button = document.createElement("a")
      button.className = "cta-button"

      // First cell contains button text
      button.textContent = row.children[0].textContent.trim()

      // Second cell contains URL (could be link or plain text)
      const urlCell = row.children[1]
      const link = urlCell.querySelector("a")
      button.href = link ? link.href : urlCell.textContent.trim()

      // Third cell might contain variant info
      const variant = row.children[2]?.textContent.trim().toLowerCase()
      if (variant === "primary" || button.textContent.toLowerCase().includes("gallery")) {
        button.classList.add("cta-button--primary")
      } else {
        button.classList.add("cta-button--secondary")
      }

      buttons.appendChild(button)
    }
  })

  block.replaceWith(buttons)
}
