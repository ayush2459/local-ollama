#!/bin/bash
set -e

# Start the bundled Ollama server in the background.
ollama serve > /tmp/ollama.log 2>&1 &

# Wait until Ollama is ready.
until ollama list >/dev/null 2>&1; do
  sleep 1
done

# Ensure the lightweight test model is available after Render restarts.
ollama pull llama3.2:1b

# Start Open WebUI using the image's standard startup script.
exec bash start.sh
