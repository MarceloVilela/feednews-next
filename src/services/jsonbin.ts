/* eslint-disable prettier/prettier */
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': String(process.env.NEXT_PUBLIC_JSON_BIN_KEY),
  //'X-Master-Key': "$2b$10$TDr4Pj4K1pQL2omdZyKC3uJw5O3pX/.dcNhFDr1iXSxMe/sOEaL.2",
};

/**
 * https://jsonbin.io/api-reference/bins/get-started
 */
const jsonbin = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/',
  headers
})

export default jsonbin;