import { useState } from 'react'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { ShieldCheck, Loader2 } from 'lucide-react'

/**
 * Razorpay Standard Web Checkout Button Component
 * Integrates Razorpay modal checkout workflow
 */
export default function RazorpayCheckoutButton({
  amount = 100000, // in paise (e.g. 100000 = ₹1,000)
  currency = 'INR',
  name = 'MIVEXO Academy',
  description = 'All-Inclusive Pass Enrollment',
  prefill = {},
  buttonText = 'Pay with Razorpay — ₹1,000',
  className = 'btn-primary',
  onSuccess,
  onFailure
}) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    // Check if Razorpay SDK script is loaded
    if (!window.Razorpay) {
      toast.error('Razorpay SDK failed to load. Please check your network connection.')
      return
    }

    setLoading(true)

    try {
      // STEP 1: Call Backend to Create Order
      const orderRes = await api.post('/api/create-order', {
        amount,
        currency,
        receipt: `rcpt_${Date.now()}`
      })

      const orderData = orderRes.data
      const orderId = orderData.order_id || orderData.id || orderData.data?.orderId
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.key

      if (!orderId) {
        throw new Error('Order creation failed: No order_id returned from server')
      }

      // STEP 2: Configure Razorpay Checkout Modal Options
      const options = {
        key: keyId,
        amount: orderData.amount || amount,
        currency: orderData.currency || currency,
        name: name,
        description: description,
        order_id: orderId,
        handler: async (response) => {
          // STEP 3: Send verification payload to backend
          try {
            setLoading(true)
            const verifyRes = await api.post('/api/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            if (verifyRes.data.success) {
              toast.success('Payment verified successfully! 🚀')
              if (onSuccess) {
                onSuccess({
                  ...response,
                  ...verifyRes.data
                })
              }
            } else {
              toast.error(verifyRes.data.message || 'Signature verification failed.')
              if (onFailure) onFailure(verifyRes.data)
            }
          } catch (vErr) {
            const errMsg = vErr.response?.data?.message || 'Payment signature verification failed on server.'
            toast.error(errMsg)
            if (onFailure) onFailure(vErr)
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: prefill.name || '',
          email: prefill.email || '',
          contact: prefill.phone || ''
        },
        theme: {
          color: '#6C3EF4'
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            toast('Payment cancelled by user', { icon: 'ℹ️' })
          }
        }
      }

      const rzp = new window.Razorpay(options)

      // Handle payment failure event
      rzp.on('payment.failed', (response) => {
        setLoading(false)
        const errMsg = response.error?.description || 'Payment failed. Please try again.'
        toast.error(errMsg)
        if (onFailure) onFailure(response.error)
      })

      // Open Razorpay Checkout Modal
      rzp.open()
    } catch (err) {
      setLoading(false)
      const errorMsg = err.response?.data?.message || err.message || 'Failed to initialize payment'
      toast.error(errorMsg)
      if (onFailure) onFailure(err)
    }
  }

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Opening Checkout...</span>
        </>
      ) : (
        <>
          <ShieldCheck size={18} />
          <span>{buttonText}</span>
        </>
      )}
    </button>
  )
}
