const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const fs = require("fs")
const path = require("path")

const ROOT = __dirname
const USER = "kringe"
const PASS = "rizzler"
const SECRET = "swiggleswaggle_riggleraggle_gyat555_111"

const PAGE404 = ROOT + "/404.html"

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())

function validToken(req) {
    let token = req.cookies.token
    return token == SECRET
}

function getManifest() {
    let manifest = fs.readFileSync(ROOT + "/manifest.txt")
    return manifest
}

app.use("/files", (req, res, next) => {
    if (!validToken(req)) {
        res.sendStatus(403)
        return
    }
    next()
})

app.use("/files", express.static(ROOT + "/www/files"))

app.get("/", (req, res) => {
    res.sendFile(ROOT + "/index.html")
})

app.get("/manifest", async (req, res) => {
    if (!validToken(req)) {
        res.sendStatus(404)
        return false
    }

    res.send(getManifest())
})

app.post("/", (req, res) => {
    let body = req.body
    let password = body.password
    let username = body.username

    if (validToken(req) || (password == PASS && username == USER)) {
        res.cookie("token", SECRET)
        res.sendStatus(200)
    }

    res.sendStatus(403)
})

const PORT = 8080
app.listen(PORT, (err) => {
    console.log("[+] Running webserver on port " + PORT)
})