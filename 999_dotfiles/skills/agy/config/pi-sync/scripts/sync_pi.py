#!/usr/bin/env python3
"""
Pi Coding Harness Sync Script for Antigravity Gemini
Syncs memory (AGENTS.md/GEMINI.md), skills, and prompts from ~/.pi/agent to ~/.gemini/config
Validates relevance and rewrites configurations to comply with Antigravity guidelines.
"""

import os
import re
import sys
import shutil
import argparse
from pathlib import Path

PI_AGENT_DIR = Path(os.path.expanduser("~/.pi/agent"))
GEMINI_CONFIG_DIR = Path(os.path.expanduser("~/.gemini/config"))
GEMINI_SKILLS_DIR = GEMINI_CONFIG_DIR / "skills"

# Mapping Pi prompts to Antigravity skill names and descriptions
PROMPT_MAP = {
    "healthcheck.md": {
        "name": "healthcheck",
        "description": "Run sysinfo.sh --tech and evaluate system health table against lean box thresholds (RAM, disk, load, Clojure stack, Antigravity).",
        "title": "System Healthcheck (Lean Box)"
    },
    "git-sync.md": {
        "name": "git-sync",
        "description": "Add, commit, push current branch, and merge into main branch safely.",
        "title": "Git Branch & Main Synchronizer"
    },
    "commit.md": {
        "name": "git-commit",
        "description": "Analyze staged or working tree diffs and propose conventional commit messages following project standards.",
        "title": "Conventional Git Commit Assistant"
    },
    "review.md": {
        "name": "code-review",
        "description": "Review git diff or files for bugs, security vulnerabilities, performance, and Clojure/lean-machine conventions.",
        "title": "Code Review & Quality Audit"
    },
    "test.md": {
        "name": "clojure-test",
        "description": "Write and run tests adhering to Clojure/lean-machine conventions, public ns seams, and bb/clojure.test.",
        "title": "Test Authoring & Verification (Clojure / Polyglot)"
    },
    "onboard.md": {
        "name": "onboard",
        "description": "Give a concise (<60 lines) newcomer's tour of the codebase: purpose, layout, entry points, key modules, conventions, and gotchas.",
        "title": "Codebase Onboarding & Architectural Overview"
    },
    "changelog.md": {
        "name": "changelog",
        "description": "Generate or update Keep a Changelog entries from recent git tags, commits, and diffs.",
        "title": "Changelog Generator"
    },
    "cleanup.md": {
        "name": "cleanup",
        "description": "Identify and clean dead code, unused functions, obsolete comments, and leftover debug statements without altering behavior.",
        "title": "Codebase Cleanup & Dead Code Removal"
    },
    "docs.md": {
        "name": "docs-writer",
        "description": "Generate or update documentation, docstrings, and API specs for exported functions and modules.",
        "title": "Documentation & Docstring Generator"
    },
    "explain.md": {
        "name": "explain-code",
        "description": "Explain code structure, purpose, key components, data flow, and potential gotchas concisely.",
        "title": "Code Architecture & Flow Explainer"
    },
    "find-bugs.md": {
        "name": "find-bugs",
        "description": "Proactively hunt for edge cases, error handling flaws, concurrency issues, and resource leaks.",
        "title": "Proactive Bug Hunting & Vulnerability Scanner"
    },
    "fix.md": {
        "name": "fix-issue",
        "description": "Diagnose root causes and apply minimal surgical fixes with test verification and Clojure lean-machine checks.",
        "title": "Issue Diagnosis & Surgical Fix Protocol"
    },
    "pr.md": {
        "name": "pr-prep",
        "description": "Prepare a clean GitHub pull request title and description from merge-base diffs.",
        "title": "Pull Request Preparation"
    },
    "refactor.md": {
        "name": "refactor-code",
        "description": "Perform safe, incremental code refactoring without changing public behavior or adding features.",
        "title": "Incremental Code Refactorer"
    },
    "pick-model.md": {
        "name": "pick-model",
        "description": "Analyze a task and recommend the optimal model from the Pareto frontier.",
        "title": "Pareto Model Selector"
    },
    "sync-free-models.md": {
        "name": "sync-free-models",
        "description": "Sync opencode free and zero-cost models into scoped models in settings.",
        "title": "Sync Free & Zero-Cost Models"
    },
    "simplify.md": {
        "name": "code-simplify",
        "description": "Audit code for unnecessary abstractions, premature optimization, and convolution to maximize simplicity.",
        "title": "Code Simplification & YAGNI Audit"
    },
    "plan.md": {
        "name": "task-plan",
        "description": "Formulate a step-by-step implementation plan before writing code, flagging risks and trade-offs.",
        "title": "Task Implementation Planner"
    }
}

