const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { prompt, width, height } = req.body;
  try {
    const response = await fetch('https://api.flux.1.dev/stablediffusion/1.5-txt2img', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BFL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, width, height })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('代理服务器错误:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 代理服务器运行中，端口 ${PORT}`);
});
