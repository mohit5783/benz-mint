import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image";
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    "Content-Type": "application/json",
  };
  let img_text = "";
  await req.json().then((r) => (img_text = r.text));
  const body = {
    width: 512,
    height: 512,
    steps: 50,
    seed: 0,
    cfg_scale: 10,
    samples: 1,
    style_preset: "enhance",
    text_prompts: [
      {
        text: img_text,
        weight: 1,
      },
    ],
  };
  console.log(body);
  try {
    const response = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    const responseJSON = await response.json();
    const base64String = responseJSON.artifacts[0].base64;

    return NextResponse.json({ message: base64String }, { status: 200 });
  } catch (error) {
    console.error("Error generating text to image:", error);
    return NextResponse.json(
      { message: `Error generating text to image ${error}` },
      { status: 500 }
    );
  }
}
