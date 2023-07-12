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

  const content = jsonContents.info.split('\n').slice(0, 3).join(' ')

  return {
    title: jsonContents.title,
    content,
    excerpt: content
  }
}

function getEntryData(data, srdPath) {
  if (Array.isArray(data)) {
    return data.map((datum) => {
      let content = datum.description ? datum.description : ''

      if (datum.prerequisites) {
        content += `Prerequisites: ${datum.prerequisites.join(', ')} `
      }

      if (datum.specialisations) {
        content += `Specialisations: ${datum.specialisations.join(', ')} `
      }

      if (datum.aptitudes) {
        content += `Aptitudes: ${datum.aptitudes.join(', ')} `
      }

      if (datum.descriptors) {
        content += `Descriptors: ${datum.descriptors.join(', ')} `
      }

      if (datum.special && Array.isArray(datum.special)) {
        datum.special.map((special) => content += `${special.title}: ${special.description} `)
      }

      if (datum.bonuses) {
        datum.bonuses.map((bonus) => content += `${bonus.title}: ${bonus.description} `)
      }

      if (datum.bonus) {
        content += `${datum.bonus.title}: ${datum.bonus.description} `
      }

      console.log(`${srdPath}/${datum.id}`)
      return {
        srdPath: `${srdPath}/${datum.id}`,
        title: datum.name,
        content,
        excerpt: content
      }
    })
  } else {
    // Special Cases
    const entryData = []
    if (data.talents) {
      entryData.push(...getEntryData(data.talents, srdPath))
    }

    if (data.plasmaDrives) {
      entryData.push(...getEntryData(data.plasmaDrives, `${srdPath}/plasma_drives`))
    }

    if (data.warpEngines) {
      entryData.push(...getEntryData(data.warpEngines, `${srdPath}/warp_engines`))
    }

    if (data.gellerFields) {
      entryData.push(...getEntryData(data.gellerFields, `${srdPath}/geller_fields`))
    }

    if (data.voidShields) {
      entryData.push(...getEntryData(data.voidShields, `${srdPath}/void_shields`))
    }

    if (data.bridges) {
      entryData.push(...getEntryData(data.bridges, `${srdPath}/bridges`))
    }

    if (data.lifeSustainers) {
      entryData.push(...getEntryData(data.lifeSustainers, `${srdPath}/life_sustainers`))
    }

    if (data.crewQuarter) {
      entryData.push(...getEntryData(data.crewQuarter, `${srdPath}/crew_quarter`))
    }

    if (data.augurArrays) {
      entryData.push(...getEntryData(data.augurArrays, `${srdPath}/augur_arrays`))
    }

    if (data.cargoHolds) {
      entryData.push(...getEntryData(data.cargoHolds, `${srdPath}/cargo_holds`))
    }

    if (data.passengerBays) {
      entryData.push(...getEntryData(data.passengerBays, `${srdPath}/passenger_bays`))
    }

    if (data.enhancements) {
      entryData.push(...getEntryData(data.enhancements, `${srdPath}/enhancements`))
    }

    if (data.facilities) {
      entryData.push(...getEntryData(data.facilities, `${srdPath}/facilities`))
    }

    if (data.macrobatteries) {
      entryData.push(...getEntryData(data.macrobatteries, `${srdPath}/macrobatteries`))
    }

    if (data.lances) {
      entryData.push(...getEntryData(data.lances, `${srdPath}/lances`))
    }

    if (data.novaCannons) {
      entryData.push(...getEntryData(data.novaCannons, `${srdPath}/nova_cannons`))
    }

    if (data.torpedoes) {
      entryData.push(...getEntryData(data.torpedoes, `${srdPath}/torpedoes`))
    }

    if (data.landingBays) {
      entryData.push(...getEntryData(data.landingBays, `${srdPath}/landing_bays`))
    }

    return entryData
  }
}

function getPosts(srdDirectory, fileNames) {
  const posts = []

  fileNames.forEach((fileName) => {
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
    posts.push({
      srdPath,
      title: contents.title,
      content: contents.content,
      excerpt: contents.excerpt
    })

    if (extension === 'json') {
      const jsonContents = JSON.parse(fileContents)
      if (jsonContents.data) {
        posts.push(...getEntryData(jsonContents.data, srdPath))
      }
    }
  });

  return posts
}

function getSrdPages() {
    const srdDirectory = path.join(process.cwd(), 'assets', 'srd' ) //retrieving the srd directory path
    const fileNames = getAllFiles(srdDirectory) // getting the names of the files

    return JSON.stringify(getPosts(srdDirectory, fileNames))
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
