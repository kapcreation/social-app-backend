import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'db4free.net',
  port: '3306',
  user: 'kap_7603',
  password: 'ht3A8fvkbaULAh#',
  database: 'social_app_7603'
})