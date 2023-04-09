import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="blob"
export default class extends Controller {
  connect() {
    window.addEventListener("pointermove", event => {
      const { clientX, clientY } = event

      // this.element.style.left = `${clientX}px`
      // this.element.style.top = `${clientY}px`

      this.element.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, {
        duration: 1000,
        fill: "forwards"
      })
    })
  }
}
