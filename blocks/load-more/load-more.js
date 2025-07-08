export default function decorate(block) {
  const config = readBlockConfig(block)

  const container = document.createElement("div")
  container.className = "load-more-container"

  const button = document.createElement("button")
  button.className = "load-more-button"
  button.textContent = config.buttonText || "Load More"

  button.addEventListener("click", async () => {
    button.textContent = "Loading..."
    button.disabled = true

    // Simulate loading more content
    setTimeout(() => {
      button.textContent = config.buttonText || "Load More"
      button.disabled = false
    }, 1000)
  })

  container.appendChild(button)
  block.replaceWith(container)
}

function readBlockConfig(block) {
  const config = {}
  ;[...block.children].forEach((row) => {
    if (row.children && row.children.length === 2) {
      const key = row.children[0].textContent.trim()
      const value = row.children[1].textContent.trim()
      config[key] = value
    }
  })
  return config
}
