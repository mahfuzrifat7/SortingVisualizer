async function insertionSort() {
    var i, j, key;
    await sleep(delay);

    setColor(0, SELECTED);
    await sleep(delay);

    setColor(0, SORTED);

    for(i = 1; i < size; i++) {
        await sleep(delay);

        setColor(i, SELECTED);
        await sleep(delay);

        j = i - 1;
        key = arr[i];

        while(j >= 0 && arr[j] > key) {
            setColor(j, COMPARE);
            await sleep(delay);

            swap(j, j + 1);
            setColor(j, SELECTED);
            setColor(j + 1, COMPARE);
            await sleep(delay);

            setColor(j + 1, SORTED);
            await sleep(delay);

            j--;
        }

        setColor(j + 1, SORTED);
    }
}
