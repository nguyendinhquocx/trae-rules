# CLAUDE.md - Story-Driven Development Framework

This file provides guidance to AI assistants when working with code in this repository using the Story-Driven Development approach.

## Quick Start for New Sessions

**Before starting any work, read these files in order:**

1. **`pair_programming.md`** - Our workflow process for story-driven development
2. **`project_plan.md`** - Current progress and next story to work on  
3. **`technical_considerations.md`** - Lessons learned and implementation decisions
4. **`architecture.md`** - Overall architecture and design decisions
5. **`PROJECT_CONTEXT.md`** - Project-specific context and requirements

**Key workflow reminders:**
- Always follow the 7-step story workflow from pair_programming.md
- Track story progress systematically
- Follow the exact human verification format
- Update technical_considerations.md with lessons learned after each story
- Never skip validation steps

## Project Overview

[PROJECT_NAME] is [PROJECT_DESCRIPTION]. 

**Target Users:** [TARGET_AUDIENCE]
**Core Purpose:** [MAIN_FUNCTIONALITY]
**Key Benefits:** [VALUE_PROPOSITION]

## Development Commands

### [TECHNOLOGY_STACK] Development
```bash
# Add your project-specific commands here
# Example:
# npm start - Start development server
# npm build - Build for production
# npm test - Run tests
```

**Important Notes:**
- [Add any critical development notes]
- [Specify which commands should NOT be run automatically]
- [Note any special setup requirements]

## Architecture Overview

### Technology Stack
- **Frontend**: [FRONTEND_TECH]
- **Backend**: [BACKEND_TECH]
- **Database**: [DATABASE_TECH]
- **Deployment**: [DEPLOYMENT_PLATFORM]
- **Key Libraries**: [IMPORTANT_LIBRARIES]

### Architecture Decisions
[ARCHITECTURE_SUMMARY]

**Implementation Status:** [CURRENT_STATUS]

## Project Structure Overview

See `architecture.md` for detailed component organization. Key locations:
- `[SOURCE_DIR]/` - [SOURCE_DESCRIPTION]
- `[CONFIG_DIR]/` - [CONFIG_DESCRIPTION]
- `[DOCS_DIR]/` - [DOCS_DESCRIPTION]

## Domain-Specific Context

[PROJECT_DOMAIN_CONTEXT]

**Key Concepts:**
- [CONCEPT_1]: [DESCRIPTION]
- [CONCEPT_2]: [DESCRIPTION]
- [CONCEPT_3]: [DESCRIPTION]

## Development Guidelines

### Code Quality Standards
- Follow [CODING_STANDARDS]
- Use [NAMING_CONVENTIONS]
- Implement [ERROR_HANDLING_STRATEGY]
- Write [TESTING_REQUIREMENTS]

### Common Patterns
- [PATTERN_1]: [USAGE]
- [PATTERN_2]: [USAGE]
- [PATTERN_3]: [USAGE]

### Known Issues & Solutions
- [ISSUE_1] → [SOLUTION_1]
- [ISSUE_2] → [SOLUTION_2]
- [ISSUE_3] → [SOLUTION_3]

## Story-Driven Development Notes

### Story Characteristics
- Each story should be completable in 1-3 hours
- Stories must have clear acceptance criteria
- Include specific testing requirements
- Define "Definition of Done" clearly

### Validation Requirements
- [VALIDATION_TYPE_1]: [REQUIREMENTS]
- [VALIDATION_TYPE_2]: [REQUIREMENTS]
- [VALIDATION_TYPE_3]: [REQUIREMENTS]

### Human Verification Points
- [VERIFICATION_POINT_1]
- [VERIFICATION_POINT_2]
- [VERIFICATION_POINT_3]

---

**Template Usage Instructions:**
1. Replace all [PLACEHOLDER] values with project-specific information
2. Update development commands section with actual commands
3. Fill in architecture details in architecture.md
4. Create PROJECT_CONTEXT.md with domain-specific information
5. Customize validation requirements based on project needs

**Framework Benefits:**
- ✅ Structured development approach
- ✅ Clear validation gates
- ✅ Knowledge capture and reuse
- ✅ Consistent quality standards
- ✅ Reproducible development process
