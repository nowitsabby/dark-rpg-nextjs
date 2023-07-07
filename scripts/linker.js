const fs = require('fs')
const path = require('path')
const matter = require('gray-matter');

function getAllFiles(dirPath, arrayOfFiles) {
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

function getOriginLinks() {
  const jsonPath = path.join(process.cwd(), 'assets', 'srd', 'character', 'origins.json')
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  return json.data.map((datum) => {
    return {
      term: datum.origin,
      path: `/character/origins#${datum.id}`
    }
  })
}

function getBackgroundLinks() {
  const jsonPath = path.join(process.cwd(), 'assets', 'srd', 'character', 'backgrounds.json')
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  return json.data.map((datum) => {
    return {
      term: datum.background,
      path: `/character/backgrounds#${datum.id}`
    }
  })
}

function getRoleLinks() {
  const jsonPath = path.join(process.cwd(), 'assets', 'srd', 'character', 'roles.json')
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  return json.data.map((datum) => {
    return {
      term: datum.role,
      path: `/character/roles#${datum.id}`
    }
  })
}

function getSkillLinks() {
  const jsonPath = path.join(process.cwd(), 'assets', 'srd', 'skills', 'list.json')
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  return json.data.map((datum) => {
    return {
      term: datum.skill,
      path: `/skills/list#${datum.id}`
    }
  })
}

function getTalentLinks() {
  const jsonPath = path.join(process.cwd(), 'assets', 'srd', 'talents', 'list.json')
  
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  return json.data.map((datum) => {
    return {
      term: datum.talent,
      path: `/talents/list#${datum.id}`
    }
  })
}

function getCharacteristicLinks() {
  return [
    {
      term: 'Weapon Skill',
      path: '/characteristics#weapon-skill-bs-'
    },
    {
      term: 'Ballistic Skill',
      path: '/characteristics#ballistic-skill-bs-'
    },
    {
      term: 'Strength',
      path: '/characteristics#strength-s-'
    },
    {
      term: 'Toughness',
      path: '/characteristics#toughness-t-'
    },
    {
      term: 'Agility',
      path: '/characteristics#agility-ag-'
    },
    {
      term: 'Intelligence',
      path: '/characteristics#intelligence-int-'
    },
    {
      term: 'Perception',
      path: '/characteristics#perception-per-'
    },
    {
      term: 'Willpower',
      path: '/characteristics#willpower-wp-'
    },
    {
      term: 'Fellowship',
      path: '/characteristics#fellowship-fel-'
    },
    {
      term: 'Influence',
      path: '/characteristics#influence-infamy-inf-'
    },
    {
      term: 'Infamy',
      path: '/characteristics#influence-infamy-inf-'
    }
  ]
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
