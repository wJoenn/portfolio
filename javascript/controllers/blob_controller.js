import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="blob"
export default class extends Controller {
  static targets = ["blob", "dot"]

  connect() {
    this.isSafari = navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Safari") > -1

    window.addEventListener("pointermove", event => {
      if (event.pointerType !== "touch") {
        const { clientX, clientY } = event
        this.#moveDot(clientX, clientY)
        this.#moveBlob(clientX, clientY)
      }
    })
  }

  #moveBlob(x, y) {
    if(this.isSafari) {
      this.blobTarget.style.left = `${x}px`
      this.blobTarget.style.top = `${y}px`
    } else {
      this.blobTarget.animate({
        left: `${x}px`,
        top: `${y}px`
      }, { duration: 3000, fill: "forwards" })
    }
  }

  #moveDot(x, y) {
    this.dotTarget.style.left = `${x}px`
    this.dotTarget.style.top = `${y}px`
  }
}
