import fs from 'fs'

export default function removeFile(filePath) {
    fs.unlinkSync(filePath)
}
