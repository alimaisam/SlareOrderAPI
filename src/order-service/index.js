import Store from './store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db }) {
  const store = Store(db)
  const model = Model({ store })
  const route = Route(model)

  router
    .post('/create', route.createOrder)
    .put('/status/:id', route.updateOrderStatus)
    .put('/cancel/:id', route.cancelOrder)
    .get('/status/:id', route.getOrderStatus)

  return router
}

export default (options) => {
  return {
    basePath: '/orders',
    info: {
      name: 'Order Service',
      service: 'Order',
      version: '1.0.0',
      description: 'Endpoint for order service',
      paths: {
        createOrder: {
          method: 'POST',
          path: '/orders/create'
        },
        cancelOrder: {
            method: 'PUT',
            path: '/orders/cancel/:id'
        },
        getStatus: {
          method: 'GET',
          path: '/orders/status/:id'
        },
        
      }
    },
    route: Service(options)
  }
}