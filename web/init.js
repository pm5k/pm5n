import { app } from "../../scripts/app.js"
import Main from "./ui/main.es.js"


const EXTENSION_NAME = "PM5N.PromptManager"

const init = async (app) => {
    console.log("[logging]", "extension init")

    const style = document.createElement("link")
    const ui_mount = document.createElement("div")

    ui_mount.id = "p5n-ui"
    style.rel = "stylesheet"
    style.href = new URL("ui/style.css", import.meta.url)

    document.head.appendChild(style)
    document.body.appendChild(ui_mount)

    new Main({
        target: document.getElementById("p5n-ui"),
    })
}

const setup = async (app) => {
    console.log("[logging]", "extension setup")


}

app.registerExtension({ name: EXTENSION_NAME, init, setup })
