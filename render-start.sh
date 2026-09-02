#!/bin/bash
set -e

export OLLAMA_HOST=127.0.0.1:11434
export OLLAMA_BASE_URL=http://127.0.0.1:11434

# Start Ollama internally
ollama serve > /tmp/ollama.log 2>&1 &

# Wait for Ollama to become ready
until ollama list >/dev/null 2>&1; do
    sleep 1
done

# Download the model in the background.
# Do NOT block Open WebUI startup.
(
    if ! ollama list | grep -q "llama3.2:1b"; then
        ollama pull llama3.2:1b
    fi
) > /tmp/model-pull.log 2>&1 &

# Start Open WebUI immediately on port 8080
exec bash start.sh
