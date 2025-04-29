import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port: number = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/temperature', async (req: Request, res: Response) => {
  const { temperature, conversionDirection } = req.body
  const result =
    conversionDirection === 'celsiusToFahrenheit'
      ? (temperature * 9) / 5 + 32
      : ((temperature - 32) * 5) / 9
  res.send(
    `<div class="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p class="text-lg font-medium text-blue-600">
        ${temperature}°${conversionDirection === 'celsiusToFahrenheit' ? 'C' : 'F'} 
        <span class="text-gray-500 mx-2">→</span> 
        <span class="font-bold">${result.toFixed(2)}°${conversionDirection === 'celsiusToFahrenheit' ? 'F' : 'C'}</span>
      </p>
    </div>`,
  )
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
