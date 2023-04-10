import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="contact-form"
export default class extends Controller {
  static targets = ["error", "success"]

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    this.params = new FormData()

    if (this.#validateInputsValues(data)) this.#sendMail()
  }

  #buildParams(data) {
    this.params.append("email", data.get("email"))

    const message = `${data.get("message")}\n\nMessage sent by ${data.get("firstName")} ${data.get("lastName")}\nFrom ${data.get("company")}`
    this.params.append("message", message)
  }

  #sendMail() {
    fetch("https://formspree.io/f/xbjepgvq", {
      method: "POST",
      body: this.params,
      headers: { "Accept": "application/json" }
    }).then(res => this.#updateFormStatus(res))
      .catch(() => this.errorTarget.innerHTML = "There was an error sumbitting your form. Feel free to try again or contact me on Linkedin.")
  }

  #updateFormStatus(res) {
    if (res.ok) {
      this.errorTarget.innerText = ""
      this.successTarget.innerText = "Your email was correctly sent. I'll make sure to respond in the shortest delay."
      this.element.reset()
    } else {
      res.json().then(data => {
        if (data["errors"]) this.errorTarget.innerHTML = data["errors"].map(e => e["message"]).join(", ")
        else this.errorTarget.innerHTML = "There was an error sumbitting your form. Feel free to try again or contact me on Linkedin."
      })
    }
  }

  #validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  }

  #validateInputsValues(data) {
    if (!this.#validatePresenceOf([...data.values()])) {
      this.errorTarget.innerText = "Please fill out the form completly"
      return false
    }

    if (!this.#validateEmail(data.get("email"))) {
      this.errorTarget.innerText = "Please use a valid email adress"
      return false
    }

    if (!this.#validateMessage(data.get("message"))) {
      this.errorTarget.innerText = "Please explain the reason you're contacting me in a bit more detail"
      return false
    }

    this.#buildParams(data)
    return true
  }

  #validateMessage(message) {
    return message.length > 50
  }

  #validatePresenceOf(values) {
    return !values.includes("")
  }
}
