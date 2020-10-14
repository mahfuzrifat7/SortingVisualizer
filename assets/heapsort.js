var heapSize;

function left(i) {
    return 2 * i + 1;
}

function right(i) {
    return 2 * i + 2;
}

async function maxHeapify(i) {
    var l = left(i);
    var r = right(i);
    var largest, temp;

    setColor(i, COMPARE);
    if(l < heapSize)
        setColor(l, LEFT);
    if(r < heapSize)
        setColor(r, RIGHT);

    await sleep(delay);

    if(l < heapSize && arr[l] > arr[i])
        largest = l;
    else
        largest = i;

    if(r < heapSize && arr[r] > arr[largest])
        largest = r;

    if(l < heapSize)
        setColor(l, UNSORTED);
    if(r < heapSize)
        setColor(r, UNSORTED);
    setColor(largest, SELECTED);

    await sleep(delay);

    if(largest != i) {
        swap(i, largest);
        setColor(largest, COMPARE);
        setColor(i, SELECTED);
        await sleep(delay);

        setColor(largest, UNSORTED);
        setColor(i, UNSORTED);

        await maxHeapify(largest);
    }
    else
        setColor(i, UNSORTED);
}

async function buildMaxHeap() {
    heapSize = size;

    for(var i = Math.floor(size / 2) - 1; i >= 0; i--)
        await maxHeapify(i);
}

async function heapsort() {
    await sleep(delay);

    await buildMaxHeap();

    for(var i = size - 1; i > 0; i--) {
        setColor(0, SELECTED);
        setColor(i, COMPARE);
        await sleep(delay);

        setColor(0, COMPARE);
        setColor(i, SELECTED);
        swap(0, i);
        heapSize--;
        await sleep(delay);

        setColor(i, SORTED);

        await maxHeapify(0);
    }

    setColor(0, SORTED);
}
