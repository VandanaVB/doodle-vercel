export default function decorate(block) {
  const config = readBlockConfig(block)

  const hero = document.createElement("section")
  hero.className = "doodle-hero"

  const content = document.createElement("div")
  content.className = "hero-content"

  const title = document.createElement("h1")
  title.className = "hero-title"
  title.textContent = config.title || "Doodle"

  const description = document.createElement("p")
  description.className = "hero-description"
  description.textContent = config.description || ""

  content.appendChild(title)
  content.appendChild(description)
  hero.appendChild(content)

  block.replaceWith(hero)
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
