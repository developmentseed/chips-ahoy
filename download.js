const fs = require('fs')
const qs = require('querystring');
const axios = require('axios')
let endpoint = process.argv[2]

const username = process.env.USER
const password = process.env.PASSWORD

const auth = {
  username, password
}

async function fetch(url) {
  const index = Object.values(qs.parse(url))[0] || 1
  const resp = await axios(url, { method: 'GET', auth })
  const data = resp.data
  fs.writeFileSync(`results${index}.json`, JSON.stringify(data))
  if (data.next) fetch(data.next)
}

fetch(endpoint)
