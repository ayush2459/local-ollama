FROM ghcr.io/open-webui/open-webui:ollama

ENV USE_OLLAMA_DOCKER=false \
    OLLAMA_HOST=0.0.0.0:11434 \
    OLLAMA_BASE_URL=http://127.0.0.1:11434 \
    OLLAMA_KEEP_ALIVE=5m \
    OLLAMA_NUM_PARALLEL=1 \
    OLLAMA_MAX_LOADED_MODELS=1 \
    OLLAMA_CONTEXT_LENGTH=2048

COPY render-start.sh /render-start.sh
RUN chmod +x /render-start.sh

EXPOSE 8080

ENTRYPOINT ["/render-start.sh"]
