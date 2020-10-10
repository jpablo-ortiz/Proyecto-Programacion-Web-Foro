import { Comentario } from './Entidades/comentario';
import { Tema } from './Entidades/tema';

export class Auxiliar {

    public static quickSortComentariosPorFecha(comentarios: Comentario[], izq: number, der: number): void {

        let pivote = comentarios[izq]; // tomamos primer elemento como pivote
        let i = izq;         // i realiza la búsqueda de izquierda a derecha
        let j = der;         // j realiza la búsqueda de derecha a izquierda
        let aux;

        while (i < j) {                          // mientras no se crucen las búsquedas
            while (comentarios[i].fecha.valueOf() <= pivote.fecha.valueOf() && i < j) {
                i++; // busca elemento mayor que pivote
            }
            while (comentarios[j].fecha.valueOf() > pivote.fecha.valueOf()) {
                j--;           // busca elemento menor que pivote
            }
            if (i < j) {                        // si no se han cruzado
                aux = comentarios[i];                      // los intercambia
                comentarios[i] = comentarios[j];
                comentarios[j] = aux;
            }
        }

        comentarios[izq] = comentarios[j];      // se coloca el pivote en su lugar de forma que tendremos
        comentarios[j] = pivote;     // los menores a su izquierda y los mayores a su derecha

        if (izq < j - 1) {
            this.quickSortComentariosPorFecha(comentarios, izq, j - 1); // ordenamos subarray izquierdo
        }
        if (j + 1 < der) {
            this.quickSortComentariosPorFecha(comentarios, j + 1, der); // ordenamos subarray derecho
        }
    }

    public static quickSortComentariosPorRanking(comentarios: Comentario[], izq: number, der: number): void {

        let pivote = comentarios[izq]; // tomamos primer elemento como pivote
        let i = izq;         // i realiza la búsqueda de izquierda a derecha
        let j = der;         // j realiza la búsqueda de derecha a izquierda
        let aux;

        while (i < j) {                          // mientras no se crucen las búsquedas
            while (comentarios[i].ranking <= pivote.ranking && i < j) {
                i++; // busca elemento mayor que pivote
            }
            while (comentarios[j].ranking > pivote.ranking) {
                j--;           // busca elemento menor que pivote
            }
            if (i < j) {                        // si no se han cruzado
                aux = comentarios[i];                      // los intercambia
                comentarios[i] = comentarios[j];
                comentarios[j] = aux;
            }
        }

        comentarios[izq] = comentarios[j];      // se coloca el pivote en su lugar de forma que tendremos
        comentarios[j] = pivote;     // los menores a su izquierda y los mayores a su derecha

        if (izq < j - 1) {
            this.quickSortComentariosPorFecha(comentarios, izq, j - 1); // ordenamos subarray izquierdo
        }
        if (j + 1 < der) {
            this.quickSortComentariosPorFecha(comentarios, j + 1, der); // ordenamos subarray derecho
        }

    }

        public static quickSortTemasPorRanking(temas: Tema[], izq: number, der: number): void {

        let pivote = temas[izq]; // tomamos primer elemento como pivote
        let i = izq;         // i realiza la búsqueda de izquierda a derecha
        let j = der;         // j realiza la búsqueda de derecha a izquierda
        let aux;

        while (i < j) {                          // mientras no se crucen las búsquedas
            while (temas[i].ranking <= pivote.ranking && i < j) {
                i++; // busca elemento mayor que pivote
            }
            while (temas[j].ranking > pivote.ranking) {
                j--;           // busca elemento menor que pivote
            }
            if (i < j) {                        // si no se han cruzado
                aux = temas[i];                      // los intercambia
                temas[i] = temas[j];
                temas[j] = aux;
            }
        }

        temas[izq] = temas[j];      // se coloca el pivote en su lugar de forma que tendremos
        temas[j] = pivote;     // los menores a su izquierda y los mayores a su derecha

        if (izq < j - 1) {
            this.quickSortTemasPorRanking(temas, izq, j - 1); // ordenamos subarray izquierdo
        }
        if (j + 1 < der) {
            this.quickSortTemasPorRanking(temas, j + 1, der); // ordenamos subarray derecho
        }

    }
}
