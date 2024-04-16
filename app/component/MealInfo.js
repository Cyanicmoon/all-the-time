"use client"

export default function MealInfo(props){

    return(
        <div className="meal-container">
            <div className="meal-temp">
                <div className="meal-info">
                    <div className="meal-item">
                        <h1>아침</h1>
                        {
                            props.meal[0].map((a, i)=>{
                                return(
                                    <p key={i}>{props.meal[0][i]}</p>
                                )
                            })
                        }
                    </div>

                    <div className="meal-item">
                        <h1>점심</h1>
                        {
                            props.meal[1].map((a, i)=>{
                                return(
                                    <p key={i}>{props.meal[1][i]}</p>
                                )
                            })
                        }
                    </div>

                    <div className="meal-item">
                        <h1>저녁</h1>
                        {
                            props.meal[2].map((a, i)=>{
                                return(
                                    <p key={i}>{props.meal[2][i]}</p>
                                )
                            })
                        }
                    </div>
                </div>
                
                <pre className="meal-from">출처 : https://디미고급식.com/</pre>
            </div>
        </div>
    )
}