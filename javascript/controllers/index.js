import { application } from "./application.js"

import AosController from "./aos_controller"
application.register("aos", AosController)

import BlobController from "./blob_controller.js"
application.register("blob", BlobController)

import ContactFormController from "./contact_form_controller.js"
application.register("contact-form", ContactFormController)

import GalleryController from "./gallery_controller.js"
application.register("gallery", GalleryController)

import NavigationController from "./navigation_controller.js"
application.register("navigation", NavigationController)
