"use client"

import React from 'react'
import {
  ServiceCard,
  PricingCard,
  ServiceGrid,
  QuickActions,
  InfoCard,
  StatsDisplay,
  ContactCTA,
  ContactForm
} from './GenerativeComponents'

// Component registry mapping
const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  ServiceCard,
  PricingCard,
  ServiceGrid,
  QuickActions,
  InfoCard,
  StatsDisplay,
  ContactCTA,
  ContactForm
}

export interface ComponentDefinition {
  type: 'component'
  component: string
  props: Record<string, any>
}

export interface TextDefinition {
  type: 'text'
  value: string
}

export interface MixedContent {
  type: 'mixed'
  content: Array<ComponentDefinition | TextDefinition>
}

export type ContentDefinition = ComponentDefinition | TextDefinition | MixedContent

/**
 * Renders a single component based on its definition
 */
export function renderComponent(definition: ComponentDefinition, key?: string | number): React.ReactNode {
  const { component, props } = definition
  
  // Check if component exists in registry
  if (!COMPONENT_REGISTRY[component]) {
    console.warn(`Component "${component}" not found in registry`)
    return (
      <div key={key} className="text-red-500 text-sm p-2 border border-red-500/30 rounded">
        ⚠️ Component "{component}" not available
      </div>
    )
  }

  const Component = COMPONENT_REGISTRY[component]
  
  try {
    return <Component key={key} {...props} />
  } catch (error) {
    console.error(`Error rendering component "${component}":`, error)
    return (
      <div key={key} className="text-red-500 text-sm p-2 border border-red-500/30 rounded">
        ⚠️ Error rendering "{component}"
      </div>
    )
  }
}

/**
 * Renders mixed content (text + components)
 */
export function renderMixedContent(content: Array<ComponentDefinition | TextDefinition>): React.ReactNode {
  return content.map((item, index) => {
    if (item.type === 'component') {
      return renderComponent(item, index)
    } else if (item.type === 'text') {
      return (
        <div key={index} className="prose dark:prose-invert max-w-none">
          {item.value}
        </div>
      )
    }
    return null
  })
}

/**
 * Main renderer that handles all content types
 */
export function renderGenerativeContent(definition: ContentDefinition): React.ReactNode {
  if (definition.type === 'component') {
    return renderComponent(definition)
  } else if (definition.type === 'text') {
    return (
      <div className="prose dark:prose-invert max-w-none">
        {definition.value}
      </div>
    )
  } else if (definition.type === 'mixed') {
    return renderMixedContent(definition.content)
  }
  
  return null
}

/**
 * Parses AI response and extracts component definitions
 * Supports both pure JSON and JSON embedded in text
 * Hides code blocks and returns only component definitions
 */
export function parseAIResponse(text: string): {
  hasComponents: boolean
  content: ContentDefinition | null
  plainText: string
} {
  // Try to find JSON component definitions in the text
  const jsonRegex = /```json\n([\s\S]*?)\n```/g
  const matches = Array.from(text.matchAll(jsonRegex))
  
  if (matches.length === 0) {
    // Check for code blocks of any type (they should be hidden)
    const anyCodeBlockRegex = /```[\s\S]*?```/g
    if (anyCodeBlockRegex.test(text)) {
      // Remove all code blocks and return plain text
      const plainText = text.replace(anyCodeBlockRegex, '').trim()
      return {
        hasComponents: false,
        content: null,
        plainText: plainText || text
      }
    }
    
    // No components or code blocks found, return as plain text
    return {
      hasComponents: false,
      content: null,
      plainText: text
    }
  }

  try {
    // Extract the JSON content
    const jsonText = matches[0][1]
    const parsed = JSON.parse(jsonText)
    
    // Validate the structure
    if (parsed.type && ['component', 'mixed', 'text'].includes(parsed.type)) {
      // Remove ALL code blocks from plain text (not just the JSON one)
      let plainText = text.replace(/```[\s\S]*?```/g, '').trim()
      
      return {
        hasComponents: true,
        content: parsed as ContentDefinition,
        plainText: plainText
      }
    }
  } catch (error) {
    console.warn('Failed to parse component definition:', error)
  }

  // If parsing failed, remove code blocks and return plain text
  const plainText = text.replace(/```[\s\S]*?```/g, '').trim()
  return {
    hasComponents: false,
    content: null,
    plainText: plainText || text
  }
}

/**
 * Gets list of available components and their props for AI reference
 */
export function getComponentDocumentation(): string {
  return `
Available Generative UI Components:

1. ServiceCard
   Props: { title: string, description: string, icon?: string, features?: string[], ctaText?: string }
   Icons: Sparkles, Rocket, Shield, Code, TrendingUp, Target

2. PricingCard
   Props: { title: string, price: string, period?: string, description?: string, features?: string[], recommended?: boolean, ctaText?: string }

3. ServiceGrid
   Props: { services: Array<{ title: string, description: string, icon?: string }> }

4. QuickActions
   Props: { actions: Array<{ label: string, icon?: string, action?: string }> }
   Icons: Mail, Phone, Calendar, Rocket, Target

5. InfoCard
   Props: { title?: string, content: string, type?: "info" | "warning" | "success" | "tip" }

6. StatsDisplay
   Props: { stats: Array<{ label: string, value: string, change?: string }> }

7. ContactCTA
   Props: { title?: string, description?: string, primaryButtonText?: string, secondaryButtonText?: string }

Example Usage:
\`\`\`json
{
  "type": "component",
  "component": "ServiceCard",
  "props": {
    "title": "AI Automation",
    "description": "Streamline your business with intelligent automation",
    "icon": "Rocket",
    "features": ["Process Automation", "AI Integration", "Custom Workflows"]
  }
}
\`\`\`

For mixed content:
\`\`\`json
{
  "type": "mixed",
  "content": [
    { "type": "text", "value": "Here are our services:" },
    { "type": "component", "component": "ServiceGrid", "props": { "services": [...] } }
  ]
}
\`\`\`
`
}
