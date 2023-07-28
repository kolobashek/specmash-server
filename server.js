// server.js

import app from './src/app.js'

const port = 3000

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})
