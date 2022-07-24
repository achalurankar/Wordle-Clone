import Data from '../data/Data';

export default function Keyboard(props) {
    const keys = { row1 : [], row2 : [],  row3 : [],  row4 : []}
    
    const keyMap = {}

    populateKeyMap();
    populateKeys("QWERTYUIOP", keys.row1);
    populateKeys("ASDFGHJKL", keys.row2);
    populateKeys("ZXCVBNM", keys.row3); 

    function populateKeys(alphabets, row) {
        alphabets = alphabets.split("");
        for (let i = 0; i < alphabets.length; i++) {
            let className = keyMap[alphabets[i]];
            row.push(<button onClick={() => props.onKeyPress(alphabets[i])} key={alphabets[i]} className={`key ${className}`}>{alphabets[i]}</button>)
        }
    }

    function populateKeyMap() {
        const alphabets = "QWERTYUIOPASDFGHJKLZXCVBNM".split("")
        let boxes = [...props.boxes];
        const currMap = {}
        for(const row of boxes) {
            for(const box of row) {
                if(!box.letter) continue
                if(box.color === Data.WRONG) {
                    currMap[box.letter] = 'wrong'
                }
                if(box.color === Data.PARTIAL) {
                    currMap[box.letter] = 'partial'
                }
                if(box.color === Data.RIGHT) {
                    currMap[box.letter] = 'correct'
                }
            }
        }
        
        console.log('boxes', JSON.stringify(boxes))  
        for(const alphabet of alphabets) {
            let className = 'unused'
            if(alphabet in currMap) {
                className = currMap[alphabet]
            }
            keyMap[alphabet] = className
        }
    }

    keys.row3.unshift(
        <button onClick={() => props.onKeyPress('Enter')} key={'Enter'} className="key unused">Enter</button>
    )
    keys.row3.push(
        <button onClick={() => props.onKeyPress('Delete')} key={'Delete'} className="key unused">Delete</button>
    )
    return (
        <div className="keyboard">
            <div className="key-container">
                {keys.row1}
            </div>
            <div className="key-container">
                {keys.row2}
            </div>
            <div className="key-container">
                {keys.row3}
            </div>
        </div>
    )
}