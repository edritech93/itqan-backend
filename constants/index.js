const PRIVATE_KEY = 'ITQAN@123qwe'
const TIME_AGE_ACCESS_TOKEN = '1d'
const TIME_AGE_REFRESH_TOKEN = '7d'
const DATA_NOT_FOUND = 'Data Tidak Ditemukan'
const INPUT_FAILED = 'Input Data Gagal'
const DATA_ALREADY_HAVE = 'Data Sudah Ada, silahkan menggunakan data lain'
const TYPE_TRANSACTION = [
  {
      id: 0,
      text: 'Setoran'
  },
  {
      id: 1,
      text: 'Penarikan'
  },
]

const ALL_DATA = {
  id: 999,
  text: 'Semua'
}

module.exports = {
  PRIVATE_KEY,
  TIME_AGE_ACCESS_TOKEN,
  TIME_AGE_REFRESH_TOKEN,
  DATA_NOT_FOUND,
  INPUT_FAILED,
  DATA_ALREADY_HAVE,
  TYPE_TRANSACTION,
  ALL_DATA
}
