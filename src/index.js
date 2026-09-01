export default {
  async fetch(request, env) {
    const origin = env.OPEN_WEBUI_ORIGIN;

    if (!origin) {
      return new Response("OPEN_WEBUI_ORIGIN is not configured.", { status: 500 });
    }

    try {
      const incomingUrl = new URL(request.url);
      const originUrl = new URL(origin);

      originUrl.pathname = incomingUrl.pathname;
      originUrl.search = incomingUrl.search;

      const proxyRequest = new Request(originUrl.toString(), request);
      return await fetch(proxyRequest);
    } catch (error) {
      return new Response("Unable to reach the local Open WebUI instance.", { status: 502 });
    }
  }
};
