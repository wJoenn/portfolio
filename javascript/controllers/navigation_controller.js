import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navigation"
export default class extends Controller {
  static targets = ["link"]

  click(event) {
    this.linkTargets.forEach(e => e.classList.remove("active"))
    event.target.classList.add("active")
  }
}
