import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const resourcePath = path.join(process.cwd(), 'assets')

export function loadDocument(
    file: string[]
)
{
    const filePath = path.join(resourcePath, 'srd', ...file);
    const markdownDoc = `${filePath}.md`;
    const jsonDoc = `${filePath}.json`;
    let type = 'error';
    let content: string | object = `Document '${file}' not found`;
    let title = 'Error';

    if (fs.existsSync(markdownDoc)) {
        const contents = matter(fs.readFileSync(markdownDoc, 'utf8'))
        type = 'md';
        content = contents.content;
        title = contents.data.title;
    } else if (fs.existsSync(jsonDoc)) {
        const contents = JSON.parse(fs.readFileSync(jsonDoc, 'utf8'))
        type = 'json';
        content = contents;
        title = contents.title;
    } 

    return { 
        type, 
        content,
        title
    }
}

export function loadSidebar(): {}
{
    return JSON.parse(fs.readFileSync(path.join(resourcePath, 'structure', `sidebar.json`), 'utf8'));
}
