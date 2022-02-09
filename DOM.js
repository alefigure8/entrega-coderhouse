import {CURSOS} from './CURSOS.js';
import {validateQuestion, calculateChoice} from './main.js'

// ==== VARIABLES ==== //
const cards = document.getElementById('cards')
const titleCurso = document.getElementById('title-curso')
const descriptionPayment = document.getElementById('description-payment')
const descriptionPrice = document.getElementById('description-price')
const descriptionDays = document.getElementById('description-days')
const descriptionCode = document.getElementById('description-code')
const sectionPayment = document.getElementById('pay')
const backBTN = document.querySelectorAll('#back')
const calculateBtn = document.getElementById('btn-calculate')
const invalidCode = document.getElementById('invalid-code')
const descriptionCuota = document.getElementById('description-cuota')


// Formato a los cursos
const renderCurso = CURSOS.map(card => {
       return `<div class="card" id="card">
                <h2 class="title-card">${card.name.toUpperCase()}</h2>
                <p class="description">${card.description}</p>
                <p class="price">$${card.price}</p>
                <a href="#pay" class="btn" id="btn-curso" id_course="${card.option}">DETALLES</a>
            </div>`
})


// ==== FUNCTION ==== //

// render los cursos en el main
export function render(){
    // render tajetas
    cards.innerHTML = renderCurso

    // llamar cada boton de las tarjetas
    const btnCurso = document.querySelectorAll('#btn-curso')

    //listener a los botones tarjeta
    btnCurso.forEach(btn => {
        btn.addEventListener('click', btnCard)
    })
}

// muestra seccion opciones al clickear y valida el curso
function btnCard(e){
    const option = e.target.getAttribute("id_course")
    sectionPayment.classList.remove('hide')
    validateQuestion(option)
}


// render description payment
export function renderPayment(course){
    titleCurso.innerText = course.name.toUpperCase()
    descriptionPayment.innerText = course.description
    descriptionPrice.innerText = `$${course.price}`
    descriptionDays.innerText = `${parseInt(course.duration/7)} semanas`
}


// render el precio al modificar opciones
export function renderPricer(price){
    descriptionPrice.innerText = `$${price}`
}


// render opción si hay o no código
export function renderCode(code){
    if (code) {
        descriptionCode.innerText = 'Con código de descuento'
    } else {
        descriptionCode.innerText = 'Sin código de descuento'
    }
}

// advertencia si el código no es válido
export function renderValidateCode(){
    invalidCode.innerText = 'Código Inválido'
    setTimeout(()=>{
        invalidCode.innerText = ''
    },3000)
}

// render cantidad de cuotas
export function renderCuotas(number){
    if(number == 1) {
        descriptionCuota.innerText = `${number} cuota`
    } else {
        descriptionCuota.innerText = `${number} cuotas`
    }
}


// ==== LISTENER ==== //

// muestra opciones del curso al clickear en "detalles"
backBTN.forEach(btn => {
    btn.addEventListener('click', () => {
        sectionPayment.classList.add('hide')
    })
})


// submit del formulario de opciones
calculateBtn.addEventListener('submit', e => {
    e.preventDefault()
    const objCalculate = {}
    objCalculate.code = e.target.codigo.value
    objCalculate.cuotas = e.target.cuotas.value
    calculateChoice(objCalculate)
})