SKILL_NAME_OVERRIDES = {
    # Avoid collision with Antigravity built-in subagent 'research'
    "research": "research-topic"
}


def sync_memory(dry_run=False):
    """
    Sync and adapt ~/.pi/agent/AGENTS.md to ~/.gemini/config/AGENTS.md & GEMINI.md
    """
    pi_agents_file = PI_AGENT_DIR / "AGENTS.md"
    if not pi_agents_file.exists():
        print(f"[-] Source memory file not found: {pi_agents_file}")
        return False

    content = pi_agents_file.read_text(encoding="utf-8")

    # Replace Assistant Behavior section with Antigravity Gemini specific guidelines
    behavior_replacement = """## Assistant Behavior & Pairing Identity (Antigravity Gemini)
- You are Antigravity, an agentic AI coding assistant designed by Google DeepMind and powered by Gemini. You are pair programming with the user.
- Respond concisely.
- Always use ASD-STE100 Simplified Technical English.
- Always talk to me like I have ADHD: short sentences, bullet points, clear structure, no long walls of text.
- Create clickable links with `file://` scheme for all modified or referenced files and symbols.
- Tool Guidelines:
  - Use `view_file` to inspect code and configs before editing.
  - Use `replace_file_content` for surgical, minimal edits (never rewrite an entire file when a targeted edit suffices).
  - Use `write_to_file` only for new files.
  - Shell commands: NEVER use `cd`. Respect the working directory parameter.
  - Respect the lean box constraints: Do NOT run memory-heavy commands like `ollama run`, `docker pull`, `clojure -P`, or `lein deps` without asking.
"""

    if "## Assistant Behavior" in content:
        parts = re.split(r"## Assistant Behavior.*", content, flags=re.DOTALL)
        adapted_content = parts[0].rstrip() + "\n\n" + behavior_replacement
    else:
        adapted_content = content + "\n\n" + behavior_replacement

    target_agents = GEMINI_CONFIG_DIR / "AGENTS.md"
    target_gemini = GEMINI_CONFIG_DIR / "GEMINI.md"

    if dry_run:
        print(f"[Dry-run] Would write memory to {target_agents} and {target_gemini}")
    else:
        GEMINI_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        target_agents.write_text(adapted_content, encoding="utf-8")
        target_gemini.write_text(adapted_content, encoding="utf-8")
        print(f"[+] Synced memory to {target_agents} and {target_gemini}")

    return True


def clean_frontmatter(content, default_name, default_desc=None):
    """
    Extracts or normalizes YAML frontmatter to conform to Antigravity standards.
    """
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    if match:
        fm_text = match.group(1)
        body = match.group(2).strip()

        name = default_name
        description = default_desc or ""

        for line in fm_text.splitlines():
            line_s = line.strip()
            if line_s.startswith("name:"):
                name = line_s.split(":", 1)[1].strip().strip('"\'')
            elif line_s.startswith("description:") and not (line_s.startswith("description: >-") or line_s.startswith("description: >")):
                description = line_s.split(":", 1)[1].strip().strip('"\'')
        
        m_desc = re.search(r"description:\s*(?:>-|>)?\s*\n((?:\s+.*\n?)+)", fm_text)
        if m_desc:
            desc_lines = [l.strip() for l in m_desc.group(1).splitlines() if l.strip()]
            description = " ".join(desc_lines)

        if not description and default_desc:
            description = default_desc
    else:
        name = default_name
        description = default_desc or f"Skill for {default_name}."
        body = content.strip()

    frontmatter = f"---\nname: {name}\ndescription: >-\n  {description}\n---\n\n"
    return frontmatter + body


