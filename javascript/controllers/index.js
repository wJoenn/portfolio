import { application } from "./application.js"

import BlobController from "./blob_controller.js"
application.register("blob", BlobController)

import NavigationController from "./navigation_controller.js"
application.register("navigation", NavigationController)
