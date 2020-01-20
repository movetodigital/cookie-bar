import Lib from './../lib';

class App {
    constructor(){
        let libInstance = new Lib();
        console.log("Lib loaded!", libInstance);
    }
}

export default App;
