import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="blob"
export default class extends Controller {
  static targets = ["blob", "dot"]

  connect() {
    window.addEventListener("pointermove", event => {
      const { clientX, clientY } = event

      this.dotTarget.style.left = `${clientX}px`
      this.dotTarget.style.top = `${clientY}px`

      this.blobTarget.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, {
        duration: 1000,
        fill: "forwards"
      })
    })
  }
}
