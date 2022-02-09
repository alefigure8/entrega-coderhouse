import {render, renderPayment, renderPricer, renderCode, renderValidateCode, renderCuotas} from './DOM.js';
import {CURSOS} from './CURSOS.js';

let selectedCourse;

// Variables generales
const INTEREST_OF_DUES = 0.035;
const CODE_15 = 0.15;

// init
document.addEventListener('DOMContentLoaded', () => {
    // rmuestra las tarjetas de cada curso
    render()
})

// filtra el curso elegido
export function validateQuestion (option) {
    let [course] = CURSOS.filter(a => a.option === option)
    selectedCourse = course
    renderPayment(course)
}


// selecciona curso elegido
export function calculateChoice (objCalculate) {
    const {code, cuotas} = objCalculate
    const isTrue = validateCode(code);
    calculateDues(selectedCourse, cuotas, isTrue)
    renderCuotas(cuotas)
}


// valida codigo de descuento
function validateCode (code) {

    if(code === 'coder15'){
      return true;
    } else if (code == ''){
       return false;
    } else {
        renderValidateCode()
        return false
    }

}

// calcula intereses y descuentos
function calculateDues(course, dues, code) {

    let totalInteres;
    let totalCost;

    // validar intereses
    if(parseInt(dues) === 1){
        totalInteres = 1;  // 1 cuota, no sumar intereses
        totalCost = course.price * totalInteres;
    } else {
        totalInteres = dues * INTEREST_OF_DUES; // mas de 1 cuota, sumar intereses
        totalCost = (course.price * totalInteres) + course.price;
    }

    // validar codigo
    if(code){
        const applyCode =  totalCost * CODE_15;
        renderCode(code)
        renderPricer(totalCost - applyCode.toFixed(2));
    } else {
        renderCode(code)
        renderPricer(totalCost.toFixed(2));
    }

}
