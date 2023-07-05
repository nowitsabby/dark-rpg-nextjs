import { titleCase } from "title-case";

export default function toTitleCase(title: string) {
    return titleCase(title.replaceAll('/', ' | ')
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .trim());
}
