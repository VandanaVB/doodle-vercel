export default function decorate(block) {
  const config = readBlockConfig(block)

  const card = document.createElement("section")
  card.className = "featured-card"

  const title = document.createElement("h2")
  title.className = "featured-title"
  title.textContent = config.title || "DOODLE OF THE WEEK"

  const imageContainer = document.createElement("div")
  imageContainer.className = "featured-image-container"

  // Look for image in block
  const image = block.querySelector("img")
  if (image) {
    image.className = "featured-image"
    imageContainer.appendChild(image.cloneNode(true))
  }

  const info = document.createElement("div")
  info.className = "featured-info"

  const artist = document.createElement("h3")
  artist.className = "featured-artist"
  artist.textContent = config.artistName || ""

  const description = document.createElement("p")
  description.className = "featured-description"
  description.textContent = config.description || ""

  const shareButton = document.createElement("button")
  shareButton.className = "share-button"
  shareButton.textContent = config.shareText || "Share Now"
  shareButton.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: "Doodle of the Week",
        text: description.textContent,
        url: window.location.href,
      })
    }
  })

  info.appendChild(artist)
  info.appendChild(description)
  info.appendChild(shareButton)

  card.appendChild(title)
  card.appendChild(imageContainer)
  card.appendChild(info)

  block.replaceWith(card)
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
