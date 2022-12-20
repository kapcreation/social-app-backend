import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'db4free.net',
  port: '3306',
  user: 'kap_7603',
  password: 'ht3A8fvkbaULAh#',
  database: 'social_app_7603'
})