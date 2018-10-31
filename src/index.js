import 'dotenv/config'
import fs from 'fs'

import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4466')


/* 
console.log(dgmCourses.map(crs => {
    return {
        prefix: crs.prefix._text || '',
        subject: crs.subject._text || '',
        number: crs.number._text || '',
        crossListed: crs.crossListed._text || '',
        geCode: crs.geCode._text || '',
        title: crs.title._text || '',
        totalCredits: crs.totalCredits._text || '',
        lectureCredits: crs.lectureCredits._text || '',
        termsOffered: crs.termsOffered._text || '',
        prereq: crs.prereq._text || '',
        coreq: crs.coreq._text || '',
        preorco: crs.preorco._text || '',
        description: crs.description._text || ''
    }
})) */

const mutation = `mutation createCourse(
    $owner: UserCreateOneInput!,
    $prefix: String,
    $subject: String,
    $number: String,
    $crossListed: String,
    $geCode: String,
    $title: String!,
    $totalCredits: String,
    $lectureCredits: String,
    $termsOffered: String,
    $prereq: String,
    $coreq: String,
    $preorco: String,
    $description: String,
    ) {
        createCourse(
            data: {
                owner: $owner
                prefix: $prefix
                subject: $subject
                number: $number
                crossListed: $crossListed
                geCode: $geCode
                title: $title
                totalCredits: $totalCredits
                lectureCredits: $lectureCredits
                termsOffered: $termsOffered
                prereq: $prereq
                coreq: $coreq
                preorco: $preorco
                description: $description
            }
        )
        {
            id
            title
        }
    }`

    let count = 0

async function main() {
    const content = fs.readFileSync("./uvu_courses.json")
    const catalog = JSON.parse(content)
    const allCourses = catalog.comet.course
    const dgmCourses = allCourses.filter(course => course.prefix._text === 'DGM')

    for (let crs of dgmCourses) {
        count++
        const ownerEmail = 'admin@uvu.edu'
        let variables = {
            owner: {
                connect: {
                    email: ownerEmail
                }
            },
            prefix: crs.prefix._text || '',
            subject: crs.subject._text || '',
            number: crs.number._text || '',
            crossListed: crs.crossListed._text || '',
            geCode: crs.geCode._text || '',
            title: crs.title._text || '',
            totalCredits: crs.totalCredits._text || '',
            lectureCredits: crs.lectureCredits._text || '',
            termsOffered: crs.termsOffered._text || '',
            prereq: crs.prereq._text || '',
            coreq: crs.coreq._text || '',
            preorco: crs.preorco._text || '',
            description: crs.description._text || ''
        }
        await client
            .request(mutation, variables)
            .then(data => console.log(data))
            .catch(err => console.log(`${err} ${count}`))
    }
}
main()