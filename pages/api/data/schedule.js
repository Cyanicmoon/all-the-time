import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response){
    
    try{
        request.body = JSON.parse(request.body);

        const Timetable = require('comcigan-parser');
        const timetable = new Timetable();

        const schoolFinder = (schoolName, region) => (schoolList) => {
            const targetSchool = schoolList.find((school) => {
                return school.region === region && school.name.includes(schoolName);
            });
            return targetSchool;
        };

        let result;
        
        timetable
            .init({ cache: 1000 * 60 * 60 })
            .then(() => timetable.search('한국디지털미디어고등학'))
            .then(schoolFinder('한국디지털미디어고등학', '경기'))
            .then((school) => timetable.setSchool(school.code))
            .then(() => {
            Promise.all([timetable.getClassTime(), timetable.getTimetable()]).then((res) => {
                try{
                    result = res[1][request.body.grade][request.body.class];
                    return response.status(200).json(result);
                }
                catch(e){
                    return response.status(500).json("BOOM")
                }
            });
        });
    }
    catch(e){
        return response.status(500).json("BOOM")
    }

    // from https://github.com/leegeunhyeok/comcigan-parser
}