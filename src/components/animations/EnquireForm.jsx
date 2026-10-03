import { useEffect, useMemo, useRef, useState } from 'react'
import { getCountryCallingCode, getCountries } from 'libphonenumber-js'
import './EnquireForm.css'

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' })
const countries = getCountries()
  .map((country) => ({
    code: country,
    name: countryNames.of(country) || country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((first, second) => first.name.localeCompare(second.name))

const classes = ['Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII']

const states = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Other',
  'Pondicherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

const EnquireForm = ({ onClose }) => {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [country, setCountry] = useState('IN')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [consent, setConsent] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    dialog.showModal()
    closeButtonRef.current?.focus()

    return () => dialog.close()
  }, [])

  const fullPhoneNumber = useMemo(() => {
    const callingCode = getCountryCallingCode(country)
    return `+${callingCode}${phone.replace(/\D/g, '')}`
  }, [country, phone])

  const sendOtp = async () => {
    const endpoint = import.meta.env.VITE_ADMISSIONS_OTP_SEND_URL
    if (phone.replace(/\D/g, '').length < 6) {
      setMessage('Enter a valid phone number first.')
      return
    }
    if (!endpoint) {
      setMessage('OTP delivery is not configured. Connect the admissions SMS service to continue.')
      return
    }

    setIsSending(true)
    setMessage('')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber }),
      })
      if (!response.ok) throw new Error('Could not send the code. Please try again.')
      setOtpSent(true)
      setPhoneVerified(false)
      setMessage(`A verification code was sent to ${fullPhoneNumber}.`)
    } catch (error) {
      setMessage(error.message || 'Could not send the code. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const verifyOtp = async () => {
    const endpoint = import.meta.env.VITE_ADMISSIONS_OTP_VERIFY_URL
    if (!endpoint) {
      setMessage('OTP verification is not configured. Connect the admissions verification service to continue.')
      return
    }
    if (!/^\d{6}$/.test(otp)) {
      setMessage('Enter the 6-digit verification code.')
      return
    }

    setIsVerifying(true)
    setMessage('')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber, otp }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.verified) {
        throw new Error(result.message || 'That code could not be verified.')
      }
      setPhoneVerified(true)
      setMessage('Phone number verified.')
    } catch (error) {
      setPhoneVerified(false)
      setMessage(error.message || 'That code could not be verified.')
    } finally {
      setIsVerifying(false)
    }
  }

  const submitApplication = async (event) => {
    event.preventDefault()
    const endpoint = import.meta.env.VITE_ADMISSIONS_APPLICATION_URL
    if (!phoneVerified) {
      setMessage('Verify your phone number before continuing.')
      return
    }
    if (!endpoint) {
      setMessage('Application submission is not configured yet.')
      return
    }

    setIsSubmitting(true)
    setMessage('')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fullPhoneNumber,
          class: selectedClass,
          state: selectedState,
          consent,
          admissionYear: 2027,
        }),
      })
      if (!response.ok) throw new Error('Application could not be submitted. Please try again.')
      setMessage('Your application details have been submitted.')
    } catch (error) {
      setMessage(error.message || 'Application could not be submitted. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="admissions-dialog"
      aria-labelledby="admissions-heading"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <button
        ref={closeButtonRef}
        className="admissions-modal-close"
        type="button"
        aria-label="Close admissions form"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>
      <main className="admissions-page">
      <div className="admissions-layout">
        <section className="admissions-intro" aria-labelledby="admissions-heading">
          <p className="admissions-kicker">Tulas International School, Dehradun</p>
          <h1 id="admissions-heading">Admissions open 2027</h1>
          <p className="admissions-intro-copy">Applications are open for Classes IV to XII.</p>
          <div className="admissions-year" aria-hidden="true">2027</div>
        </section>

        <form className="admissions-form" onSubmit={submitApplication}>
          <div className="form-heading">
            <div>
              <p className="form-eyebrow">ADMISSIONS 2027</p>
              <h2>Start your application</h2>
            </div>
            <span className="required-note">* Required</span>
          </div>

          <div className="form-field">
            <label htmlFor="admission-phone">Mobile number <span>*</span></label>
            <div className="phone-entry">
              <select
                aria-label="Country calling code"
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value)
                  setOtpSent(false)
                  setPhoneVerified(false)
                  setMessage('')
                }}
              >
                {countries.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name} (+{option.callingCode})
                  </option>
                ))}
              </select>
              <input
                id="admission-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="Phone number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                  setOtpSent(false)
                  setPhoneVerified(false)
                  setMessage('')
                }}
                required
              />
              <button className="form-button form-button-secondary" type="button" onClick={sendOtp} disabled={isSending}>
                {isSending ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="admission-otp">Verification code <span>*</span></label>
            <div className="otp-entry">
              <input
                id="admission-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="6-digit code"
                maxLength={6}
                pattern="[0-9]{6}"
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={!otpSent || phoneVerified}
                required
              />
              <button
                className="form-button form-button-secondary"
                type="button"
                onClick={verifyOtp}
                disabled={!otpSent || phoneVerified || isVerifying}
              >
                {phoneVerified ? 'Verified' : isVerifying ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
            <p className="form-hint">Use the code sent to your mobile number.</p>
          </div>

          <div className="form-select-row">
            <div className="form-field">
              <label htmlFor="admission-class">Select class <span>*</span></label>
              <select id="admission-class" value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)} required>
                <option value="" disabled>Select class</option>
                {classes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="admission-state">Select state <span>*</span></label>
              <select id="admission-state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)} required>
                <option value="" disabled>Select state</option>
                {states.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <label className="consent-row">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>I agree to receive information regarding my submitted application from Tulas International School, Dehradun.</span>
          </label>

          <p className="form-status" role="status" aria-live="polite">{message}</p>

          <button className="form-button form-button-primary" type="submit" disabled={!phoneVerified || !consent || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Continue application'}
          </button>
          <p className="form-footnote">For Classes IV-XII · Academic year 2027</p>
        </form>
      </div>
      </main>
    </dialog>
  )
}

export default EnquireForm
