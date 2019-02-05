import request from 'request-promise'

export default function Store (db) {
  // When calling external services, prefix the function with fetch
  // e.g. When calling food service
  // async function fetchFood () {
  //  return request('http://localhost:3000/foods/1')
  // }

  // one, all, create, update, delete, count, search is reserved for DB only operation
  async function one (id) {
    const [rows] = await db.query('SELECT * FROM `Order` WHERE id = ?', [id])
    return (rows && rows[0]) || null
  }

  async function all () {
    const [rows] = await db.query('SELECT * from `Order`')
    return rows
  }

  async function create ({ name, status, amount }) {
    const [rows] = await db.query('INSERT INTO `Order` (name, status, amount, user_id) VALUES (?, ?, ?, 2)', [name, status, amount])
    return rows
  }

  async function updateStatus ( id, status ) {
    const [rows] = await db.query('UPDATE `Order` SET status = ? WHERE id = ?', [status, id])
    return rows
  }

  async function getStatus (id) {
    const [rows] = await db.query('SELECT status FROM `Order` WHERE id = ?', [id])
    return (rows && rows[0]) || null
  }

  async function processPayment (recordId) {
    const options = {
      method: 'POST',
      uri: 'http://localhost:5002/payment/process',
      json: true,
      forever: true,
      body: {
        data: { orderId: recordId }
      }
    }

    const response = await request(options)
    return response
  }

  return {
    one,
    all,
    create,
    updateStatus,
    getStatus,
    processPayment
  }
}