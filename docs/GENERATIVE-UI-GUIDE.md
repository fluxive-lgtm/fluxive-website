# Generative UI Implementation Guide for AI

## Overview
Your responses can now include **interactive React components** in addition to Markdown text. This allows you to create rich, visual, and interactive user experiences.

## How It Works

You can respond in three ways:

### 1. **Plain Markdown** (Default)
Just send regular Markdown text as usual:
```
Here are our services:
- IT Services
- AI Automation
- Web Development
```

### 2. **Pure Component**
Send a JSON definition wrapped in triple backticks with `json` language tag:
````markdown
Here are our services:

```json
{
  "type": "component",
  "component": "ServiceCard",
  "props": {
    "title": "AI Automation",
    "description": "Streamline your business with intelligent automation",
    "icon": "Rocket",
    "features": [
      "Process Automation",
      "AI Integration",
      "Custom Workflows",
      "24/7 Monitoring"
    ],
    "ctaText": "Learn More"
  }
}
```
````

### 3. **Mixed Content**
Combine text and multiple components:
````markdown
Let me show you our pricing options:

```json
{
  "type": "mixed",
  "content": [
    {
      "type": "text",
      "value": "Choose the plan that fits your needs:"
    },
    {
      "type": "component",
      "component": "ServiceGrid",
      "props": {
        "services": [
          {
            "title": "Starter",
            "description": "Perfect for small projects",
            "icon": "Sparkles"
          },
          {
            "title": "Professional",
            "description": "For growing businesses",
            "icon": "Rocket"
          }
        ]
      }
    },
    {
      "type": "component",
      "component": "ContactCTA",
      "props": {
        "title": "Need a Custom Solution?",
        "description": "Let's discuss your specific requirements"
      }
    }
  ]
}
```
````

## Available Components

### 1. **ServiceCard**
Display a single service with features and CTA button.

```json
{
  "type": "component",
  "component": "ServiceCard",
  "props": {
    "title": "Web Development",
    "description": "Custom web applications built with modern technologies",
    "icon": "Code",
    "features": [
      "Responsive Design",
      "SEO Optimized",
      "Fast Performance",
      "Scalable Architecture"
    ],
    "ctaText": "Get Quote"
  }
}
```

**Available Icons:** `Sparkles`, `Rocket`, `Shield`, `Code`, `TrendingUp`, `Target`

---

### 2. **PricingCard**
Display pricing information with features.

```json
{
  "type": "component",
  "component": "PricingCard",
  "props": {
    "title": "Professional",
    "price": "$199",
    "period": "month",
    "description": "For growing businesses",
    "features": [
      "10 User Accounts",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations"
    ],
    "recommended": true,
    "ctaText": "Start Free Trial"
  }
}
```

---

### 3. **ServiceGrid**
Display multiple services in a grid layout.

```json
{
  "type": "component",
  "component": "ServiceGrid",
  "props": {
    "services": [
      {
        "title": "IT Services",
        "description": "Complete IT infrastructure management",
        "icon": "Shield"
      },
      {
        "title": "AI Automation",
        "description": "Intelligent process automation",
        "icon": "Sparkles"
      },
      {
        "title": "Web Development",
        "description": "Custom web applications",
        "icon": "Code"
      },
      {
        "title": "Cybersecurity",
        "description": "Enterprise-grade security",
        "icon": "Shield"
      }
    ]
  }
}
```

---

### 4. **QuickActions**
Display clickable action buttons.

```json
{
  "type": "component",
  "component": "QuickActions",
  "props": {
    "actions": [
      {
        "label": "Contact Sales",
        "icon": "Mail"
      },
      {
        "label": "Schedule Demo",
        "icon": "Calendar"
      },
      {
        "label": "Call Us",
        "icon": "Phone"
      }
    ]
  }
}
```

**Available Icons:** `Mail`, `Phone`, `Calendar`, `Rocket`, `Target`

---

### 5. **InfoCard**
Display highlighted information or tips.

```json
{
  "type": "component",
  "component": "InfoCard",
  "props": {
    "title": "Pro Tip",
    "content": "Start with a small pilot project to test our services before committing to a larger engagement.",
    "type": "tip"
  }
}
```

**Types:** `info`, `warning`, `success`, `tip`

---

### 6. **StatsDisplay**
Show key metrics or statistics.

```json
{
  "type": "component",
  "component": "StatsDisplay",
  "props": {
    "stats": [
      {
        "label": "Projects Completed",
        "value": "500+",
        "change": "+25% this year"
      },
      {
        "label": "Happy Clients",
        "value": "200+",
        "change": "+40% this year"
      },
      {
        "label": "Team Members",
        "value": "50+",
        "change": "Growing"
      },
      {
        "label": "Success Rate",
        "value": "98%",
        "change": "Industry leading"
      }
    ]
  }
}
```

---

