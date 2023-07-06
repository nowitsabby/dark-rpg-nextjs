const fs = require('fs')
const path = require('path')
const matter = require('gray-matter');

const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

function getMarkdownData(fileContents) {
  const matterContents = matter(
    fileContents, 
    {
      excerpt: (file, _) => {
        file.excerpt = file.content.split('\n').slice(0, 3).join(' '); // skip header
      }
    })
  
  return {
    title: matterContents.data.title,
    content: matterContents.content,
    excerpt: matterContents.excerpt
  }
}

function getJsonData(fileContents) {
  const jsonContents = JSON.parse(fileContents)

  return {
    title: jsonContents.title,
    content: JSON.stringify(jsonContents.data),
    excerpt: jsonContents.info.split('\n').slice(0, 3).join(' ') // skip header
  }
}

function getSrdPages() {
    const srdDirectory = path.join(process.cwd(), 'assets', 'srd' ) //retrieving the srd directory path
    const fileNames = getAllFiles(srdDirectory) // getting the names of the files
    const posts = fileNames.map((fileName) => {
      const extension = fileName.split('.').pop();
      
      const relativeFilePath = path.relative(srdDirectory, fileName);
      const srdPath = relativeFilePath
      .replace(/\.md$/, '')
      .replace(/\.json$/, '')
      .replaceAll('\\', '/') //getting rid of the extension
      
      const fullPath = path.join(srdDirectory, relativeFilePath) //creating the full path of the file
      
      const fileContents = fs.readFileSync(fullPath, 'utf8') //getting the contents of the file
      
      let contents = {}
      if (extension === 'md') {
        contents = getMarkdownData(fileContents)
      } else if (extension === 'json') {
        contents = getJsonData(fileContents)
      } else {
        return
      }

      console.log(srdPath)
      return {
        srdPath,
        title: contents.title,
        content: contents.content,
        excerpt: contents.excerpt
      }
    });

    return JSON.stringify(posts)
}

try {
    fs.readdirSync('cache')
} catch (e) {
    fs.mkdirSync('cache')
}
// if cache directory exists, ok else create it


fs.writeFile('cache/pages.json', getSrdPages(), function (err) { // writing to the cache/pages.json file
    if (err) {
        return console.log(err);
    }
    console.log("Pages cached.");
})
