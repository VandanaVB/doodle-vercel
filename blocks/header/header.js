export default function decorate(block) {
  // Create header element
  const header = document.createElement("header")
  header.className = "doodle-header"

  // Read block configuration from table structure
  const config = {}
  ;[...block.children].forEach((row) => {
    if (row.children && row.children.length === 2) {
      const key = row.children[0].textContent.trim()
      const value = row.children[1].textContent.trim()
      config[key] = value
    }
  })

  // Create hamburger menu
  const menuButton = document.createElement("button")
  menuButton.className = "menu-toggle"
  menuButton.innerHTML = "☰"
  menuButton.setAttribute("aria-label", "Toggle menu")
  menuButton.addEventListener("click", () => {
    header.classList.toggle("menu-open")
  })

  // Create logo
  const logo = document.createElement("div")
  logo.className = "logo"
  logo.textContent = config.logo || "Doodle"

  // Create login button
  const loginButton = document.createElement("a")
  loginButton.className = "login-btn"
  loginButton.textContent = config.loginText || "Login"
  loginButton.href = config.loginUrl || "/login"

  // Assemble header
  header.appendChild(menuButton)
  header.appendChild(logo)
  header.appendChild(loginButton)

  // Replace block with decorated header
  block.replaceWith(header)
}
