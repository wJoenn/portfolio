import { Controller } from "@hotwired/stimulus"

const FORM_URL = "https://formspree.io/f/xbjepgvq"
const ERROR_MESSAGES = {
  incompleteForm: "Please fill out the form completely",
  invalidEmail: "Please use a valid email address",
  shortMessage: "Please explain the reason you're contacting me in a bit more detail",
  submitError: "There was an error submitting your form. Feel free to try again or contact me on Linkedin."
}

// Connects to data-controller="contact-form"
export default class extends Controller {
  static targets = ["error", "success"]

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    if (this.#validateFormData(formData)) this.#sendMail(formData)
  }

  #buildParams(data) {
    const params = new FormData()
    const message = `${data.get("message")}\n\nMessage sent by ${data.get("firstName")} ${data.get("lastName")}\nFrom ${data.get("company")}`

    params.append("email", data.get("email"))
    params.append("message", message)

    return params
  }

  #handleFormErrors(res) {
    res.json().then(data => {
      if (data.errors) this.errorTarget.innerHTML = data.errors.map(e => e.message).join(", ")
      else this.errorTarget.innerHTML = ERROR_MESSAGES.submitError
    })
  }

  #handleFormSuccess() {
    this.errorTarget.innerText = ""
    this.successTarget.innerText = "Your email was correctly sent. I'll make sure to respond in the shortest delay."
    this.element.reset()
  }

  #sendMail(data) {
    fetch(FORM_URL, {
      method: "POST",
      body: this.#buildParams(data),
      headers: { Accept: "application/json" }
    }).then(res => {
      if (res.ok) this.#handleFormSuccess()
      else this.#handleFormErrors(res)
    }).catch(() => {
      this.errorTarget.innerHTML = ERROR_MESSAGES.submitError
    })
  }

  #validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  }

  #validateFormData(data) {
    if (!this.#validatePresence([...data.values()])) {
      this.errorTarget.innerText = ERROR_MESSAGES.incompleteForm
      return false
    }

    if (!this.#validateEmail(data.get("email"))) {
      this.errorTarget.innerText = ERROR_MESSAGES.invalidEmail
      return false
    }

    if (!this.#validateMessage(data.get("message"))) {
      this.errorTarget.innerText = ERROR_MESSAGES.shortMessage
      return false
    }

    return true
  }

  #validateMessage(message) {
    return message.length > 50
  }

  #validatePresence(values) {
    return !values.includes("")
  }
}
