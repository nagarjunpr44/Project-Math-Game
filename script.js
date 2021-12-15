const problemelement=document.querySelector(".problem")
const ourform=document.querySelector(".our-form")
const ourfield=document.querySelector(".our-field")
const pointsneeded=document.querySelector(".points-needed")
const mistakesallowed=document.querySelector(".mistakes-allowed")
const progressbar=document.querySelector(".progress-inner")
const endmessage=document.querySelector(".end-message")
const resetbutton=document.querySelector(".reset-button")

let state={
    score:0,
    wronganswers:0,
}

function updateproblem()
{
    state.currentproblem=generateproblem();
    problemelement.innerHTML=`${state.currentproblem.number1} ${state.currentproblem.operator} ${state.currentproblem.number2}`
    ourfield.value="";
    ourfield.focus();
}

updateproblem()

function generatenumber(max)
{
    return Math.floor(Math.random() * max+1)
}

function generateproblem()
{
    return {
        number1:generatenumber(10),
        number2:generatenumber(10),
        operator:['+','-','X'][generatenumber(2)]
            }
}
ourform.addEventListener("submit",handlesubmit)
    
    function handlesubmit(e)
 {
     e.preventDefault()

     let correctanswer;
     const p=state.currentproblem;
     if(p.operator=="+")correctanswer=p.number1 + p.number2;
     if(p.operator=="-")correctanswer=p.number1 - p.number2;
     if(p.operator=="X")correctanswer=p.number1 * p.number2;
        if(parseInt(ourfield.value,10)=== correctanswer)
        {
            state.score++;
            pointsneeded.textContent=10 - state.score;
            updateproblem();
            renderprogressbar();
        }
        else
        {
            state.wronganswers++;
            mistakesallowed.textContent=2-state.wronganswers;
        }
        checklogic()
    }   

    function checklogic() 
    {
        if(state.score=== 10)
        {
            endmessage.textContent="Congrats!you won."
            document.body.classList.add("overlay-is-open")
            setTimeout(()=>resetbutton.focus(),331)
        }
        if(state.wronganswers===3)
        {
            endmessage.textContent="Sorry! You Lost.";
            document.body.classList.add("overlay-is-open");
            setTimeout(()=>resetbutton.focus(),331)
            
        }    
    }
    resetbutton.addEventListener("click", resetgame)
    function resetgame()
    {
        document.body.classList.remove("overlay-is-open");
        updateproblem()
        state.score=0;
        state.wronganswers=0;
        pointsneeded.textContent=10;
        mistakesallowed.textContent=2;
        renderprogressbar()
    }
function renderprogressbar(){
    progressbar.style.transform=`scaleX(${state.score/10})`
}






















