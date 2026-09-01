# Local Ollama + Open WebUI

A reproducible local AI stack using Ollama and Open WebUI.

## What this repository provides

- Ollama as the local model server
- Open WebUI as the browser interface
- Docker Compose for repeatable setup
- Persistent Docker volumes for models and WebUI data

## Requirements

- Docker Desktop
- macOS, Linux, or Windows with Docker Desktop

## Start

```bash
cp .env.example .env
docker compose up -d
```

Open:

http://localhost:3015

## Download a model

For example:

```bash
docker exec -it ollama ollama pull llama3.1:8b
```

Then select `llama3.1:8b` in Open WebUI.

## Stop

```bash
docker compose down
```

The named Docker volumes remain intact, so models and WebUI data are preserved.

## Architecture

```text
Browser
   |
   v
Open WebUI :3015
   |
   | Ollama API :11434
   v
Ollama
   |
   v
Local LLM models
```

## Important

This repository intentionally does **not** contain downloaded model weights or Docker volumes. Those are large local runtime data and should not be committed to Git.

## Public deployment

The local stack is intended for development and local/private use. A public deployment needs a remotely reachable model/API backend; `localhost` and Docker host networking cannot be used by a cloud-hosted frontend to reach your Mac.

For a free public demo, use a lightweight web frontend with a free/available inference API or a platform-supported inference backend rather than trying to host a full 8B Ollama model on free CPU infrastructure.
