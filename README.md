# Local Ollama + Open WebUI

A reproducible local AI setup using **Ollama on the host machine** and **Open WebUI in Docker**.

## Architecture

```text
Browser
   |
   v
Open WebUI :3015 (Docker)
   |
   | host.docker.internal:11434
   v
Ollama (macOS host)
   |
   v
Local LLM models
```

## Requirements

- Ollama installed and running on the host machine
- Docker Desktop
- macOS, Linux, or Windows with Docker Desktop

## Start

Clone the repository, then run:

```bash
cp .env.example .env
docker compose up -d
```

Open:

```text
http://localhost:3015
```

The Compose configuration connects Open WebUI to Ollama through `host.docker.internal:11434`.

## Verify Ollama

On macOS/Linux:

```bash
ollama list
```

For example, to download the model used during development:

```bash
ollama pull llama3.1:8b
```

Then select the model in Open WebUI.

## Stop

```bash
docker compose down
```

Do **not** use `docker compose down -v` unless you intentionally want to remove the persistent Open WebUI volume.

## Important

This repository does **not** contain downloaded model weights, Ollama itself, Docker volumes, chats, or secrets. These remain local runtime data and should not be committed to Git.

## Public deployment

This repository describes the local setup. A cloud deployment cannot use `localhost` or `host.docker.internal` to reach Ollama running on your Mac. A public version therefore needs a remotely reachable inference backend.
