export default Additem;


import { useEffect, useRef, useState } from "react";
import Listitem from "./Listitem";
import Finalresponse from "./Finalresponse";

import { GoogleGenerativeAI } from "@google/generative-ai";


function Additem(){

    const[item,addItem]=useState([]);
    const[response,setResponse]=useState(false);
    const refScrolling=useRef(null);

    useEffect(()=>{

        if(response && refScrolling.current){
            refScrolling.current.scrollIntoView();
        }
    },[response])

// function adding(){
    
//     const getVal=document.getElementById('ingredent').value;
//     document.getElementById('ingredent').value='';
//     addItem(preVal=>
//         [...preVal,getVal]
//     );
// }


function submitForm(formData){
    const itemVal=formData.get("item");
    console.log(itemVal);
    addItem(preVal=>[...preVal,itemVal]);
}

async function getResponse(e){
    // setResponse(preVal=>!preVal);
   
    // const apiValue=process.env.REACT_APP_GOOGLE_API_KEY;
  
    console.log(import.meta.env.VITE_APP_GOOGLE_API_KEY);
    e.preventDefault();
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GOOGLE_API_KEY); // Use process.env here
    const geminiQuery ="You are an assistant that recommends recipe based on the ingredients you have on hand. You have the following ingredients: "+item.join(", ")+". Please recommend a recipe.The recipe can include additional ingredients that are not listed., but try to not add too many extra ingredients. Format your response in markdown to make it easier to render in web pages.";
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(geminiQuery);
    const response = await result.response;
    console.log(response);
    const recipeMarkDown = response.text();
    console.log(recipeMarkDown)
    setResponse(recipeMarkDown)

    
}

    return(
        <>
            {/* moved to chef */}
            {/* <input type="text" id="ingredent" style={{margin:"10px"}}></input>
                <button onClick={adding}>ADD</button> */}

            {/* moved to Useinput */}
            <form action={submitForm}>
                <input type="text" name="item" placeholder="e.g. oregano" className="additem"></input>
                <button className="sumbititem">+Add Ingredint</button>
            </form>

            {/* <Useinput submitForm={submitForm}></Useinput> */}
            <section>
                {item.length>0&&
                        <div>
                            <h1>Ingredients on hand</h1>
                                <ul>
                           
                                    {item.map((val)=>
                                             <Listitem val={val}/> )}
                                </ul>
                        </div>
                        }

                        {item.length>=4&&
                        <div ref={refScrolling} className="readyfor">
                            <div className="recipe-container">
                                <div>
                            <h3>Ready for recipe?</h3>
                            <p>Generate a recipe from your list of ingredents</p>
                            </div>
                            <button className="button-getRecipe" onClick={getResponse}>Get a recipe</button>
                            </div>
                            
                        </div>
                        }

                        {response && <Finalresponse response={response}/>}

               
            </section>
            </>
    )
}