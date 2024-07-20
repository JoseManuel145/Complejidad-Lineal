import { Bussines } from "../models/Bussines.mjs";
import { lista, array } from "./Dependencies.mjs";

let arrayBtn = document.getElementById('saveArray');
let listaBtn = document.getElementById('saveList');
let arrayBubble = document.getElementById('arrayBubble');
let arrayMerge = document.getElementById('arrayMerge');
let arrayRadix = document.getElementById('arrayRadix');
let listBubble = document.getElementById('listBubble');
let listMerge = document.getElementById('listMerge');
let listRadix = document.getElementById('listRadix');

function save(arreglo) {
    fetch("../../../bussines.json")
        .then(response => response.json())
        .then(data => {
            for (let x = 0; x <= 20000; x++) {
                let bussines = new Bussines(data[x].name, data[x].address, data[x].city, data[x].state, data[x].postal_code);
                arreglo.push(bussines);
                if (x == 20000) {
                    console.log("ya se guardaron todas");
                }
            }
        })
        .catch(err => console.log(err));
}

function measureTime(func) {
    let startTime = performance.now();
    func();
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    return timeTaken;
}

arrayBtn.addEventListener('click', () => {
    save(array)
});

listaBtn.addEventListener('click', () => {
    save(lista);
});

arrayBubble.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = array.bubbleSort());
    document.getElementById("tiempoBubbleA").value = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
});

arrayMerge.addEventListener("click", () => {
    let iterations = { count: 0 };
    let timeTaken = measureTime(() => array.mergeSort(array.array, iterations));
    document.getElementById("tiempoMergeA").value = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations.count}`;
});

arrayRadix.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = array.radixSort());
    document.getElementById("tiempoRadixA").value = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
});

listBubble.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.bubbleSort());
    document.getElementById("tiempoBubbleL").value = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
});

listMerge.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.mergeSort());
    document.getElementById("tiempoMergeL").value = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
});

listRadix.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.radixSort());
    document.getElementById("tiempoRadixL").value = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
});

