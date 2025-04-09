export default Useinput;



function Useinput(submitForm){
    return(
        <form action={submitForm}>
                <input type="text" name="item" placeholder="e.g. oregano" className="additem"></input>
                <button className="sumbititem">+Add Ingredint</button>
            </form>
    )
}