export default function decorate(block) {
  const footer = document.createElement("footer")
  footer.className = "doodle-footer"

  // Partner logos section
  const partnersSection = document.createElement("div")
  partnersSection.className = "footer-partners"

  // Links section
  const linksSection = document.createElement("div")
  linksSection.className = "footer-links"

  // Social section
  const socialSection = document.createElement("div")
  socialSection.className = "footer-social"

  const socialTitle = document.createElement("h3")
  socialTitle.textContent = "Follow us on"
  socialSection.appendChild(socialTitle)

  const socialLinks = document.createElement("div")
  socialLinks.className = "social-links"

  // Process each row based on content type
  ;[...block.children].forEach((row) => {
    const firstCell = row.children[0]
    const secondCell = row.children[1]

    // Check if this row contains an image (partner logo)
    const image = firstCell?.querySelector("img")
    if (image) {
      const logoContainer = document.createElement("div")
      logoContainer.className = "partner-logo"
      logoContainer.appendChild(image.cloneNode(true))
      partnersSection.appendChild(logoContainer)
      return
    }

    // Check if this row contains a link
    const link = firstCell?.querySelector("a") || secondCell?.querySelector("a")
    if (link) {
      const linkItem = document.createElement("div")
      linkItem.className = "footer-link-item"
      linkItem.appendChild(link.cloneNode(true))
      linksSection.appendChild(linkItem)
      return
    }

    // Check if this is social media content
    const text = firstCell?.textContent.trim().toLowerCase()
    if (text && ["facebook", "instagram", "youtube", "twitter"].includes(text)) {
      const socialLink = document.createElement("a")
      socialLink.className = `social-link social-link--${text}`
      socialLink.href = secondCell?.textContent.trim() || `#${text}`
      socialLink.setAttribute("aria-label", text)
      socialLinks.appendChild(socialLink)
      return
    }
  })

  socialSection.appendChild(socialLinks)

  // Portal links
  const portalSection = document.createElement("div")
  portalSection.className = "footer-portals"

  const portalLinks = ["ITC Portal", "ITC eStore"]
  portalLinks.forEach((portal) => {
    const portalLink = document.createElement("a")
    portalLink.textContent = portal
    portalLink.href = `#${portal.toLowerCase().replace(" ", "-")}`
    portalSection.appendChild(portalLink)
  })

  footer.appendChild(partnersSection)
  footer.appendChild(linksSection)
  footer.appendChild(socialSection)
  footer.appendChild(portalSection)

  block.replaceWith(footer)
}
