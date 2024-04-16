class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;  /*saves the operation made by the user used in clear-all*/ 
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {                 
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {                              /*takes the past value off and the actual value and set all to nothing */
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {                           
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {                               /*takes the values that the display have and it gives it to the calculator to make the operations needed*/
        const valorAnterior = parseFloat(this.valorAnterior); /*make it change from string to number*/
        const valorActual = parseFloat(this.valorActual);     /*make it change from string to number*/

        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return /*if one of these two values is isNaN then the next step is not to do any operation, and return without doing any operation*/
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual); /*if in the case of they have values, update of the current-value based on the user operation made*/
    }
}