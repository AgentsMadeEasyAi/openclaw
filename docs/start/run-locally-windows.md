# Run OpenClaw locally (Windows)

Use this to **test that OpenClaw is running** and **how to use it** from the repo on Windows.

## 1. Test that it’s running

From the project root (`c:\Users\Hp\Downloads\openclaw`), run in PowerShell:

```powershell
# Version (confirms CLI works)
node openclaw.mjs --version

# Help (lists all commands)
node openclaw.mjs --help

# Health check (needs gateway running; see below)
node openclaw.mjs doctor
```

If you see a version (e.g. `2026.2.1`) and help text, the CLI is running.

## 2. First-time setup (one-time)

Run the onboarding wizard so OpenClaw has config, workspace, and (optionally) channels and skills:

```powershell
node openclaw.mjs onboard
```

Follow the prompts. You can skip installing a daemon on Windows and just run the gateway manually (next step).

## 3. How to use it

### Run the gateway (required for messages and agent)

In a terminal, keep this running:

```powershell
cd c:\Users\Hp\Downloads\openclaw
node openclaw.mjs gateway --port 18789 --verbose
```

Leave this window open. The gateway is the “server” that handles channels and the agent.

### Check status

In **another** terminal:

```powershell
cd c:\Users\Hp\Downloads\openclaw
node openclaw.mjs status
```

Shows channel health and recent sessions. If the gateway isn’t running, this will fail or show errors.

### Send a message (after a channel is connected)

Once you’ve connected a channel (e.g. WhatsApp Web or Telegram) via onboarding or `node openclaw.mjs config`:

```powershell
node openclaw.mjs message send --to +1234567890 --message "Hello from OpenClaw"
```

Replace `+1234567890` with a real number or target for your channel.

### Talk to the agent

```powershell
node openclaw.mjs agent --message "What can you do?"
```

Optional: send the reply to a channel (e.g. WhatsApp):

```powershell
node openclaw.mjs agent --to +1234567890 --message "Summarize my day" --deliver
```

### Open the Control UI (dashboard)

With the gateway running:

```powershell
node openclaw.mjs dashboard
```

Opens the web UI in your browser.

## 4. Quick reference

| Goal                    | Command                                              |
|-------------------------|------------------------------------------------------|
| Test CLI                | `node openclaw.mjs --version`                        |
| Setup wizard            | `node openclaw.mjs onboard`                          |
| Run gateway             | `node openclaw.mjs gateway --port 18789 --verbose`   |
| Check health            | `node openclaw.mjs doctor` or `node openclaw.mjs status` |
| Send message            | `node openclaw.mjs message send --to <target> --message "..."` |
| Ask agent               | `node openclaw.mjs agent --message "..."`            |
| Open dashboard          | `node openclaw.mjs dashboard`                        |

If you use pnpm: replace `node openclaw.mjs` with `pnpm openclaw` (or `npx pnpm@10.23.0 openclaw`).

Full docs: [Getting started](https://docs.openclaw.ai/start/getting-started), [CLI reference](https://docs.openclaw.ai/cli).
