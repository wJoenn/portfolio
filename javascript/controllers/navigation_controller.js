import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navigation"
export default class extends Controller {
  static targets = ["link", "section"]

  handleScroll() {
    const coords = this.sectionTargets.map(s => Math.abs(s.getBoundingClientRect().x))
    const index = coords.indexOf(Math.min(...coords))

    if (!this.linkTargets[index].classList.contains("active")) {
      this.linkTargets.forEach(e => e.classList.remove("active"))
      this.linkTargets[index].classList.add("active")
    }
  }
}
