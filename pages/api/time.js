export default async function handler(request, response){

    let today = new Date();

    let hours = ('0' + today.getHours()).slice(-2); 
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 

    let timeString = hours + '시 ' + minutes  + '분 ' + seconds + '초';

    if (request.method == "GET"){
        return response.status(200).json(timeString);
    }
}