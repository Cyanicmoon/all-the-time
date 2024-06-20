import MealInfo from "../component/MealInfo";
import Error from "../error";

export const dynamic = 'force-dynamic';

export default async function Meal(){

    let meal = new Array(3);

    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const korNow = new Date(utc+koreaTimeDiff);

    let format = korNow.getFullYear() + '-' 
    + ('0'+(korNow.getMonth()+1)).slice(-2) + '-'
    + ('0'+korNow.getDate()).slice(-2);

    await fetch("https://api.xn--299a1v27nvthhjj.com/meal/"+format)
    .then(r=>r.json())
    .then((result)=>{
        meal[0] = result.breakfast.split("/");
        meal[1] = result.lunch.split("/");
        meal[2] = result.dinner.split("/");
    })
    .catch((e)=>{
        return(
            <Error></Error>
        )
    });

    return(
        <MealInfo meal={meal}></MealInfo>
    )
}