import { useState } from "react";
import { Button } from "./ui/button";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    if (previousValue !== null && !newNumber) {
      calculate();
    } else {
      setPreviousValue(display);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = current !== 0 ? prev / current : 0;
        break;
      case "%":
        result = prev % current;
        break;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          {/* Display */}
          <div className="bg-gradient-display rounded-2xl p-6 mb-6 shadow-inner">
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1 h-5">
                {previousValue && operation ? `${previousValue} ${operation}` : ""}
              </div>
              <div className="text-4xl font-semibold text-foreground break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button variant="clear" onClick={clear} className="text-lg font-medium">
              C
            </Button>
            <Button variant="function" onClick={backspace} className="text-lg font-medium">
              ⌫
            </Button>
            <Button variant="function" onClick={handlePercent} className="text-lg font-medium">
              %
            </Button>
            <Button variant="operator" onClick={() => handleOperation("÷")} className="text-xl font-medium">
              ÷
            </Button>

            {/* Row 2 */}
            <Button variant="number" onClick={() => handleNumber("7")} className="text-xl font-medium">
              7
            </Button>
            <Button variant="number" onClick={() => handleNumber("8")} className="text-xl font-medium">
              8
            </Button>
            <Button variant="number" onClick={() => handleNumber("9")} className="text-xl font-medium">
              9
            </Button>
            <Button variant="operator" onClick={() => handleOperation("×")} className="text-xl font-medium">
              ×
            </Button>

            {/* Row 3 */}
            <Button variant="number" onClick={() => handleNumber("4")} className="text-xl font-medium">
              4
            </Button>
            <Button variant="number" onClick={() => handleNumber("5")} className="text-xl font-medium">
              5
            </Button>
            <Button variant="number" onClick={() => handleNumber("6")} className="text-xl font-medium">
              6
            </Button>
            <Button variant="operator" onClick={() => handleOperation("-")} className="text-xl font-medium">
              −
            </Button>

            {/* Row 4 */}
            <Button variant="number" onClick={() => handleNumber("1")} className="text-xl font-medium">
              1
            </Button>
            <Button variant="number" onClick={() => handleNumber("2")} className="text-xl font-medium">
              2
            </Button>
            <Button variant="number" onClick={() => handleNumber("3")} className="text-xl font-medium">
              3
            </Button>
            <Button variant="operator" onClick={() => handleOperation("+")} className="text-xl font-medium">
              +
            </Button>

            {/* Row 5 */}
            <Button variant="number" onClick={() => handleNumber("0")} className="col-span-2 text-xl font-medium">
              0
            </Button>
            <Button variant="number" onClick={handleDecimal} className="text-xl font-medium">
              .
            </Button>
            <Button variant="equals" onClick={calculate} className="text-xl font-semibold">
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
