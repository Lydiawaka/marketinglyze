// lib/template-parser.ts
export function personalizeTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let personalized = template;
  
  Object.keys(variables).forEach(key => {
    const placeholder = `{{${key}}}`;
    personalized = personalized.replace(
      new RegExp(placeholder, 'g'),
      variables[key] || ''
    );
  });
  
  return personalized;
}

export function extractVariables(template: string): string[] {
  const regex = /{{(\w+)}}/g;
  const variables: string[] = [];
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    variables.push(match[1]);
  }
  
  return [...new Set(variables)]; // Remove duplicates
}