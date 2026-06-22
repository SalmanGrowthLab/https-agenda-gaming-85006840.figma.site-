import { FormEvent, useState } from 'react'
import { sendVaultNotification } from '../utils/emailService'

const VaultPage = () => {
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formatError = (value: unknown) => {
    if (value instanceof Error) return value.message
    if (typeof value === 'string') return value
    try {
      return JSON.stringify(value, Object.getOwnPropertyNames(value), 2)
    } catch {
      return String(value)
    }
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSuccess(false)

    try {
      const success = await sendVaultNotification({
        type: 'Vault Reservation',
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        country: countryInput,
        message: 'User requested custom entry parameters to the Luxury Vault.',
        toEmail: 'salmanmaseed2168@gmail.com',
        toName: 'Salman Maseed',
      })

      if (!success) {
        throw new Error('EmailJS did not return a successful status.')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Vault reservation send failed:', error)
      setErrorMessage(formatError(error))
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 540, margin: '0 auto', padding: 24 }}>
      <h1>Luxury Vault Reservation</h1>
      <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
        </label>

        <label>
          Phone
          <input value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
        </label>

        <label>
          Country
          <input value={countryInput} onChange={(e) => setCountryInput(e.target.value)} />
        </label>

        <button type="submit">Reserve Access</button>
      </form>

      {isSuccess && (
        <div style={{ marginTop: 24, padding: 16, background: '#0f172a', color: '#fff' }}>
          <strong>Success!</strong> Your Vault Reservation request has been sent.
        </div>
      )}

      {errorMessage && (
        <div style={{ marginTop: 24, padding: 16, background: '#7f1d1d', color: '#fff' }}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  )
}

export default VaultPage
