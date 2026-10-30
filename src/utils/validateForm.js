export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone) {
  return phone.replace(/\D/g, '').length >= 10
}

export function validatePassword(password) {
  if (!password || password.length < 8) return false
  return /[A-Za-z]/.test(password) && /\d/.test(password)
}

export function validatePasswordMatch(password, confirm) {
  return password === confirm && confirm.length > 0
}
