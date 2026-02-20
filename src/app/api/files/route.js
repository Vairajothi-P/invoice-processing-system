import { readdir, stat } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
    try {
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure directory exists
        try {
            const files = await readdir(uploadDir);

            const fileDetails = await Promise.all(
                files.map(async (filename) => {
                    const filePath = path.join(uploadDir, filename);
                    const fileStat = await stat(filePath);

                    const ext = path.extname(filename).toLowerCase();
                    let type = 'other';
                    if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) type = 'image';
                    else if (ext === '.pdf') type = 'pdf';
                    else if (['.doc', '.docx', '.txt', '.xlsx'].includes(ext)) type = 'doc';

                    return {
                        id: fileStat.ino || Math.random(),
                        name: filename,
                        type: type,
                        size: (fileStat.size / (1024 * 1024)).toFixed(2) + " MB",
                        date: fileStat.mtime.toISOString().split('T')[0],
                        url: `/uploads/${filename}`,
                        isNative: true // Mark as uploaded via system
                    };
                })
            );

            return NextResponse.json(fileDetails);
        } catch (e) {
            // If dir doesn't exist, return empty list
            return NextResponse.json([]);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
