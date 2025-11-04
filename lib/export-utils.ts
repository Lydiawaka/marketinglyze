interface ExportData {
  name: string
  company: string
  role: string
  industry: string
  location: string
  email: string
  emailConfidence: number
  emailValid: boolean
  relevanceScore: number
  aiIndustry?: string
  aiRole?: string
  companyType?: string
  seniority?: string
  linkedinUrl: string
  bio?: string
}

export function convertToCSV(data: ExportData[]): string {
  if (data.length === 0) return ""

  const headers = [
    "Name",
    "Company",
    "Role",
    "Industry",
    "Location",
    "Email",
    "Email Confidence (%)",
    "Email Valid",
    "Relevance Score (%)",
    "AI Industry Category",
    "AI Role Category",
    "Company Type",
    "Seniority Level",
    "LinkedIn URL",
    "Bio",
  ]

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        `"${row.name}"`,
        `"${row.company}"`,
        `"${row.role}"`,
        `"${row.industry}"`,
        `"${row.location}"`,
        `"${row.email}"`,
        row.emailConfidence,
        row.emailValid ? "Yes" : "No",
        row.relevanceScore,
        `"${row.aiIndustry}"`,
        `"${row.aiRole}"`,
        `"${row.companyType}"`,
        `"${row.seniority}"`,
        `"${row.linkedinUrl}"`,
  `"${(row.bio ?? "").replace(/"/g, '""')}"`, // Escape quotes in bio
      ].join(","),
    ),
  ].join("\n")

  return csvContent
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export function prepareExportData(results: any[]): ExportData[] {
  return results.flatMap((result) =>
    result.emails.map((email: any) => ({
      name: result.name,
      company: result.company,
      role: result.role,
      industry: result.industry,
      location: result.location,
      email: email.email,
      emailConfidence: email.verification.confidence,
      emailValid: email.verification.isValid,
      relevanceScore: result.relevanceScore,
      aiIndustry: result.categories.industry,
      aiRole: result.categories.role,
      companyType: result.categories.companyType,
      seniority: result.categories.seniority,
      linkedinUrl: result.linkedinUrl,
      bio: result.bio,
    })),
  )
}

export function generateExportFilename(searchQuery: string, format = "csv"): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
  const cleanQuery = searchQuery.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")
  return `email_finder_${cleanQuery}_${timestamp}.${format}`
}
