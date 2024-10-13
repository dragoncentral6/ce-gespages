const inactive = document.getElementById('btnIN');
const active = document.getElementById('btnAC');
const route = document.getElementById('btnRE');
const operative = document.getElementById('btnOP');

const elementosList = document.querySelectorAll(".list");

// aplicar el estilo inicial

active.classList.add('showAc');


// inactivo 

inactive.addEventListener('click', ()=>{
	elementosList.forEach(elemento => {
		elemento.classList.remove('showAc','showRe','showOp');
	});
	inactive.classList.add('showIn');
});

// activo 

active.addEventListener('click', ()=>{
	elementosList.forEach(elemento => {
		elemento.classList.remove('showIn','showRe','showOp');
	});
	active.classList.add('showAc');
});

// ruta

route.addEventListener('click', ()=>{
	elementosList.forEach(elemento => {
		elemento.classList.remove('showIn','showAc','showOp');
	});
	route.classList.add('showRe');
});

//operativo

operative.addEventListener('click', ()=>{
	elementosList.forEach(elemento => {
		elemento.classList.remove('showIn','showAc','showRe');
	});
	operative.classList.add('showOp');
});