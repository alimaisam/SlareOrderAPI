export function Err (res) {
    return ({ message, code }) => {
      const data = {
        code,
        error: message
      }
      res.status(400).json(data)
    }
  }
  
export function Ok (res) {
  return (body) => {
    const data = {
      data: body
    }
    res.status(200).json(data)
  }
}

export function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}