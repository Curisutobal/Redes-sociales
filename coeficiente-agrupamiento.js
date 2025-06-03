const graph = {

/*Nodos.    Vecinos */
    A: ["B", "C", "D"],
    B: ["A", "C", "E"],
    C: ["A", "B", "D"],
    D: ["A", "F", "C"],
    E: ["B"],
    F: ["D"],
}

function coeficienteAgrupamiento(node, graph) {
    const vecinos = graph[node]; /*guarda los vecinos del nodo A*/
    const k = vecinos.length;

    if (k<2) return 0;

    let enlaces = 0;
    for (let i = 0; i<k; i++){

        for (let j = i + 1; j<k; j++){
            const vecinosA = vecinos[i];
            const vecinosB = vecinos[j];

            if (graph[vecinosA] && graph[vecinosA].includes(vecinosB)){
                enlaces++;
            }
        }
    }

    const enlacesPosibles = (k*(k-1))/2;

    return enlaces/enlacesPosibles;
}

console.log(
    "Coeficiente de agrupamiento: ",
    coeficienteAgrupamiento("A", graph)
);