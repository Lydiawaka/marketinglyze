// Email verification utilities with confidence scoring
export interface EmailVerificationResult {
  email: string
  isValid: boolean
  confidence: number
  checks: {
    syntax: boolean
    domain: boolean
    mxRecord: boolean
    smtpCheck: boolean
    disposable: boolean
  }
  reason?: string
}

export interface EmailCandidate {
  email: string
  firstName: string
  lastName: string
  company: string
  domain: string
  role: string
  source: string
}

// Common email patterns for generating candidates
const EMAIL_PATTERNS = [
  "{first}.{last}@{domain}",
  "{first}{last}@{domain}",
  "{first}@{domain}",
  "{last}@{domain}",
  "{first_initial}{last}@{domain}",
  "{first}{last_initial}@{domain}",
  "{first_initial}.{last}@{domain}",
  "{first}.{last_initial}@{domain}",
]

// Disposable email domains to filter out
const DISPOSABLE_DOMAINS = ["10minutemail.com", "tempmail.org", "guerrillamail.com", "mailinator.com", "temp-mail.org"]

export function generateEmailCandidates(
  firstName: string,
  lastName: string,
  domain: string,
  company: string,
  role: string,
): EmailCandidate[] {
  const candidates: EmailCandidate[] = []

  const first = firstName.toLowerCase().replace(/[^a-z]/g, "")
  const last = lastName.toLowerCase().replace(/[^a-z]/g, "")
  const firstInitial = first.charAt(0)
  const lastInitial = last.charAt(0)

  EMAIL_PATTERNS.forEach((pattern) => {
    const email = pattern
      .replace("{first}", first)
      .replace("{last}", last)
      .replace("{first_initial}", firstInitial)
      .replace("{last_initial}", lastInitial)
      .replace("{domain}", domain)

    candidates.push({
      email,
      firstName,
      lastName,
      company,
      domain,
      role,
      source: "generated",
    })
  })

  return candidates
}

export function validateEmailSyntax(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase()
  return DISPOSABLE_DOMAINS.includes(domain)
}

export async function checkMXRecord(domain: string): Promise<boolean> {
  try {
    // In a real implementation, this would use DNS lookup
    // For demo purposes, we'll simulate the check
    const commonDomains = ["gmail.com", "outlook.com", "yahoo.com", "company.com"]
    return commonDomains.some((d) => domain.includes(d)) || Math.random() > 0.2
  } catch (error) {
    return false
  }
}

export async function performSMTPCheck(email: string): Promise<boolean> {
  try {
    // In a real implementation, this would connect to SMTP server
    // For demo purposes, we'll simulate the check
    await new Promise((resolve) => setTimeout(resolve, 100))
    return Math.random() > 0.3 // 70% success rate simulation
  } catch (error) {
    return false
  }
}

export async function verifyEmail(email: string): Promise<EmailVerificationResult> {
  const checks = {
    syntax: validateEmailSyntax(email),
    domain: false,
    mxRecord: false,
    smtpCheck: false,
    disposable: !isDisposableEmail(email),
  }

  if (checks.syntax) {
    const domain = email.split("@")[1]
    checks.domain = domain.length > 0

    if (checks.domain) {
      checks.mxRecord = await checkMXRecord(domain)

      if (checks.mxRecord) {
        checks.smtpCheck = await performSMTPCheck(email)
      }
    }
  }

  // Calculate confidence score
  let confidence = 0
  if (checks.syntax) confidence += 20
  if (checks.domain) confidence += 15
  if (checks.mxRecord) confidence += 25
  if (checks.smtpCheck) confidence += 30
  if (checks.disposable) confidence += 10

  const isValid = checks.syntax && checks.domain && checks.mxRecord && checks.disposable

  let reason = ""
  if (!checks.syntax) reason = "Invalid email syntax"
  else if (!checks.domain) reason = "Invalid domain"
  else if (!checks.mxRecord) reason = "No MX record found"
  else if (!checks.smtpCheck) reason = "SMTP check failed"
  else if (!checks.disposable) reason = "Disposable email detected"

  return {
    email,
    isValid,
    confidence,
    checks,
    reason: reason || undefined,
  }
}

export async function verifyEmailBatch(emails: string[]): Promise<EmailVerificationResult[]> {
  const results = await Promise.all(emails.map((email) => verifyEmail(email)))

  return results.sort((a, b) => b.confidence - a.confidence)
}
