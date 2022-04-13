export default function Keyboard(props) {
    const keys = { row1 : [], row2 : [],  row3 : [],  row4 : []}
    
    populateKeys("QWERTYUIOP", keys.row1);
    populateKeys("ASDFGHJKL", keys.row2);
    populateKeys("ZXCVBNM", keys.row3); 

    function populateKeys(alphabets, row) {
        alphabets = alphabets.split("");
        for (let i = 0; i < alphabets.length; i++) {
            row.push(<button onClick={() => props.onKeyPress(alphabets[i])} key={alphabets[i]} className="key">{alphabets[i]}</button>)
        }
    }

    keys.row3.unshift(
        <button onClick={() => props.onKeyPress('Enter')} key={'Enter'} className="key">Enter</button>
    )
    keys.row3.push(
        <button onClick={() => props.onKeyPress('Delete')} key={'Delete'} className="key">Delete</button>
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