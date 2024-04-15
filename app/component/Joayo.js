export default function Joayo(props){

    return(
        <button onClick={(e)=>{
            fetch("/api/post/delete", {
                method : "POST",
                body : props.post[i]._id
            })
            
            .then((r)=>{
                if (r.status == 200){
                    
                }
                else{
                    
                }
            })
            .then((r)=>{
                //성공시 실행
                
            })
            .catch((error)=>{
                
            })


            // fetch("/api/abc/lati")
        }}>👍 공감 { props.good }</button>
    )
}