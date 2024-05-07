let lastId = 8

export function generateId() {
  const currentTime = Date.now().toString().slice(-3)
  const id = (currentTime + lastId.toString()).slice(-6)

  lastId += 1

  return id
}
