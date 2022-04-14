import Data from './data/Data';

export default function Grid(props) {
    
  const boxesElements = []
  props.boxes.forEach((boxRow, i) => {
    boxRow.forEach((box, j) => {
      let className = decideClassName(box)
      boxesElements.push(
        <div key={box.id} className={className}>{box.letter}</div>
      )
    })
  });

  
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
    <div className='grid'>
        {boxesElements}
    </div>
  )
}