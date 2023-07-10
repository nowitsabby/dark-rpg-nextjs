import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const resourcePath = path.join(process.cwd(), 'assets')

export const DOC_TYPES = {
    ERROR: 0,
    PAGE: 1,
    TABLE: 2,
    ENTRY: 3
}

export function loadDocument( file: string[] )
{
    const filePath = path.join(resourcePath, 'srd', ...file);
    const markdownDoc = `${filePath}.md`;
    const jsonDoc = `${filePath}.json`;
    let type = DOC_TYPES.ERROR;
    let content: string | object = `Document '${file}' not found`;
    let id: string = '';

    if (fs.existsSync(markdownDoc)) {
        type = DOC_TYPES.PAGE;
        content = matter(fs.readFileSync(markdownDoc, 'utf8')).content;
    } else if (fs.existsSync(jsonDoc)) {
        type = DOC_TYPES.TABLE;
        content = JSON.parse(fs.readFileSync(jsonDoc, 'utf8'));
    } else {
        // check if parent is table
        const parentPath = path.join(filePath, '../').slice(0, -1)

        const parentJson = `${parentPath}.json`;
        if (fs.existsSync(parentJson)) {
            type = DOC_TYPES.ENTRY;
            id = path.relative(parentPath, filePath);
            content = JSON.parse(fs.readFileSync(parentJson, 'utf8'))
        } else {
            // check if parent's parent is table
            const ancestorPath = path.join(parentPath, '../').slice(0, -1)
            const ancestorJson = `${ancestorPath}.json`;
            if (fs.existsSync(ancestorJson)) {
                type = DOC_TYPES.ENTRY;
                id = path.relative(ancestorPath, filePath);
                content = JSON.parse(fs.readFileSync(ancestorJson, 'utf8'))
            }
        }
    }

    return { 
        type, 
        content,
        id
    }
}

export function loadSidebar(): {}
{
    return JSON.parse(fs.readFileSync(path.join(resourcePath, 'structure', `sidebar.json`), 'utf8'));
}
