import axios from 'axios'

const BASE_URL = 'https://rest.coinapi.io/'

function sendRequest (path, params, key) {
  let config = {
    baseURL: BASE_URL,
    headers: {
      'X-CoinAPI-key': key,
      'Accept': 'application/json'
      // 'Accept-Encoding': 'deflate, gzip'
    },
    params,
    validateStatus: status => status == 200
  }
  return axios.get(path, config)
}

function getDateTime(datetime) {
  if (typeof datetime == 'string') {
    return datetime
  } else if (typeof datetime == 'object' && typeof datetime.toISOString == 'function') {
    return datetime.toISOString()
  } else {
    return (new Date()).toISOString()
  }
}

async function getRate (asset_id_base, asset_id_quote, datetime, key) {
  try {
    let path = "/v1/exchangerate/" + asset_id_base + "/" + asset_id_quote
    let params = {}
    params.time = getDateTime(datetime)
    let result = await sendRequest(path, params, key)
    return result.data

  } catch (err) {
    return null
  }
};

export { getRate }
