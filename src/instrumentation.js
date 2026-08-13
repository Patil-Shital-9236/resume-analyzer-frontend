export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const serviceName = process.env.OTEL_SERVICE_NAME || "resume-analyzer-frontend";
    const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";
    console.log(`📡 OpenTelemetry (OTel) OTLP Exporter registered for Next.js service: ${serviceName} -> ${otlpEndpoint}`);
  }
}
