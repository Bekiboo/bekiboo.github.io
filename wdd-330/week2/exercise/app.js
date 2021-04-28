// MINIMUM
function minimum() {
    let a = document.getElementById('inputA').value;
    let b = document.getElementById('inputB').value;

    const min = (num1, num2) => {
        document.getElementById("output").innerHTML =
            "The lowest number is: " + Math.min(num1, num2);
    }
    min(a, b);
}


// BEAN COUNTING
function beanCounting() {
    let a = document.getElementById('inputA').value;
    let b = document.getElementById('inputB').value;

    const countChar = (string, char) => {
        let count = 0;
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) == char) {
                count += 1
            };
        }
        document.getElementById("output").innerHTML =
            `There is ${count} "${char}" in "${string}"`;
    }
    countChar(a, b)
}

// TEAM ACTIVITY A
function teamActivityA() {
    let a = parseInt(document.getElementById('inputA').value);

    const addInteger = (int) => {
        totalInt = 0;

        if (Number.isInteger(int)) {
            if (int < 0) {
                int *= -1
            }
            for (let i = 1; i <= int; i++) {
                totalInt += i;
                document.getElementById("outputA").innerHTML = totalInt;
            }

        } else {
            document.getElementById("outputA").innerHTML = "Enter an Integer please";
        }
    }
    addInteger(a);
}


// TEAM ACTIVIY B
const add = (num1, num2) => num1 + num2;
const sub = (num1, num2) => num1 - num2;
const mul = (num1, num2) => num1 * num2;

const displayTotal = (total) => {
    document.getElementById("outputB").innerHTML = "Total: " + total;
}

function teamActivityB(operation) {
    let b = parseFloat(document.getElementById('inputB').value);
    let c = parseFloat(document.getElementById('inputC').value);

    if ((b + c) !== NaN) {
        const compute = operation(b, c);
        displayTotal(compute);
    } else {
        document.getElementById("outputB").innerHTML = "Enter valid numbers please";
    }
}