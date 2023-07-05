import fs from 'fs';
import path from 'path';

const resourcePath = path.join(process.cwd(), 'assets')

export function loadDocument(
    file: string[]
)
{
    const filePath = path.join(resourcePath, 'srd', ...file);
    const markdownDoc = `${filePath}.md`;
    const jsonDoc = `${filePath}.json`;
    if (fs.existsSync(markdownDoc)) {
        return { type: 'doc', data: fs.readFileSync(markdownDoc, 'utf8') }
    } else if (fs.existsSync(jsonDoc)) {
        return { type: 'json', data: fs.readFileSync(jsonDoc, 'utf8') }
    } else {
        return { type: 'error', data: `Document '${file}' not found` };
    }
}

export function loadSidebar(): {}
{
    return JSON.parse(fs.readFileSync(path.join(resourcePath, 'structure', `sidebar.json`), 'utf8'));
}
