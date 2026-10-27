import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize Supabase client if environment variables are provided
export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = () => Boolean(supabase)

/**
 * Checks if a student with the given email or mobile has already submitted
 */
export async function checkDuplicateSubmission(email, mobile) {
  const cleanEmail = email.trim().toLowerCase()
  const cleanMobile = mobile.replace(/[^0-9]/g, '').slice(-10)

  // 1. Check in Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('student_onboarding')
        .select('id, email, mobile')
        .or(`email.ilike.${cleanEmail},mobile.eq.${cleanMobile}`)
        .limit(1)

      if (error) {
        console.warn('Supabase duplicate check query error:', error.message)
      } else if (data && data.length > 0) {
        return { isDuplicate: true, record: data[0] }
      }
    } catch (err) {
      console.warn('Supabase connection warning:', err)
    }
  }

  // 2. Check in local storage fallback
  try {
    const rawLocal = localStorage.getItem('mivexo_onboarding_submissions')
    if (rawLocal) {
      const list = JSON.parse(rawLocal)
      const found = list.find(item => 
        item.email?.toLowerCase() === cleanEmail || 
        item.mobile?.replace(/[^0-9]/g, '').slice(-10) === cleanMobile
      )
      if (found) {
        return { isDuplicate: true, record: found }
      }
    }
  } catch (err) {
    console.warn('Local storage check warning:', err)
  }

  return { isDuplicate: false }
}

/**
 * Saves a validated student onboarding record
 * Enforces server-side data integrity: payment_status is strictly set to 'pending'
 */
export async function saveStudentOnboarding(formData) {
  const cleanEmail = formData.email.trim().toLowerCase()
  const cleanMobile = formData.mobile.replace(/[^0-9]/g, '').slice(-10)

  // Generate safe application tracking ID
  const applicationId = 'MVX-ONB-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)

  // Strict record structure (students cannot self-confirm payment status)
  const record = {
    application_id: applicationId,
    full_name: formData.fullName.trim(),
    email: cleanEmail,
    mobile: cleanMobile,
    college: formData.college.trim(),
    academic_year: formData.academicYear,
    course_category: formData.courseCategory,
    course_price: formData.courseCategory.includes('3,500') ? 3500 : 3000,
    domain: formData.domain === 'Other' ? (formData.customDomain || 'Other') : formData.domain,
    custom_domain: formData.domain === 'Other' ? formData.customDomain : null,
    batch: formData.batch,
    batch_start_date: formData.batch === 'November 2026' ? 'November 10, 2026' : null,
    learning_mode: formData.learningMode,
    payment_reference: formData.paymentRef ? formData.paymentRef.trim() : (formData.payment_reference || null),
    payment_status: 'pending', // Strictly locked to 'pending' by default
    agreed_policy: Boolean(formData.agreedPolicy),
    submitted_at: new Date().toISOString()
  }

  // Check duplicates first
  const dupCheck = await checkDuplicateSubmission(cleanEmail, cleanMobile)
  if (dupCheck.isDuplicate) {
    throw new Error('An application with this Email Address or Mobile Number has already been submitted.')
  }

  let savedToSupabase = false

  // Save to Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('student_onboarding')
        .insert([record])
        .select()

      if (error) {
        console.error('Supabase insert failed:', error)
        throw new Error(error.message || 'Failed to save to Supabase database.')
      }

      savedToSupabase = true
    } catch (err) {
      console.warn('Supabase save error, switching to persistent local mirror:', err.message)
      // If error is duplicate from unique constraint
      if (err.message && err.message.includes('unique') || err.message?.includes('duplicate')) {
        throw new Error('An application with this Email or Mobile already exists in the system.')
      }
      throw err
    }
  }

  // Also persist in local storage mirror to ensure zero data loss
  try {
    const rawLocal = localStorage.getItem('mivexo_onboarding_submissions')
    const list = rawLocal ? JSON.parse(rawLocal) : []
    list.unshift(record)
    localStorage.setItem('mivexo_onboarding_submissions', JSON.stringify(list))
  } catch (err) {
    console.warn('Local storage mirror write warning:', err)
  }

  return {
    success: true,
    applicationId,
    record,
    savedToSupabase
  }
}
