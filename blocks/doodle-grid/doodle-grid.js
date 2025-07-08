export default function decorate(block) {
  const grid = document.createElement("section")
  grid.className = "doodle-grid"

  // Process each row as a doodle card item
  ;[...block.children].forEach((row) => {
    const card = document.createElement("div")
    card.className = "doodle-card"

    // Extract image from first cell
    const imageCell = row.children[0]
    const image = imageCell?.querySelector("img")
    if (image) {
      image.className = "doodle-image"
      card.appendChild(image.cloneNode(true))
    }

    const info = document.createElement("div")
    info.className = "doodle-info"

    // Extract artist name from second cell
    if (row.children[1]) {
      const artist = document.createElement("h3")
      artist.className = "doodle-artist"
      artist.textContent = row.children[1].textContent.trim()
      info.appendChild(artist)
    }

    // Extract doodle ID from third cell
    if (row.children[2]) {
      const id = document.createElement("span")
      id.className = "doodle-id"
      id.textContent = row.children[2].textContent.trim()
      info.appendChild(id)
    }

    // Extract description from fourth cell
    if (row.children[3]) {
      const description = document.createElement("p")
      description.className = "doodle-description"
      description.textContent = row.children[3].textContent.trim()
      info.appendChild(description)
    }

    const viewButton = document.createElement("button")
    viewButton.className = "view-button"
    viewButton.textContent = "View Now"
    viewButton.addEventListener("click", () => {
      // Handle view action
      console.log("View doodle:", row.children[2]?.textContent.trim())
    })
    info.appendChild(viewButton)

    card.appendChild(info)
    grid.appendChild(card)
  })

  block.replaceWith(grid)
}
