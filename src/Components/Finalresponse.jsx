export default Finalresponse;

import Markdown from 'react-markdown';

function Finalresponse({response}){
    return(
        <>
        <section className='recipe-response'>
       <Markdown>{response}</Markdown>
       </section>
        </>
    )
}