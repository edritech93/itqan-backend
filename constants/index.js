const PRIVATE_KEY = 'BALILA@@2021'
const TIME_AGE_ACCESS_TOKEN = '1d'
const TIME_AGE_REFRESH_TOKEN = '7d'
const DATA_NOT_FOUND = 'Data Tidak Ditemukan'
const INPUT_FAILED = 'Input Data Gagal'
const DATA_ALREADY_HAVE = 'Data Sudah Ada, silahkan menggunakan data lain'

const ORDER_STATUS = [
  {
    id: 0,
    text: 'Dipesan'
  },
  {
    id: 1,
    text: 'Diproses'
  },
  {
    id: 2,
    text: 'Dikirim'
  },
  {
    id: 3,
    text: 'Diterima'
  }
]

const WEB_API = 'AAAAqJfuDQo:APA91bFsNfTA7QlvaBxpCZB2Wwu5WlSE9c_xYOnIzaGzYA4UirKsu3qcFx9TJNgP0AIDOkFfCGYd76zSEKB6JtQ1buthPAFWVvUWmZb7t5Aq8-8EliKE4nMN6S7oI_kSMYnP5_zSEraX'

const CHANNEL = {
  CHAT_ADD: 'CHAT_ADD',
  CHAT_GET: 'CHAT_GET',
  CHAT_MESSAGE_ADD: 'CHAT_MESSAGE_ADD',
  CHAT_MESSAGE_GET: 'CHAT_MESSAGE_GET'
}

module.exports = {
  PRIVATE_KEY,
  TIME_AGE_ACCESS_TOKEN,
  TIME_AGE_REFRESH_TOKEN,
  DATA_NOT_FOUND,
  INPUT_FAILED,
  ORDER_STATUS,
  WEB_API,
  CHANNEL,
  DATA_ALREADY_HAVE
}
