# 🧩 MCP Servers Usage Guide

This document provides guidance on when and how to use the Model Context Protocol (MCP) servers available in this project. MCP gives you access to structured tools and resources beyond plain text context.

## 🎯 General Decision Flow

Choose **one server at a time** that best fits your request. Only chain servers if absolutely necessary.

1. **Need real-time web search or deep research?** → Use **Exa**
2. **Need official documentation or library references?** → Use **Ref**
3. **Need semantic code understanding/editing in this repo?** → Use **Serena**
4. **Need security scanning or vulnerability analysis?** → Use **Semgrep**

> **Important**: Only use activated MCP servers. If a server is disabled in config, request enablement before attempting to use it.

---

## 🔍 Ref (Documentation Search)

**Status**: ✅ **ACTIVATED**

**Purpose**: Lightning-fast search and selective reading over public/private API & library documentation to minimize tokens and reduce hallucination.

**Core Tools**:

- `ref_search_documentation(query)` - Search documentation
- `ref_read_url(url)` - Fetch and markdown-convert specific documentation pages

**When To Use**:

- Need authoritative reference material (API endpoints, SDK usage, library options)
- Looking for specific implementation details from official docs
- Want to avoid hallucination by grounding responses in real documentation
- Need to understand framework-specific patterns or best practices

**Strategy**:

1. Start with a natural-language question
2. If answer is incomplete, refine query or read additional URLs
3. Ref de-duplicates content across the session for efficiency

**Example Usage**:

```txt
Search Next.js App Router data fetching patterns and read the relevant documentation to understand server components vs client components.

Search Convex query optimization best practices and extract performance recommendations.

Find Tailwind CSS 4 configuration options for custom design tokens.
```

**Avoid Using For**:

- Generic web research (use Exa instead)
- Real-time information that changes frequently
- Content that's not in official documentation

---

## 🌐 Exa (Real-Time Web & Deep Research)

**Status**: ✅ **ACTIVATED**

**Purpose**: Real-time web search, academic research, company information, GitHub repositories, LinkedIn profiles, Wikipedia articles, competitor analysis, and long-running deep research workflows.

**Core Tools**:

- `web_search_exa` - General web search
- `research_paper_search_exa` - Academic paper search
- `company_research_exa` - Company information research
- `crawling_exa` - Extract content from specific URLs
- `competitor_finder_exa` - Find business competitors
- `linkedin_search_exa` - LinkedIn profile/company search
- `wikipedia_search_exa` - Wikipedia article search
- `github_search_exa` - GitHub repository search
- `deep_researcher_start` - Start comprehensive research task
- `deep_researcher_check` - Check status of deep research

**When To Use**:

- Need up-to-date information not in documentation
- Researching market trends, competitors, or industry insights
- Looking for code examples or open-source solutions
- Conducting comprehensive multi-source research
- Need to understand current best practices or emerging patterns

**Strategy**:

- **For quick answers**: Use specific search tools (`web_search_exa`, `github_search_exa`, etc.)
- **For complex investigations**: Use `deep_researcher_start` with detailed question, then poll `deep_researcher_check` until complete

**Example Usage**:

```txt
Search GitHub for React resume builder components with TypeScript and extract implementation patterns.

Research current ATS (Applicant Tracking System) optimization trends in 2024 and summarize key findings.

Use deep_researcher_start to investigate "best practices for AI-powered document analysis in web applications" and provide comprehensive analysis.

Find competitors to ResumeMoto in the AI resume optimization space.
```

**Best Practices**:

- Be specific in your queries for better results
- Use deep researcher for complex, multi-faceted questions
- Combine with other tools when you need both research and implementation

---

## 🤖 Serena (Code Indexing & Editing)

**Status**: ✅ **ACTIVATED**

**Purpose**: Semantic code retrieval and agentic editing over the local codebase. Provides deep understanding of the repository structure and enables intelligent code modifications.

**Core Capabilities**:

- Semantic code search and navigation
- Multi-file refactoring and editing
- Code structure analysis and understanding
- Symbol finding and reference tracking
- Intelligent code generation within project context

**When To Use**:

- Need to understand how specific features are implemented
- Looking for where certain functionality is located
- Want to make changes across multiple files consistently
- Need to understand code relationships and dependencies
- Refactoring existing code while maintaining consistency
- Adding new features that integrate with existing codebase

**Strategy**:

- Always start the session by running, "Read Serena's initial instructions" OR `/mcp__serena__initial__instructions`
- Ask direct, specific questions about code location and implementation
- Request modifications with clear context about desired changes
- Use for understanding complex code relationships
- Leverage for maintaining coding standards across the project

**Example Usage**:

```txt

Read Serena's initial instructions.

Find where the ATS scoring algorithm is implemented and explain how it calculates the overall score.

Locate all components that handle resume parsing and show their relationships.

Refactor the AI provider integration to support the new Anthropic Claude API while maintaining backward compatibility.

Add error handling to all database operations in the Convex functions following the project's error handling patterns.

Show me how the subscription billing system integrates with the AI credit system.
```

