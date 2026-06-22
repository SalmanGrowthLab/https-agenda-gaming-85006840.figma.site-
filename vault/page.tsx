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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    minHeight: 52,
    borderRadius: 18,
    border: '1px solid rgba(15, 23, 42, 0.14)',
    padding: '14px 16px',
    fontSize: 16,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 18px',
    borderRadius: 9999,
    border: 'none',
    background: '#111827',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.01em',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
  }

  const labelStyle: React.CSSProperties = {
    display: 'grid',
    gap: 8,
    fontSize: 14,
    color: '#475569',
    fontWeight: 600,
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
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 560, margin: '0 auto', padding: '40px 24px', color: '#0f172a' }}>
      <div style={{ marginBottom: 34, textAlign: 'center' }}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: 12, color: '#64748b', fontWeight: 700 }}>
          Luxury Vault Access
        </p>
        <h1 style={{ margin: '16px 0 0', fontSize: 42, lineHeight: 1.05, fontWeight: 800 }}>
          Reserve your exclusive digital growth suite
        </h1>
        <p style={{ margin: '18px auto 0', maxWidth: 420, fontSize: 17, lineHeight: 1.7, color: '#475569' }}>
          Complete the form to request a curated entry into the high-ticket Vault experience.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: 18 }}>
        <label style={labelStyle}>
          Full name
          <input style={inputStyle} value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
        </label>

        <label style={labelStyle}>
          Business email
          <input style={inputStyle} type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
        </label>

        <label style={labelStyle}>
          Phone number
          <input style={inputStyle} value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
        </label>

        <label style={labelStyle}>
          Country / region
          <input style={inputStyle} value={countryInput} onChange={(e) => setCountryInput(e.target.value)} />
        </label>

        <button type="submit" style={buttonStyle}>
          Request Access
        </button>
      </form>

      {isSuccess && (
        <div style={{ marginTop: 28, padding: 18, borderRadius: 18, background: '#111827', color: '#fff', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)' }}>
          <strong>Success!</strong> Your reservation request has been submitted and is being reviewed.
        </div>
      )}

      {errorMessage && (
        <div style={{ marginTop: 28, padding: 18, borderRadius: 18, background: '#7f1d1d', color: '#fff', boxShadow: '0 20px 40px rgba(112, 26, 26, 0.16)' }}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  )
}

export default VaultPage
