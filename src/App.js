import { useState } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import Data from './data/Data';

function App() {
  // console.log('component rendered');
  const[boxes, setBoxes] = useState(Data.getBlankData())
  const[currIIndex, setCurrentIIndex] = useState(0)
  const[currJIndex, setCurrentJIndex] = useState(0)

  const boxesElements = []
  boxes.forEach((boxRow, i) => {
    boxRow.forEach((box, j) => {
      let className = decideClassName(box)
      boxesElements.push(
        <div key={box.id} className={className}>{box.letter}</div>
      )
    })
  });

  function onKeyPress(key) {
    //is alphabet
    if(key.length === 1 /* && key.match(/^[A-Za-z]+$/) */){ //commented pattern match as its not required  layout keyboard is used, key down event was misbehaving at one stage
      key = key.toUpperCase();
      // console.log(currIIndex);
      // console.log(boxes[currIIndex][currJIndex])
      if(!boxes[currIIndex][currJIndex].letter){
        let newBoxes = [...boxes]
        newBoxes[currIIndex][currJIndex] = {
          ...newBoxes[currIIndex][currJIndex],
          letter : key
        }
        let newIndex = (currJIndex + 1)
        if(newIndex === Data.NO_OF_LETTERS)
        newIndex = Data.NO_OF_LETTERS - 1
        //setting values directly without callback
        setBoxes(newBoxes)
        setCurrentJIndex(newIndex)
        //removed with callback code, it was misbehaving, two times increment of the index with just one click
      }
    }
    //else if is enter
    else if(key === 'Enter'){
      //make word from letters
      let word = ''
      boxes[currIIndex].forEach((box, j) => {
        if(box.letter)
          word += box.letter;
      })
      if(word.length < Data.NO_OF_LETTERS) {
        console.log('not enough letters')
        return
      }
      //process the word
      Data.checkWord(word, res => {
        console.log(res)
        if(res.status === Data.SUCCESS) {
          let newBoxes = [...boxes]
          res.results.forEach((item, i) => {
            newBoxes[currIIndex][i].color = item.color
          })
          setBoxes(newBoxes)
          let newIndex = currIIndex + 1
          setCurrentIIndex(newIndex)
          setCurrentJIndex(0)
          console.log(currIIndex, currJIndex)
        }
      })
    } else if(key === 'Delete') {
      console.log('in delete')
      let newIndex = currJIndex !== Data.NO_OF_LETTERS - 1 ? (currJIndex - 1) : currJIndex
      console.log('new index ' + newIndex + ' curr j ' + currJIndex)
      let newBoxes = [...boxes]
      if(newIndex < 0)
        return
      if(newBoxes[currIIndex][newIndex].letter === null) //if still pointing to last element
        newIndex--;
      if(newIndex < 0)
        newIndex = 0
      newBoxes[currIIndex][newIndex] = { 
        ...newBoxes[currIIndex][newIndex],
        letter : null
      }
      setCurrentJIndex(newIndex)
      setBoxes(newBoxes)
    }
  }

  function decideClassName(box) {
    let className = 'grid-item'
    if(box.color === Data.PARTIAL) 
      className += ' partial'
    else if(box.color === Data.RIGHT) 
      className += ' correct'
    else if(box.color === Data.WRONG) 
      className += ' wrong'
    return className
  }

  return (
    <div className="App">
      <div className='grid'>
        {boxesElements}
      </div>
      <div>
        <Keyboard onKeyPress={onKeyPress} />
      </div>
    </div>
  );
}

export default App;
