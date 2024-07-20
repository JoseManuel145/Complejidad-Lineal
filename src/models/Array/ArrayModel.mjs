export class ArrayModel {
    constructor() {
        this.array = [];
    }

    push(data) {
        this.array.push(data);
    }

    print(callback) {
        let array = this.array;
        for (let i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    }

    bubbleSort() {
        let items = this.array;
        let length = items.length;
        let swap;
        let iterations = 0;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                iterations++;
                if (items[j].name > items[j + 1].name) {
                    swap = items[j];
                    items[j] = items[j + 1];
                    items[j + 1] = swap;
                }
            }
        }
        return iterations;
    }

    mergeSort(items = this.array, iterations = { count: 0 }) {
        if (items.length <= 1) {
            return items;
        }
        const middle = Math.floor(items.length / 2);
        const left = items.slice(0, middle);
        const right = items.slice(middle);

        return this.#merge(this.mergeSort(left, iterations), this.mergeSort(right, iterations), iterations);
    }

    #merge(left, right, iterations) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            iterations.count++;
            if (left[leftIndex].name < right[rightIndex].name) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    #getMax(items) {
        let max = this.#wordToNumber(items[0].name); 
        for (let i = 1; i < items.length; i++) {
            let num = this.#wordToNumber(items[i].name);
            if (num > max) {
                max = num;
            }
        }
        return max;
    }

    radixSort() {
        let items = this.array.map(item => ({ ...item, num: this.#wordToNumber(item.name) }));
        let max = this.#getMax(items);
        let iterations = 0; 

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            iterations += this.#countingSort(items, exp);
        }

        this.array = items.map(item => {
            delete item.num; 
            return item;
        });

        return iterations;
    }

    #countingSort(arr, exp) {
        let output = new Array(arr.length);
        let count = new Array(10).fill(0); 
        let iterations = 0; 

        for (let i = 0; i < arr.length; i++) {
            let index = Math.floor(arr[i].num / exp) % 10;
            count[index]++;
            iterations++; 
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            let index = Math.floor(arr[i].num / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }

        return iterations;
    }

    #wordToNumber(word) {
        let number = 0;
        for (let i = 0; i < word.length; i++) {
            number = number * 256 + word.charCodeAt(i);
        }
        return number;
    }
}   