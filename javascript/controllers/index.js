import { application } from "./application.js"

import AosController from "./aos_controller"
application.register("aos", AosController)

import BlobController from "./blob_controller.js"
application.register("blob", BlobController)

import NavigationController from "./navigation_controller.js"
application.register("navigation", NavigationController)