def adapt_tool_references(body_text):
    """
    Rewrites tool names from Pi (read, bash, subagent) to Antigravity tools.
    """
    body_text = re.sub(r"`read`\s+tool", r"`view_file` tool", body_text)
    body_text = re.sub(r"`bash`\s+tool", r"`run_command` tool", body_text)
    body_text = re.sub(r"\(pi has no background agents\)", r"(in Antigravity, delegate via `invoke_subagent` with the `research` subagent)", body_text)
    body_text = re.sub(r"Call the Skill tool twice, for \"([^\"]+)\" and \"([^\"]+)\"", r"Activate the `\1` and `\2` skills", body_text)
    return body_text


def sync_skills(dry_run=False):
    """
    Sync skills from ~/.pi/agent/skills/ to ~/.gemini/config/skills/
    """
    pi_skills_dir = PI_AGENT_DIR / "skills"
    if not pi_skills_dir.exists():
        print(f"[-] Source skills directory not found: {pi_skills_dir}")
        return []

    synced_skills = []

    for item in sorted(pi_skills_dir.iterdir()):
        if not item.is_dir() or item.name.startswith("."):
            continue

        raw_name = item.name
        skill_name = SKILL_NAME_OVERRIDES.get(raw_name, raw_name)
        target_skill_dir = GEMINI_SKILLS_DIR / skill_name
        skill_file = item / "SKILL.md"

        if not skill_file.exists():
            continue

        if dry_run:
            print(f"[Dry-run] Would sync skill: {raw_name} -> {target_skill_dir}")
            synced_skills.append(skill_name)
            continue

        target_skill_dir.mkdir(parents=True, exist_ok=True)

        raw_content = skill_file.read_text(encoding="utf-8")
        clean_content = clean_frontmatter(raw_content, default_name=skill_name)
        clean_content = adapt_tool_references(clean_content)

        if skill_name == "research-topic":
            clean_content = clean_content.replace(
                "Do the research sequentially in this session",
                "Investigate primary sources. You may delegate broad research to the `research` subagent via `invoke_subagent`, or perform targeted lookups directly"
            )

        if skill_name == "grilling":
            if "ask_question" not in clean_content:
                clean_content += "\n\n## Antigravity Interactive Integration\nIn Antigravity, you can use the `ask_question` tool to render structured multiple-choice question sets for the user, or suggest the `/grill-me` slash command.\n"

        target_skill_file = target_skill_dir / "SKILL.md"
        target_skill_file.write_text(clean_content, encoding="utf-8")

        # Copy auxiliary markdown references & scripts (skip agents/ and __pycache__)
        for sub_item in item.iterdir():
            if sub_item.name in ("SKILL.md", "agents", "__pycache__"):
                continue
            dest = target_skill_dir / sub_item.name
            if sub_item.is_dir():
                if dest.exists():
                    shutil.rmtree(dest)
                shutil.copytree(sub_item, dest, ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))
            else:
                shutil.copy2(sub_item, dest)

        print(f"[+] Synced skill: {skill_name} -> {target_skill_dir}")
        synced_skills.append(skill_name)

    return synced_skills


