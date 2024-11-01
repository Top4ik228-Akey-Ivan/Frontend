import Main from './components/main'
import Result from './components/result'
import { useState } from "react";

const data = [
  {
      title: 'Сколько героев в доте?',
      answers: ['99', '100','101'],
      correct: '2'
  },
  {
      title: 'Какой моq любимый герой?',
      answers: ['Invoker', 'Phanton Assasin','Magnus'],
      correct: '0'  
  },
  {
      title: 'Сколько у меня игр в доте?',
      answers: ['2к', '3к','4к'],
      correct: '2'
  }
]



function App() {
    const [step, setStep] = useState(0)
    const [correct, setcorrect] =useState(0)
    const vopros = data[step]

    const onClickVariant = (index) => {
        console.log(step, index)
        setStep(step + 1)
        if (index == vopros.correct) {
            setcorrect(correct+1)
        }
    }

    console.log(vopros)
    return (
        <div className="App">
        {step !== data.length ? <Main vopros={vopros} onClickVariant={onClickVariant} step={step} data={data}/> : <Result correct={correct} data={data}/>}
        </div>
    );
}

export default App;