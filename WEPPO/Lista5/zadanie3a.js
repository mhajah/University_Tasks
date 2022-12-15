"use strict";
//default export może zostać użyte tylko raz w module i eksportuje wszystkie jego zasoby
//importowanie w tym przypadku:
exports.__esModule = true;
//natomiast export eksportuje tylko dane zmienna/funkcje/obiekt... 
//importowanie w tym przypadku: import { x } from "./zadanie3a";
var Foo = function (a) {
    return a * 5;
};
var Bar = function (b) {
    return b * 10;
};
exports["default"] = Foo;