**Best Practices**:

- Be specific about what you're looking for or want to change
- Provide context about the broader goal when requesting modifications
- Ask for explanations of complex code relationships
- Use for maintaining consistency with existing patterns

---

## 🛡️ Semgrep (Security Scanning)

**Status**: ✅ **ACTIVATED**

**Purpose**: Static analysis for security vulnerabilities, code quality issues, and custom rule authoring. Provides comprehensive security scanning and AST inspection capabilities.

**Core Tools**:

- `security_check` - Fast security vulnerability scan
- `semgrep_scan` - Comprehensive code analysis
- `semgrep_scan_with_custom_rule` - Scan with custom rules
- `get_abstract_syntax_tree` - AST analysis for specific code
- `semgrep_rule_schema` - Get rule schema for custom rules
- `get_supported_languages` - Check supported languages

**When To Use**:

- After generating or modifying code (especially AI-generated)
- Before committing changes to ensure security
- When user explicitly requests security review
- Need to create custom security rules for project-specific patterns
- Analyzing code structure for potential vulnerabilities
- Ensuring compliance with security best practices

**Workflow**:

1. Run `security_check` or `semgrep_scan` on relevant code
2. Analyze findings and prioritize by severity
3. If needed, create custom rules with `semgrep_scan_with_custom_rule`
4. Provide remediation advice for identified issues

**Example Usage**:

```txt
Scan the AI package for security vulnerabilities and provide remediation recommendations.

Check the authentication system for common security issues like SQL injection or XSS vulnerabilities.

Create a custom Semgrep rule to detect improper API key handling in our codebase.

Analyze the file upload functionality for potential security risks.

Scan all Convex functions for security best practices compliance.
```

**Best Practices**:

- Always scan AI-generated code before integration
- Focus on high and critical severity findings first
- Create custom rules for project-specific security patterns
- Provide clear remediation steps for identified issues
- Regular security scans should be part of the development workflow

---

## 🚫 Disabled MCP Servers

The following servers are configured but **NOT ACTIVATED**. Request enablement before attempting to use:

### Fetch (Single URL Retrieval)

- **Purpose**: Retrieve specific URLs without search
- **Use Case**: When you have exact URLs to fetch

### Pieces (Personal Long-Term Context)

- **Purpose**: Access on-device memory for code snippets and history
- **Use Case**: Reference previous solutions or personal code patterns

### Playwright (Browser Automation)

- **Purpose**: Headless browser automation and testing
- **Use Case**: UI testing, dynamic content extraction

### Magic (@21st-dev/magic)

- **Purpose**: AI-generated UI components from natural language
- **Use Case**: Creating new React components with natural language

### Frontend MCP Server (AWS Labs)

- **Purpose**: Curated React + AWS documentation
- **Use Case**: Educational content about React and AWS integration

### Sequential Thinking

- **Purpose**: Structured multi-step reasoning
- **Use Case**: Complex problem decomposition

### Task Master

- **Purpose**: AI-powered task management
- **Use Case**: PRD parsing and task generation

### Memory

- **Purpose**: Persistent conversational memory
- **Use Case**: Storing user preferences across sessions

---

## 🔐 Security & Safety Guidelines

- **Never expose actual API keys** in responses; use placeholders like `[API_KEY]`
- **Prefer Ref over raw web search** for documentation to reduce token noise
- **Always run Semgrep** before committing AI-generated code
- **Be mindful of sensitive data** when using research tools
- **Validate external content** before incorporating into codebase

---

## 🎯 Integration with Development Workflow

### Before Starting Development

1. Use **Serena** to understand existing code structure
2. Use **Ref** to research best practices for the technology stack
3. Use **Exa** for current industry patterns and examples

### During Development

1. Use **Serena** for code navigation and implementation
2. Use **Ref** for specific API documentation
3. Use **Semgrep** for security validation of new code

### Before Committing

1. **Mandatory**: Run **Semgrep** security scan on all changes
2. Use **Serena** to ensure consistency with existing patterns
3. Verify implementation follows documented best practices

### For Research Tasks

1. Use **Exa** for comprehensive market/technical research
2. Use **Ref** for authoritative technical documentation
3. Combine findings with **Serena** for implementation planning

---

## 📋 Quick Reference

| Need | Primary Tool | Secondary Tool |
|------|-------------|----------------|
| Code understanding | Serena | Ref (for APIs) |
| Security scanning | Semgrep | - |
| Documentation lookup | Ref | Exa (for examples) |
| Market research | Exa | - |
| Implementation examples | Exa (GitHub search) | Ref (official docs) |
| Vulnerability analysis | Semgrep | - |
| Code refactoring | Serena | Semgrep (validation) |
| Technical research | Exa (deep researcher) | Ref (official sources) |

---

**Remember**: These tools are designed to enhance development efficiency and code quality. Use them strategically based on your specific needs, and always validate AI-generated content through appropriate security and quality checks.
