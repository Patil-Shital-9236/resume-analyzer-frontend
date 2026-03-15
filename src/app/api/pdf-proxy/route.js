export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return new Response("URL required", { status: 400 });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new Response(`Cloudinary error: ${response.status} ${response.statusText}`, { status: response.status });
    }
    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
      },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}