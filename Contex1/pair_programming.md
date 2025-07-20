# Story-Driven Development Framework

This document outlines our structured approach to building software through story-driven development with AI assistance.

## Core Philosophy

**Story-Driven Development** breaks down complex software projects into manageable, testable stories that can be completed in 1-3 hours. Each story represents a specific feature or improvement with clear acceptance criteria and validation requirements.

## 7-Step Story Workflow

Every story follows this exact process:

### 1. Story Selection & Planning
- **Input**: Review `project_plan.md` for next priority story
- **Action**: Understand requirements, acceptance criteria, and technical approach
- **Output**: Clear understanding of what needs to be built
- **Validation**: Story has clear, testable acceptance criteria

### 2. Implementation Preparation
- **Input**: Story requirements and current codebase state
- **Action**: 
  - Read relevant files from `CLAUDE.md` quick start list
  - Review `technical_considerations.md` for lessons learned
  - Understand existing patterns and architecture
- **Output**: Implementation plan with specific technical approach
- **Validation**: Plan addresses all acceptance criteria

### 3. Implementation
- **Input**: Implementation plan and codebase
- **Action**: Write code following established patterns and standards
- **Output**: Working implementation of the story
- **Validation**: Code compiles and follows project standards

### 4. Testing & Verification
- **Input**: Implemented code
- **Action**: 
  - Run automated tests (if applicable)
  - Verify functionality meets acceptance criteria
  - Check for regressions
- **Output**: Verified working implementation
- **Validation**: All acceptance criteria met

### 5. Human Verification Request
- **Input**: Completed implementation
- **Action**: Request human verification using exact format below
- **Output**: Clear verification request
- **Validation**: Request includes all required information

### 6. Human Feedback Integration
- **Input**: Human feedback and verification results
- **Action**: Address any issues or requested changes
- **Output**: Refined implementation
- **Validation**: All human feedback addressed

### 7. Story Completion
- **Input**: Verified and approved implementation
- **Action**: 
  - Update `project_plan.md` with completion status
  - Update `technical_considerations.md` with lessons learned
  - Prepare for next story
- **Output**: Completed story and updated documentation
- **Validation**: Documentation updated, ready for next story

## Human Verification Format

**Use this exact format for every verification request:**

```
## Story Verification Request

**Story**: [STORY_TITLE]

**Implementation Summary**:
- [Key change 1]
- [Key change 2]
- [Key change 3]

**Files Modified**:
- `[file1]` - [description of changes]
- `[file2]` - [description of changes]

**Testing Performed**:
- [Test 1]: [Result]
- [Test 2]: [Result]
- [Test 3]: [Result]

**Acceptance Criteria Verification**:
- ✅ [Criteria 1]: [How verified]
- ✅ [Criteria 2]: [How verified]
- ✅ [Criteria 3]: [How verified]

**Ready for human verification**
```

## Documentation Updates

After each story completion, update these files:

### `CLAUDE.md`
- Add new patterns or architectural decisions
- Update known issues and solutions
- Refine development guidelines

### `technical_considerations.md`
- Document lessons learned
- Record implementation decisions and rationale
- Note any technical debt or future improvements

### `project_plan.md`
- Mark completed stories
- Update progress tracking
- Adjust priorities if needed

## Quality Standards

### Code Quality
- Follow established coding standards
- Use consistent naming conventions
- Implement proper error handling
- Write clear, maintainable code

### Testing Requirements
- Verify all acceptance criteria
- Test edge cases and error conditions
- Ensure no regressions in existing functionality
- Document any manual testing steps

### Documentation Standards
- Update relevant documentation
- Include clear commit messages
- Document any breaking changes
- Maintain architectural decision records

## Communication Patterns

### Progress Updates
- Provide clear status updates at each step
- Highlight any blockers or challenges
- Request clarification when requirements are unclear

### Problem Escalation
- Escalate technical blockers immediately
- Provide context and attempted solutions
- Suggest alternative approaches when possible

### Knowledge Sharing
- Document reusable patterns and solutions
- Share insights about technology choices
- Explain complex implementation decisions

## Emergency Procedures

### Build Failures
1. Identify the specific error
2. Check recent changes for obvious issues
3. Consult `technical_considerations.md` for known solutions
4. If unresolved, escalate with full error context

### Requirement Ambiguity
1. Document the specific ambiguity
2. Propose reasonable interpretations
3. Request clarification before proceeding
4. Update story acceptance criteria once clarified

### Technical Debt
1. Document the debt in `technical_considerations.md`
2. Assess impact on current story
3. Propose resolution timeline
4. Continue with story if debt doesn't block progress

## Success Metrics

### Story Completion
- ✅ All acceptance criteria met
- ✅ Code quality standards maintained
- ✅ Documentation updated
- ✅ Human verification passed

### Process Efficiency
- Stories completed within 1-3 hour timeframe
- Minimal back-and-forth on requirements
- Consistent quality across stories
- Effective knowledge capture and reuse

### Knowledge Building
- `technical_considerations.md` grows with each story
- Patterns become reusable across stories
- Development velocity increases over time
- Fewer repeated mistakes or issues

---

**Framework Customization:**
- Adapt testing requirements to your technology stack
- Modify verification format for your project needs
- Adjust story size guidelines based on complexity
- Customize quality standards for your domain

**Benefits of This Approach:**
- ✅ Predictable development process
- ✅ Clear quality gates
- ✅ Systematic knowledge capture
- ✅ Reduced risk through small iterations
- ✅ Consistent delivery standards
