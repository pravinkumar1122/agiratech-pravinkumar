let display = document.getElementById('display');

function appendToDisplay(num) {
    display.value += num;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value);
        localStorage.setItem("myyy",display.value)
        let get=localStorage.getItem("myyy",display.value)
        console.log(localStorage);
        console.log(" getting the value :"+get)
    } catch (error) {
        display.value = 'Error';
    }
}
