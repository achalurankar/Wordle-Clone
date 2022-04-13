export default class Data {

    static UNANSWERED = 1 
    static WRONG = 2
    static RIGHT = 3

    static NO_OF_LETTERS = 5
    static NO_OF_ATTEMPTS = 6

    static getBlankData() {
        let data = Array.from(Array(Data.NO_OF_LETTERS), () => new Array(Data.NO_OF_ATTEMPTS));
        for(let i = 0; i < Data.NO_OF_LETTERS; i++){
            for(let j = 0; j < Data.NO_OF_ATTEMPTS; j++){
                data[i][j] = {
                    id : `${i}_${j}`,
                    letter : null,
                    isLocked : false,
                    color : Data.UNANSWERED
                };
            }
        }
        return data
    }
}