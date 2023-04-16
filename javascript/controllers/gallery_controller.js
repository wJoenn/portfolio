import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="gallery"
export default class extends Controller {
  static targets = ["gallery", "image", "snippet"]

  connect() {
    this.html = document.querySelector("html")
    this.body = document.querySelector("body")

    window.addEventListener("keydown", event => {
      if (event.key === "Escape") this.galleryTargets.forEach(g => g.classList.add("hidden"))
    })
  }

  handleClick(event) {
    this.snippetTargets.forEach(s => {
      if (s === event.target) {
        s.classList.add("active")
      } else {
        s.classList.remove("active")
      }
    })

    const id = event.target.dataset.target
    const images = this.imageTargets.filter(i => i.classList.contains("rentart"))
    images.forEach(i => {
      if (i.id === id) {
        i.classList.remove("hidden")
      } else {
        i.classList.add("hidden")
      }
    })
  }

  hideGallery(event) {
    if (event.currentTarget === event.target) {
      this.galleryTargets.forEach(g => g.classList.add("hidden"))

      this.html.classList.remove("noscroll")
      this.body.classList.remove("noscroll")
    }
  }

  showGallery(event) {
    const id = event.target.dataset.target
    this.galleryTargets.find(g => g.id === id).classList.remove("hidden")

    this.html.classList.add("noscroll")
    this.body.classList.add("noscroll")
  }
}
