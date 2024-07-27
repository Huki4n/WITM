

import express from "express";
import path from "path";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const staticPath = './frontend/build';

const dataGetter = async () => {
  const response = await fetch('https://api.weather.yandex.ru/v2/forecast?lat=54.574113&lon=35.446871', {
    method: 'GET',
    headers: {
      'X-Yandex-Weather-Key': process.env.REACT_APP_WEATHER_API_KEY
    },
  });
  return await response.json();
};

const app = express();

app.use(express.static(path.join(process.cwd(), staticPath)));

app.get('/', (request, response) => {
  response.sendFile(path.join(process.cwd(), staticPath,'index.html'));
});

app.get('/api', async (request, response) => {
  const data = await dataGetter();
  response.json({data});
});

app.listen(PORT,() => {
  console.log(`server starting on port ${PORT}`);
});