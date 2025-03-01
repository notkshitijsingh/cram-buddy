import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { selectedChapters } = body;

    const filePath = path.join(process.cwd(), 'utils', 'selected.json');
    const data = JSON.stringify({ selectedChapters }, null, 2);

    fs.writeFileSync(filePath, data);

    return new Response(JSON.stringify({ message: 'Data saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error saving data', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
