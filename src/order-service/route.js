import { Ok, Err } from '../helper'

export default function Route (model) {
  // GET /orders/:id
  // Description: Get order by id
  async function getOrder (req, res) {
    try {
      const result = await model.one(req.params)
      Ok(res)(result)
    } catch (error) {
      Err(res)(error)
    }
  }

  // GET /orders
  // Description: Get an array of orders
  async function getOrders (req, res) {
    try {
      const result = await model.all()
      Ok(res)(result)
    } catch (error) {
      Err(res)(error)
    }
  }

  // PUT /order/:id
  // Description: Update order status by id
  async function updateOrderStatus (req, res) {
      try {
          const result = await model.updateStatus(req.params, req.body)
          Ok(res)(result)
      } catch (error) {
          Err(res)(error)
      }
  }

  async function createOrder (req, res) {
      try {
        const result = await model.create(req.body)
        Ok(res)(result)
      } catch (error) {
        Err(res)(error)
      }
  }

  async function getOrderStatus (req, res) {
    try {
        const result = await model.getStatus(req.params)
        Ok(res)(result)
      } catch (error) {
        Err(res)(error)
      }
  }

  async function cancelOrder (req, res) {
    try {
        const result = await model.updateStatus(req.params, 'cancelled')
        Ok(res)(result)
    } catch (error) {
        Err(res)(error)
    }
  }
  
  return {
    getOrder,
    getOrders,
    createOrder,
    updateOrderStatus,
    getOrderStatus,
    cancelOrder
  }
}