def sync_prompts(dry_run=False):
    """
    Sync prompt workflows from ~/.pi/agent/prompts/ to ~/.gemini/config/skills/
    """
    pi_prompts_dir = PI_AGENT_DIR / "prompts"
    if not pi_prompts_dir.exists():
        print(f"[-] Source prompts directory not found: {pi_prompts_dir}")
        return []

    synced_prompts = []

    for prompt_file in sorted(pi_prompts_dir.iterdir()):
        if not prompt_file.is_file() or not prompt_file.name.endswith(".md"):
            continue

        prompt_info = PROMPT_MAP.get(prompt_file.name)
        if not prompt_info:
            stem = prompt_file.stem
            prompt_info = {
                "name": stem,
                "description": f"Workflow for {stem}.",
                "title": stem.replace("-", " ").title()
            }

        skill_name = prompt_info["name"]
        description = prompt_info["description"]
        title = prompt_info["title"]
        target_skill_dir = GEMINI_SKILLS_DIR / skill_name
        target_file = target_skill_dir / "SKILL.md"

        if dry_run:
            print(f"[Dry-run] Would convert prompt {prompt_file.name} -> {target_file}")
            synced_prompts.append(skill_name)
            continue

        raw_content = prompt_file.read_text(encoding="utf-8")

        body = raw_content
        match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw_content, re.DOTALL)
        if match:
            body = match.group(2).strip()

        body = adapt_tool_references(body)

        skill_content = f"""---
name: {skill_name}
description: >-
  {description}
---

# {title}

{body}
"""
        target_skill_dir.mkdir(parents=True, exist_ok=True)
        target_file.write_text(skill_content, encoding="utf-8")
        print(f"[+] Converted prompt to skill: {skill_name} (/{skill_name})")
        synced_prompts.append(skill_name)

    return synced_prompts


def validate_all_skills():
    """
    Validates all skills in ~/.gemini/config/skills/
    """
    issues = []
    skill_count = 0

    if not GEMINI_SKILLS_DIR.exists():
        return 0, ["Skills directory does not exist."]

    for sdir in sorted(GEMINI_SKILLS_DIR.iterdir()):
        if not sdir.is_dir() or sdir.name.startswith("."):
            continue

        skill_count += 1
        skill_file = sdir / "SKILL.md"
        if not skill_file.exists():
            issues.append(f"Skill '{sdir.name}': Missing SKILL.md")
            continue

        content = skill_file.read_text(encoding="utf-8")
        match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
        if not match:
            issues.append(f"Skill '{sdir.name}': Missing or malformed YAML frontmatter")
            continue

        fm = match.group(1)
        body = match.group(2).strip()

        if "name:" not in fm:
            issues.append(f"Skill '{sdir.name}': Frontmatter missing 'name'")
        if "description:" not in fm:
            issues.append(f"Skill '{sdir.name}': Frontmatter missing 'description'")
        if len(body) < 10:
            issues.append(f"Skill '{sdir.name}': SKILL.md body is suspiciously short or empty")

    return skill_count, issues


def main():
    parser = argparse.ArgumentParser(description="Sync Pi coding harness to Antigravity Gemini")
    parser.add_argument("--dry-run", action="store_true", help="Audit what would be synced without writing files")
    parser.add_argument("--validate-only", action="store_true", help="Only validate existing Antigravity skills")
    args = parser.parse_args()

    print("==================================================")
    print("  Pi -> Antigravity Gemini Coding Harness Sync    ")
    print("==================================================")

    if args.validate_only:
        count, issues = validate_all_skills()
        print(f"Total skills checked: {count}")
        if issues:
            print("Validation issues found:")
            for issue in issues:
                print(f"  - {issue}")
            sys.exit(1)
        else:
            print("All skills validated successfully!")
            sys.exit(0)

    print("\n--- 1. Synchronizing Memory (AGENTS.md / GEMINI.md) ---")
    sync_memory(dry_run=args.dry_run)

    print("\n--- 2. Synchronizing Pi Skills ---")
    synced_skills = sync_skills(dry_run=args.dry_run)
    print(f"Total skills synced: {len(synced_skills)}")

    print("\n--- 3. Synchronizing Pi Prompts (as Antigravity Skills) ---")
    synced_prompts = sync_prompts(dry_run=args.dry_run)
    print(f"Total prompts synced: {len(synced_prompts)}")

    if not args.dry_run:
        print("\n--- 4. Validating Antigravity Skills ---")
        total_count, issues = validate_all_skills()
        print(f"Total skills currently installed in Antigravity: {total_count}")
        if issues:
            print(f"[!] Validation found {len(issues)} issues:")
            for issue in issues:
                print(f"  - {issue}")
        else:
            print("[+] All skills passed Antigravity validation!")

    print("\nSync completed successfully.")


if __name__ == "__main__":
    main()
