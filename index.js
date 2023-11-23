const { DateTime } = require('luxon');
const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

async function commitDates(startDateStr) {
    let currentDate = DateTime.fromISO(startDateStr);
    const endDate = DateTime.local().minus({ days: 1 });

    while (currentDate <= endDate) {
        let formattedDate = currentDate.toISO();
        const data = {
            date: formattedDate,
        };
        if (Math.random() < 0.7) {
            jsonfile.writeFileSync(FILE_PATH, data);
            console.log(jsonfile.readFileSync(FILE_PATH, 'utf8'));
            await simpleGit().add([FILE_PATH]).commit(formattedDate, { '--date': currentDate.toRFC2822() }).push();
        }
        currentDate = currentDate.plus({ days: 1 });
    }
}

commitDates('2023-11-11T00:10:10.000+03:00');
