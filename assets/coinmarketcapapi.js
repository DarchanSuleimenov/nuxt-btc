import axios from 'axios'

const BASE_URL = 'https://api.coinmarketcap.com/'
var usd_id = null

function sendRequest (path, params) {
  let config = {
    baseURL: BASE_URL,
    params
  }
  return axios.get(path, config)
}

async function getList () {
  try {
    let path = "/v2/listings/"
    let params = {}
    let result = await sendRequest(path, params)
    let id = result.data.data.find(el => el.symbol === "BTC")
    if (id) { id = id.id }
    else { id = null }
    return id

  } catch (err) {
    return null
  }
};

async function getCurrentRate () {
  try {
    if (usd_id === null) {
      let id = await getList()
      usd_id = id
    }
    if (usd_id === null) throw("Криптовалюта BTC не найдена в списке поддерживаемых криптовалют")
    let path = "/v2/ticker/" + usd_id + "/"
    let params = {}
    let result = await sendRequest(path, params)
    return result.data.data.quotes["USD"].price

  } catch (err) {
    console.error(err)
    return null
  }
};

export { getCurrentRate }
