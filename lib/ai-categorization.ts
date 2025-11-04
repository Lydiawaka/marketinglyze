import { generateText } from "ai"

export interface ProfessionalProfile {
  name: string
  company: string
  role: string
  industry?: string
  companySize?: string
  location?: string
  bio?: string
  linkedinUrl?: string
  twitterUrl?: string
}

export interface CategorizedProfile extends ProfessionalProfile {
  categories: {
    industry: string
    industryConfidence: number
    role: string
    roleConfidence: number
    companyType: string
    companyTypeConfidence: number
    seniority: string
    seniorityConfidence: number
  }
  relevanceScore: number
  reasoning: string
}

export interface SearchCriteria {
  keywords: string
  industry?: string
  location?: string
  role?: string
  companySize?: string
}

const INDUSTRY_CATEGORIES = [
  "SaaS & Technology",
  "E-commerce",
  "Fintech",
  "Healthcare",
  "Marketing & Advertising",
  "Consulting",
  "Manufacturing",
  "Real Estate",
  "Education",
  "Non-profit",
  "Media & Entertainment",
  "Retail",
  "Other",
]

const ROLE_CATEGORIES = [
  "CEO",
  "Founder",
  "CTO",
  "CMO",
  "VP Sales",
  "Marketing Director",
  "Sales Manager",
  "Business Development",
  "Product Manager",
  "Engineering Manager",
  "Other Executive",
  "Other",
]

const COMPANY_TYPES = ["Startup", "Scale-up", "Enterprise", "SMB", "Agency", "Consultancy", "Non-profit", "Other"]

const SENIORITY_LEVELS = ["C-Level", "VP/Director", "Manager", "Senior", "Mid-level", "Junior", "Other"]

export async function categorizeProfile(
  profile: ProfessionalProfile,
  searchCriteria: SearchCriteria,
): Promise<CategorizedProfile> {
  try {
    const prompt = `
Analyze this professional profile and categorize them based on the search criteria.

Profile:
- Name: ${profile.name}
- Company: ${profile.company}
- Role: ${profile.role}
- Industry: ${profile.industry || "Unknown"}
- Bio: ${profile.bio || "Not provided"}

Search Criteria:
- Keywords: ${searchCriteria.keywords}
- Target Industry: ${searchCriteria.industry || "Any"}
- Target Location: ${searchCriteria.location || "Any"}
- Target Role: ${searchCriteria.role || "Any"}

Available Categories:
- Industries: ${INDUSTRY_CATEGORIES.join(", ")}
- Roles: ${ROLE_CATEGORIES.join(", ")}
- Company Types: ${COMPANY_TYPES.join(", ")}
- Seniority Levels: ${SENIORITY_LEVELS.join(", ")}

Please categorize this profile and provide:
1. Best matching industry category with confidence (0-100)
2. Best matching role category with confidence (0-100)
3. Company type with confidence (0-100)
4. Seniority level with confidence (0-100)
5. Overall relevance score to search criteria (0-100)
6. Brief reasoning for the categorization

Respond in JSON format:
{
  "industry": "category",
  "industryConfidence": 85,
  "role": "category",
  "roleConfidence": 90,
  "companyType": "category",
  "companyTypeConfidence": 75,
  "seniority": "category",
  "seniorityConfidence": 80,
  "relevanceScore": 88,
  "reasoning": "Brief explanation of why this profile matches the search criteria"
}
`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    const categories = JSON.parse(text)

    return {
      ...profile,
      categories,
      relevanceScore: categories.relevanceScore,
      reasoning: categories.reasoning,
    }
  } catch (error) {
    console.error("AI categorization error:", error)

    // Fallback categorization
    return {
      ...profile,
      categories: {
        industry: "Other",
        industryConfidence: 50,
        role: "Other",
        roleConfidence: 50,
        companyType: "Other",
        companyTypeConfidence: 50,
        seniority: "Other",
        seniorityConfidence: 50,
      },
      relevanceScore: 50,
      reasoning: "AI categorization failed, using fallback values",
    }
  }
}

export async function categorizeProfiles(
  profiles: ProfessionalProfile[],
  searchCriteria: SearchCriteria,
): Promise<CategorizedProfile[]> {
  const categorizedProfiles = await Promise.all(profiles.map((profile) => categorizeProfile(profile, searchCriteria)))

  // Sort by relevance score
  return categorizedProfiles.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

export async function generateSearchSuggestions(query: string): Promise<string[]> {
  try {
    const prompt = `
Based on this search query: "${query}"

Generate 5 improved search suggestions that would help find more targeted professional email addresses. Focus on:
- Specific industries and roles
- Geographic targeting
- Company size indicators
- Professional titles

Return as a JSON array of strings:
["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"]
`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Search suggestions error:", error)
    return [
      "SaaS founders in San Francisco",
      "E-commerce marketing directors",
      "Fintech startup CEOs",
      "Healthcare technology executives",
      "B2B sales managers in New York",
    ]
  }
}

export function filterProfilesByRelevance(
  profiles: CategorizedProfile[],
  minRelevanceScore = 70,
): CategorizedProfile[] {
  return profiles.filter((profile) => profile.relevanceScore >= minRelevanceScore)
}

export function groupProfilesByCategory(
  profiles: CategorizedProfile[],
  groupBy: "industry" | "role" | "companyType" | "seniority",
): Record<string, CategorizedProfile[]> {
  return profiles.reduce(
    (groups, profile) => {
      const category = profile.categories[groupBy]
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(profile)
      return groups
    },
    {} as Record<string, CategorizedProfile[]>,
  )
}
