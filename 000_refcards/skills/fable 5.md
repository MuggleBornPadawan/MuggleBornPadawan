# Claude Fable 5 Prompt Library — All Eight Prompts

Source: https://every.to/p/claude-fable-5-prompt-library
From Every. Eight copy-ready prompts from Anthropic's Mike Krieger and the Every team.
Fill in the brackets, add your context, and give Fable room to work.

---

## Four prompts from Mike Krieger (Head of Anthropic Labs)

### 1. Delegate a task overnight

Use this when: The task will take hours and can keep moving without your input.

```
I'm handing you this task to run unsupervised overnight: [describe the task]

Done means: [definition of done]

Use this context: [repository, documents, access, constraints]

Work through the task to completion. If you hit a blocker, do not stop. Use mocks, stubs, or documented assumptions where appropriate. Record each workaround and continue with everything that does not require my decision.

By morning, leave me:

1. What you completed
2. What you worked around and why
3. What still needs my decision
4. The evidence that the work functions as intended
```

Why it works: Fable knows what completion looks like, how much autonomy it has, and what to do when the obvious path breaks.

### 2. Plan the architecture before you build

Use this when: A product or feature needs technical planning and team alignment before implementation.

```
Before writing code, help me plan [project or feature].

Current context: [what it does, who it serves, and where it runs today]

Where it is going: [expected scale, timeline, and release stage]

Challenge any infrastructure or abstraction that does not fit this stage. Avoid planning for scale we do not have and avoid shortcuts that will make an imminent release fragile.

Work through the tradeoffs with me until we agree on the architecture.

Then create one artifact I can share with the team: an HTML page or markdown document with diagrams, the chosen architecture, the alternatives we rejected, and why.
```

Why it works: The model produces a decision artifact before it produces code, giving humans a clear point to review and align.

### 3. Build a visual verification loop

Use this when: An agent is changing an interface or workflow that needs more than a passing test.

```
For every change you make to [application or feature], attach evidence that it works.

Exercise the real flows using [staging or test account] and representative data. Capture screenshots of every screen you changed, including error states and edge cases. Record a short video of the main flow.

Review your own captures. Scrub through the video and flag broken animations, layout shifts, missing states, and anything a user could encounter that the tests did not cover.

Return the test results, screenshot gallery, video, issues you found, and any remaining uncertainty.
```

Why it works: The agent has to inspect the product a user would see, rather than treating a successful build or test suite as proof of completion.

### 4. Port a codebase with a dynamic workflow

Use this when: A migration is too large for one pass and needs its own repeatable execution system.

```
I need [codebase or module] ported from [language A] to [language B] because [reason].

Before starting the port, design the workflow and show it to me in code. The workflow should:

1. Map the existing system and write a specification of its behavior.
2. Translate it module by module.
3. Test each module as it is translated.
4. Run an adversarial review at the end for omissions and behavior changes.
5. Document anything deliberately excluded from the port and why.

After I approve the workflow, run it from start to finish.

When the port is complete, show me where it improves on the original, where behavior may differ, and which areas deserve the closest human review.
```

Why it works: Fable builds a process that can survive a long migration, check its own progress, and expose gaps before declaring the port complete.

---

## How the Every team uses Fable 5

### 5. Fix a broken agent workflow — Nityesh Agarwal, senior applied AI engineer

Use this when: An agent keeps failing, running slowly, or producing expensive, inconsistent work.

```
Here is a session log from an agent attempting this workflow: [describe workflow]

It struggled with: [time, cost, errors, poor outputs, or repeated failures]

Analyze where the current tool, skill, or workflow breaks down. Identify the root cause instead of patching the latest symptom.

Make a plan. Then build or specify the upgrade and test it against a comparable task.

Return:

1. The root cause
2. The change you made
3. The before-and-after result
4. The infrastructure that faster or cheaper models can reuse
5. Any failure you could not resolve
```

Why it works: The assignment asks Fable to improve the system around the task, leaving behind tools that make future runs cheaper and more reliable.

### 6. Build a go-to-market strategy from source data — Austin Tedesco, head of growth

Use this when: A strategy needs to reconcile customer research, analytics, internal plans, and conflicting assumptions.

```
Use the attached source pack to analyze [business area, launch, audience, or funnel].

Sources include: [survey data, customer research, analytics dashboards, website context, planning documents, meeting notes, Slack discussions, and internal goals]

Our goal is [specific business goal] for [target customer or profile].

Test our assumptions against the evidence. Do not treat internal consensus as fact.

Produce:

1. The 10 findings most likely to change how we operate
2. A ranked list of 10 things we should ship, test, or stop doing
3. The evidence behind each recommendation
4. Source conflicts, stale rules, unclear metric definitions, and assumptions that need verification

Flag any conclusion that depends heavily on one source or internal rule, and explain how you would verify it before we act.
```

Why it works: The model receives the sources of truth, a business goal, a required output, and permission to disagree with the existing plan.

### 7. Turn feedback into one batch of changes — Kieran Klaassen, Cora general manager

Use this when: Feedback is scattered across Slack, support, recordings, customer calls, and production data.

```
Collect feedback about [product, feature, or workflow] from: [Slack channel, support tickets, screen recordings, screenshots, production logs, customer calls, and meeting notes]

Group the feedback into themes. Separate:

1. Changes that are clearly actionable
2. Decisions that require my judgment
3. Requests that conflict with our strategy, user profile, or product direction
4. The evidence supporting each theme

Create one coherent plan for the actionable changes. If you have the tools and approval to implement them, make the changes as one batch and check that the fixes do not conflict.

Return what changed, what you skipped, what still needs review, and the evidence that the changes work.
```

Why it works: Fable gets the full feedback trail and a clear boundary between autonomous work and decisions that belong to a person.

### 8. Build a first version from a product spec — Willie Williams, head of platform

Use this when: You can provide the same brief, context, and edge cases you would give a senior engineer.

```
Build a first working version of [product, website, or tool].

Product specification: [paste specification]
Users: [who it serves]
Domain context: [terms, workflows, examples, and constraints]
Tricky cases: [edge cases]
Required behavior: [requirements]
Acceptable rough edges: [scope boundaries]

Make a plan before you build. Then implement the first version and test it in the environment where it will be used.

When you finish, give me:

1. Instructions for trying it
2. The main decisions you made
3. What you left out
4. Test results and other evidence
5. The areas I should review most carefully
```

Why it works: A complete brief gives Fable room to make implementation decisions while preserving clear boundaries and a useful human review step.
