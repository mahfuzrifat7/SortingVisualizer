async function selectionSort() {
    var i, j, min_idx;

    for(i = 0; i < size - 1; i++) {
        await sleep(delay);

        min_idx = i;
        setColor(min_idx, SELECTED);

        for(j = i + 1; j < size; j++) {
            await sleep(delay);

            setColor(j, COMPARE);

            await sleep(delay);

            if(arr[j] < arr[min_idx]) {
                setColor(min_idx, UNSORTED);
                min_idx = j;
                setColor(min_idx, SELECTED);
                await sleep(delay);
            }
            else
                setColor(j, UNSORTED);
        }

        await sleep(delay);

        if(min_idx != i) {
            setColor(i, COMPARE);
            await sleep(delay);

            setColor(min_idx, COMPARE);
            setColor(i, SELECTED);
            swap(min_idx, i);
            await sleep(delay);
        }

        setColor(min_idx, UNSORTED);
        setColor(i, SORTED);
    }

    setColor(size - 1, SORTED);
}