### 7. **ContactCTA**
Call-to-action for contacting or engaging.

```json
{
  "type": "component",
  "component": "ContactCTA",
  "props": {
    "title": "Ready to Transform Your Business?",
    "description": "Let's discuss how we can help you achieve your goals.",
    "primaryButtonText": "Get Started",
    "secondaryButtonText": "Learn More"
  }
}
```

---

### 8. **ContactForm**
Interactive form to collect user information (name, email, phone, company, message).

```json
{
  "type": "component",
  "component": "ContactForm",
  "props": {
    "title": "Quick Contact",
    "description": "Share your details and we'll reach out shortly.",
    "fields": ["name", "email", "phone", "message"],
    "submitText": "Send Message"
  }
}
```

**Available Fields:** `name`, `email`, `phone`, `company`, `message`

**Note:** This form is perfect when you need specific information from the user. The form handles validation, submission states, and shows success feedback.

---

## Best Practices

### ✅ DO:

- Use components to make information more scannable and engaging
- Combine text with components for context
- Use ServiceGrid for showing multiple related items
- Use InfoCard for important notes or tips
- Use ContactCTA at the end of conversations
- Use QuickActions to suggest next steps
- **Use ContactForm when you need specific information from the user**

### ❌ DON'T:

- Don't use too many components in one message
- Don't nest components (not supported)
- Don't use undefined component names
- Don't forget to include required props
- **Don't ask for information that ContactForm can collect**

## Example Conversations

### Example 1: Showcasing Services
**User:** "What services do you offer?"

**AI Response:**
````markdown
We offer comprehensive IT solutions tailored to your business needs:

```json
{
  "type": "mixed",
  "content": [
    {
      "type": "component",
      "component": "ServiceGrid",
      "props": {
        "services": [
          {
            "title": "IT Services",
            "description": "Complete infrastructure management and support",
            "icon": "Shield"
          },
          {
            "title": "AI Automation",
            "description": "Streamline operations with intelligent automation",
            "icon": "Sparkles"
          },
          {
            "title": "Web Development",
            "description": "Custom web applications and platforms",
            "icon": "Code"
          },
          {
            "title": "Cybersecurity",
            "description": "Enterprise-grade security solutions",
            "icon": "Shield"
          }
        ]
      }
    },
    {
      "type": "component",
      "component": "InfoCard",
      "props": {
        "title": "💡 Custom Solutions Available",
        "content": "We can tailor any service to meet your specific requirements.",
        "type": "tip"
      }
    },
    {
      "type": "component",
      "component": "QuickActions",
      "props": {
        "actions": [
          {"label": "Request Quote", "icon": "Mail"},
          {"label": "Schedule Consultation", "icon": "Calendar"}
        ]
      }
    }
  ]
}
```
````

### Example 2: Pricing Information
**User:** "What are your pricing plans?"

**AI Response:**
````markdown
Here are our pricing options:

```json
{
  "type": "mixed",
  "content": [
    {
      "type": "component",
      "component": "PricingCard",
      "props": {
        "title": "Starter",
        "price": "$99",
        "period": "month",
        "features": [
          "5 User Accounts",
          "Basic Analytics",
          "Email Support",
          "Monthly Reports"
        ]
      }
    },
    {
      "type": "component",
      "component": "PricingCard",
      "props": {
        "title": "Professional",
        "price": "$299",
        "period": "month",
        "recommended": true,
        "features": [
          "20 User Accounts",
          "Advanced Analytics",
          "Priority Support",
          "Weekly Reports",
          "Custom Integrations"
        ]
      }
    },
    {
      "type": "component",
      "component": "ContactCTA",
      "props": {
        "title": "Need Enterprise Solutions?",
        "description": "Contact us for custom pricing and features."
      }
    }
  ]
}
```
````

### Example 3: Collecting User Information
**User:** "I'm interested in your AI automation services, what do you need from me?"

**AI Response:**
````markdown
Great! I'd love to learn more about your needs. Could you share some details?

```json
{
  "type": "component",
  "component": "ContactForm",
  "props": {
    "title": "Tell Us About Your Project",
    "description": "Share your contact info and project details so we can provide a tailored solution.",
    "fields": ["name", "email", "phone", "company", "message"],
    "submitText": "Submit Request"
  }
}
```

Once you submit, our team will review your requirements and get back to you within 24 hours with a customized proposal.
````

## Technical Notes

- Components are rendered as React components with full interactivity
- The JSON must be wrapped in triple backticks with `json` language tag
- Components automatically adapt to light/dark theme
- All components are responsive and mobile-friendly
- Session context is maintained across messages
- **ContactForm handles submission internally** and shows success feedback

## Troubleshooting

If a component doesn't render:
1. Check JSON syntax is valid
2. Verify component name is spelled correctly
3. Ensure all required props are provided
4. Make sure JSON is wrapped in ```json code block
5. Check console for error messages
