//default export może zostać użyte tylko raz w module i przy imporcie nie musimy się martwić o nazwę funkcji
//w szczególności gdy zostanie ona zmieniona
//importowanie w tym przypadku: import cOkOlWiEk from "./zadanie3a";

//natomiast export eksportuje tylko dane zmienna/funkcje/obiekt... 
//importowanie w tym przypadku: import { x } from "./zadanie3a";



let Foo = (a: number) => {
    return a*5;
}

let Bar = (b: number) => {
    return b*10;
}


export default Foo