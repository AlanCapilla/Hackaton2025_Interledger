// Base de datos simple en memoria
const users = [
  { id: 1, name: 'Usuario1', balance: 1000, walletId: 'wallet1' },
  { id: 2, name: 'Usuario2', balance: 500, walletId: 'wallet2' }
]

function getUser(id) {
  return users.find(u => u.id === id)
}

function updateBalance(id, amount) {
  const user = getUser(id)
  if (user) user.balance += amount
}

module.exports = { users, getUser, updateBalance }
