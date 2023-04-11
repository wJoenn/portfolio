import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="blob"
export default class extends Controller {
  static targets = ["blob", "dot"]

  connect() {
    window.addEventListener("mousemove", event => {
      const { clientX, clientY } = event

      this.dotTarget.style.left = `${clientX}px`
      this.dotTarget.style.top = `${clientY}px`

      this.blobTarget.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, {
        duration: 3000,
        fill: "forwards"
      })
    })
  }
}
