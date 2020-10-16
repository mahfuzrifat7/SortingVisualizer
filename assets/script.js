const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 3;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

var size;
var delay;

var arr = [];

var array_container_width;
var element_width;
var element_width_max;
var margin_element;

var algo_selected;

function updateValues() {
    array_container_width = Math.floor( $("#array-container").width() );
    element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if( parseInt( $(window).width() ) < 1200 )
        margin_element = 1;
}

function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if(element_width > element_width_max)
        element_width = element_width_max;
}

function createArray() {
    arr = [];
    $("#array").html('');

    for(var i = 0; i < size; i++) {
        var n = Math.floor( Math.random() * (MAX - MIN + 1) ) + MIN;
        arr.push(n);
        
        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");
        $element.css('background-color', UNSORTED);
        $element.css('width', element_width.toString() + 'px');
        $element.css('height', n.toString() + 'px');
        $element.css('margin-left', margin_element + 'px');
        $element.css('margin-right', margin_element + 'px');
        $element.appendTo("#array");
    }
}

function setHeight(id, height) {
    $("#e" + id).css('height', height);
}

function setColor(id, color) {
    $("#e" + id).css('background-color', color);
}

function setColorRange(p, r, color) {
    for(var i = p; i <= r; i++)
        $("#e" + i).css('background-color', color);
}

function swap(a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    var h1 = $("#e" + a).css('height');
    var h2 = $("#e" + b).css('height');

    setHeight(a, h2);
    setHeight(b, h1);
}

function disableOthers() {
    $("#sort").prop('disabled', true);
    $("#randomize").prop('disabled', true);
    $("#size-slider").prop('disabled', true);
}

function enableOthers() {
    $("#sort").prop('disabled', false);
    $("#randomize").prop('disabled', false);
    $("#size-slider").prop('disabled', false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {
    $("#size-slider").attr('min', MIN_SIZE);
    $("#size-slider").attr('max', MAX_SIZE);
    $("#size-slider").attr('value', DEFAULT_SIZE);

    $("#speed-slider").attr('min', MIN_SPEED);
    $("#speed-slider").attr('max', MAX_SPEED);
    $("#speed-slider").attr('value', DEFAULT_SPEED);

    size = DEFAULT_SIZE;
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);

    updateValues();
    
    findElementWidth();
    createArray();

    $("#randomize").click(
        function() {
            createArray();
        }
    );

    $(".algo-btn").click(
        function() {
            algo_selected = $(this).html();

            $(".algo-btn-active").removeClass('algo-btn-active');
            $(this).addClass('algo-btn-active');

            $("#no-algo-warning").removeClass('display-flex');
            $("#no-algo-warning").addClass('display-none');
        }
    );

    $("#sort").click(
        async function() {
            disableOthers();

            setColorRange(0, size - 1, UNSORTED);

            if(algo_selected == "Bubble Sort")
                await bubbleSort();
            else if(algo_selected == "Selection Sort")
                await selectionSort();
            else if(algo_selected == "Insertion Sort")
                await insertionSort();
            else  if(algo_selected == "Merge Sort")
                await mergeSort(0, size - 1);
            else if(algo_selected == "Quicksort")
                await quicksort(0, size - 1);
            else if(algo_selected == "Heapsort")
                await heapsort();
            else {
                $("#no-algo-warning").removeClass('display-none');
                $("#no-algo-warning").addClass('display-flex');
            }

            enableOthers();
        }
    );

    $("#size-slider").on('input', function() {
        size = $(this).val();

        findElementWidth();
        createArray();
    });

    $("#speed-slider").on('input', function() {
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - $(this).val());
    });

    $(window).resize(function() {
        if(array_container_width != Math.floor( $("#array-container").width() )) {
            updateValues();

            findElementWidth();

            for(var i = 0; i < size; i++) {
                $("#e" + i).css('width', element_width.toString() + 'px');
                $("#e" + i).css('margin-left', margin_element + 'px');
                $("#e" + i).css('margin-right', margin_element + 'px');
            }
        }
    });
});
