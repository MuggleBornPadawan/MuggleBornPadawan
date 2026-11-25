---
name: conversations
description: >-
  Manage local Antigravity conversations programmatically over HTTP+JSON:
  create a new conversation (with an optional initial prompt), list
  conversations, read conversation metadata and run state, rename, archive,
  pin, star, tag, or group conversations, and delete conversations. Use when
  the user asks to list, rename, pin, star, archive, delete, or start
  conversations, including the current one, or when a script, plugin, or
  automation needs to manage conversations outside of subagent tool calls.
disable-slash-command: true
---

# Conversations API

The running Antigravity language server exposes `ConversationService` over
Connect HTTP+JSON, allowing shell commands, scripts, plugins, and automations
to create, inspect, organize, and delete local conversations.

> [!NOTE] **Scope & Related Tools**: Do not use `ConversationService` to spawn
> or message subagents inside an active agent turn — use `invoke_subagent` and
> `send_message` instead.

## Calling `ConversationService`

Shell commands the agent runs receive the server address in
`ANTIGRAVITY_LS_ADDRESS` (`host:port`, no scheme) and a CSRF token in
`ANTIGRAVITY_CSRF_TOKEN`. Send `POST` requests to:

```text
http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/<Method>
```

Always include these headers:

- `-H "Content-Type: application/json"`
- `-H "Connect-Protocol-Version: 1"`
- `-H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN"`

The calling conversation's own ID is in `ANTIGRAVITY_CONVERSATION_ID`; pass it
as `conversationId` when the user means the current conversation.

The server runs on this machine. If the terminal sandbox blocks a call (the
request is refused, cannot connect, or returns `"Port ... not allowed for HTTP"`
/ HTTP 403), rerun only that command outside the sandbox, which may ask the user
for approval.

## Methods

### `CreateConversation`

Creates a conversation and optionally submits an initial text prompt. When
`prompt` is omitted or empty, the conversation is created empty and idle.

```bash
curl -sS -X POST \
  "http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/CreateConversation" \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN" \
  -d '{
    "title": "Nightly test triage",
    "model": "flash",
    "tags": ["automation"],
    "prompt": [{"text": "Run the test suite and summarize any failures."}]
  }'
```

Request fields (all optional):

- `projectId` (`string`): Project to create the conversation in. The server
  does not infer the caller's project: to use the calling conversation's
  project, pass `$ANTIGRAVITY_PROJECT_ID`, which is set in the agent's shell
  when that conversation belongs to a project (keep the JSON body single-quoted
  and splice only the variable, e.g.
  `'{"projectId": "'"$ANTIGRAVITY_PROJECT_ID"'", ...}'`, or pass its literal
  value).
- `environmentId` (`string`): Execution environment within `projectId`
  (`projectId` is required when `environmentId` is set). Defaults to the
  project's default environment.
- `title` (`string`): User-visible title. When omitted, the agent generates
  `state.summary` from the conversation contents.
- `tags` (`string[]`): Client labels recorded in `metadata.tags` (filterable in
  `ListConversations`).
- `model` (`string`): Model tier alias (`"flash_lite"`, `"flash"`, `"pro"`) or
  model ID. Defaults to `"flash"`.
- `prompt` (`object[]`): Initial user prompt items (`[{"text": "..."}]`) sent
  immediately after creation.

Returns `{"conversation": <Conversation>}`.

### `ListConversations`

Lists interactive conversations, most recently modified first. Archived
conversations and agent-started child conversations are omitted by default.

```bash
curl -sS -X POST \
  "http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/ListConversations" \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN" \
  -d '{"pageSize": 20, "includeArchived": false}'
```

Request fields (all optional):

- `pageSize` (`number`): Maximum results to return (default `20`, max `100`).
- `pageToken` (`string`): `nextPageToken` from a prior call (all other filter
  fields must match the call that produced the token).
- `projectId` (`string`): Only return conversations in this project.
- `parentConversationId` (`string`): Only return conversations started by this
  conversation ID, or `""` for top-level conversations with no parent.
- `tags` (`string[]`): Only return conversations whose `metadata.tags` contain
  all listed tags.
- `includeArchived` (`boolean`): Also return conversations with
  `annotations.archived` set to `true`.

Returns `{"conversations": [<Conversation>, ...], "nextPageToken": "..."}`.

### `GetConversation`

Reads a single conversation's metadata, user annotations, and current run
state.

```bash
curl -sS -X POST \
  "http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/GetConversation" \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN" \
  -d '{"conversationId": "<conversation-id>"}'
```

Returns a `Conversation` object:

- `id` (`string`): Unique conversation identifier.
- `metadata`: Immutable creation properties (`createTime`, `projectId`,
  `environmentId`, `parentConversationId`, `rootConversationId`, `tags`).
- `annotations`: User-editable properties (`title`, `tags`, `archived`,
  `pinned`, `starred`, `conversationGroupId`).
- `state`: Agent-derived state:
  - `summary` (`string`): Short auto-generated description (display fallback
    when `annotations.title` is empty).
  - `runState` (`string`): `"RUN_STATE_IDLE"`, `"RUN_STATE_RUNNING"`, or
    `"RUN_STATE_CANCELLING"`.
  - `updateTime` (`string`): RFC 3339 timestamp of the last update.

### `UpdateConversation`

Updates user-editable `annotations` on a conversation. Unset fields are
preserved.

```bash
curl -sS -X POST \
  "http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/UpdateConversation" \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN" \
  -d '{
    "conversationId": "<conversation-id>",
    "annotations": {"title": "Auth refactor", "pinned": true}
  }'
```

Request fields:

- `conversationId` (`string`, required): Conversation to update.
- `annotations` (`object`, required): Partial update; any subset of:
  - `title` (`string`): Custom conversation title.
  - `archived` (`boolean`): `true` to archive, `false` to unarchive.
  - `pinned` (`boolean`): `true` to pin, `false` to unpin.
  - `starred` (`boolean`): `true` to star, `false` to unstar.
  - `tags` (`string[]`): User labels; when non-empty, replaces
    `annotations.tags`.
  - `conversationGroupId` (`string`): Group ID; set `""` to clear the group, or
    omit to leave unchanged.

Returns the updated `Conversation`.

### `DeleteConversation`

Permanently deletes a conversation and all of its contents. This cannot be
undone — to hide a conversation while keeping its transcript, set
`"archived": true` via `UpdateConversation` instead.

```bash
curl -sS -X POST \
  "http://$ANTIGRAVITY_LS_ADDRESS/jetski.product.v1.ConversationService/DeleteConversation" \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -H "x-antigravity-csrf-token: $ANTIGRAVITY_CSRF_TOKEN" \
  -d '{"conversationId": "<conversation-id>"}'
```
