import { sleep } from '../helper'

export default function Model ({ store }) {
    async function one (params) {
      return store.one(params.id)
    }
  
    async function all () {
      return store.all()
    }
  
    async function create ({ name, status, amount }) {
      // Make params explicit
      const params = { name, status, amount }
      const createdRecord = await store.create(params)
      const payment = await store.processPayment(createdRecord.insertId)
      if (payment.payment_status === 'confirmed') {
        await store.updateStatus(payment.order_id, 'confirmed')
        // await store.updateStatus(payment.order_id, 'delivered')
        // console.log('delivered')
        const orderStatus = await store.one(payment.order_id)
        return {
          name: orderStatus.name,
          amount: orderStatus.amount,
          status: orderStatus.status
        }
      } else {
        await store.updateStatus(payment.order_id, 'cancelled')
        const orderStatus = await store.one(payment.order_id)
        
        return {
          name: orderStatus.name,
          amount: orderStatus.amount,
          status: orderStatus.status
        }
      }
    }

    async function updateStatus (params, status) {
      return store.updateStatus(params.id, status)
    }

    async function getStatus (params) {
      return store.getStatus(params.id)
    }

    return {
      one,
      all,
      create,
      updateStatus,
      getStatus
    }
  }