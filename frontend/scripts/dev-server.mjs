import { spawn } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const appDir = path.join(root, "app")

function pages(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) pages(full, found)
    else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) found.push(full)
  }
  return found
}

function routes() {
  const list = []
  for (const file of pages(appDir)) {
    const rel = path.relative(appDir, path.dirname(file)).replace(/\\/g, "/")
    const pattern = rel === "" ? "/" : `/${rel}`
    if (pattern.includes("[role]")) {
      list.push(pattern.replace("[role]", "accountant"))
      list.push(pattern.replace("[role]", "headmaster"))
    } else {
      list.push(pattern)
    }
  }
  return [...new Set(list)]
}

async function ready() {
  for (let attempt = 0; attempt < 90; attempt += 1) {
    try {
      const response = await fetch("http://localhost:3000/", { redirect: "manual" })
      if (response) return
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  throw new Error("Dev server did not start")
}

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next")
const child = spawn(process.execPath, [nextBin, "dev", "--turbopack"], {
  cwd: root,
  stdio: "inherit",
})

child.on("exit", (code) => process.exit(code ?? 0))

ready()
  .then(async () => {
    const list = routes()
    console.log(`Warming ${list.length} pages so clicks do not wait on a compile.`)
    for (const route of list) {
      const started = Date.now()
      try {
        await fetch(`http://localhost:3000${route}`, { redirect: "manual" })
        console.log(`ready ${route} ${Date.now() - started}ms`)
      } catch (error) {
        console.log(`skipped ${route} ${error.message}`)
      }
    }
    console.log("All pages are ready.")
  })
  .catch((error) => console.error(error.message))
