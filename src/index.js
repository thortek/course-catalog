import 'dotenv/config'
import fs from 'fs'

const content = fs.readFileSync("./uvu_courses.json");
const catalog = JSON.parse(content)

const allCourses = catalog.comet.course

const result = allCourses.filter(course => course.prefix._text === 'DGM');

console.log(result.length)