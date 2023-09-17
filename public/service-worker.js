/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  console.log("📜 LOG > self.addEventListener install> event:", event)
  // Cached assets logic
})

// self.addEventListener("fetch", (event) => {
//   console.log("📜 LOG > self.addEventListener fetch> event:", event)
//   // Fetching logic
// })

self.addEventListener("push", (event) => {
  console.log("📜 LOG > self.addEventListener push> event:", event)
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
    // other options
  })
})
