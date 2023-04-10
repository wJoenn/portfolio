import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="hacker-text"
export default class extends Controller {
  static values = { text: String }

  connect() {
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    this.#shuffleWord()

    setInterval(() => this.#shuffleWord(), 10000);
  }

  #shuffleWord() {
    let i = 0
    const interval = setInterval(() => {
      this.element.innerText = this.element.innerText.split("").map((letter, index) => {
        if (index < i) return this.textValue[index]

        return this.letters[Math.floor(Math.random() * 26)]
      }).join("")

      if (i >= this.textValue.length) clearInterval(interval)

      i += 1 / 2
    }, 30);
  }
}
