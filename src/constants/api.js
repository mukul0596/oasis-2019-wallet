// import { WALLET_TOKEN } from "@/.env"

//Routes
const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const API_BASE = proxyurl + "https://wallet.bits-oasis.org"
// export const API_BASE = proxyurl + "http://test.bits-apogee.org/2019"
// export const API_BASE = proxyurl + "https://bits-apogee.org/2019"
export const API_ROOT = `${API_BASE}/wallet`
export const TICKET_MANAGER = `${API_BASE}/tickets-manager`
export const KIND_STORE = `${API_BASE}/kind-store/items`

export const LOGIN = `${API_ROOT}/auth`
export const REFRESH_QR = `${API_ROOT}/auth/qr-code/refresh`

export const GET_VENDORS = `${API_ROOT}/vendors/`

export const GET_ORDERS = `${API_ROOT}/orders/`
export const PLACE_ORDER = `${API_ROOT}/orders/`
export const MAKE_OTP_SEEN = `${API_ROOT}/orders/make_otp_seen`

export const ADD_MONEY = `${API_ROOT}/monetary/add/swd`
export const TRANSFER_MONEY = `${API_ROOT}/monetary/transfer`

export const GET_MY_PROFSHOWS = `${TICKET_MANAGER}/tickets`
export const GET_ALL_PROFSHOWS = `${TICKET_MANAGER}/shows`
export const BUY_TICKETS = `${TICKET_MANAGER}/signup`

export const ANALYTICS = `${API_ROOT}/analytics/webapp`

//Wallet
const WALLET_TOKEN = "ec123dac-339b-41ba-bca4-d3cab464083d";
export { WALLET_TOKEN };

//LocalStorage Key
export const LOCALSTORAGE_LOGIN = "apooge-login"
