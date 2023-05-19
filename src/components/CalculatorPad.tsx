import { Dispatch, MutableRefObject, SetStateAction, useState } from "react"

interface CalculatorPadProps {
    result: string
    setResult: Dispatch<SetStateAction<string>>
    calculate: MutableRefObject<any>
}

interface NumPadProps {
    name: string
    onClickHandler: (name: string) => void
    classNames?: string
}

const NumPad = ({ name, onClickHandler, classNames }: NumPadProps) => {
    return (
        <div className={`p-2 text-center ${classNames ? classNames : ""} hover:bg-neutral-200`} onClick={() => onClickHandler(name)}>
            {name}
        </div>
    )
}

const CalculatorPad = ({ result, setResult, calculate }: CalculatorPadProps) => {

    const [isAfterOperation, setIsAfterOperation] = useState<boolean>(false)

    const onClickPad = (ch: string) => {
        switch (ch) {
            case "C":
                setResult("0")
                calculate.current.operation = ""
                calculate.current.previousValue = 0
                break
            case "+":
            case "-":
            case "x":
            case "/":
                calculate.current.operation = ch
                calculate.current.previousValue = parseFloat(result)
                setIsAfterOperation(true)
                break
            case "0":
                setResult(prev => {
                    if (prev.startsWith("0") && !prev.includes(".")) return prev
                    else return prev + ch
                })
                break
            case ".":
                setResult(prev => {
                    if (prev.includes(".")) return prev
                    else return prev + ch
                })
                break
            case "+/-":
                if (parseFloat(result) > 0) {
                    setResult("-" + result)
                } else {
                    setResult(result.slice(1))
                }
                break
            case "=":
                switch (calculate.current.operation) {
                    case "+":
                        setResult(calculate.current.previousValue + parseFloat(result))
                        break
                    case "-":
                        setResult((calculate.current.previousValue - parseFloat(result)).toString())
                        break
                    case "x":
                        setResult((calculate.current.previousValue * parseFloat(result)).toString())
                        break
                    case "/":
                        setResult((calculate.current.previousValue / parseFloat(result)).toString())
                        break
                }
                break
            default:
                setResult(prev => {
                    if (isAfterOperation) {
                        setIsAfterOperation(false)
                        return ch
                    } else if (prev.startsWith("0") && !prev.includes(".")) {
                        return ch
                    }
                    else return prev + ch
                })
                break

        }
    }

    return (
        <section className="grid grid-cols-4 gap-2">
            <NumPad name="C" onClickHandler={onClickPad} />
            <NumPad name="+/-" onClickHandler={onClickPad} />
            <NumPad name="/" onClickHandler={onClickPad} />
            <NumPad name="x" onClickHandler={onClickPad} />
            <NumPad name="7" onClickHandler={onClickPad} />
            <NumPad name="8" onClickHandler={onClickPad} />
            <NumPad name="9" onClickHandler={onClickPad} />
            <NumPad name="-" onClickHandler={onClickPad} />
            <NumPad name="4" onClickHandler={onClickPad} />
            <NumPad name="5" onClickHandler={onClickPad} />
            <NumPad name="6" onClickHandler={onClickPad} />
            <NumPad name="+" onClickHandler={onClickPad} />
            <NumPad name="1" onClickHandler={onClickPad} />
            <NumPad name="2" onClickHandler={onClickPad} />
            <NumPad name="3" onClickHandler={onClickPad} />
            <NumPad name="=" classNames="row-span-2" onClickHandler={onClickPad} />
            <NumPad name="0" classNames="col-span-2" onClickHandler={onClickPad} />
            <NumPad name="." onClickHandler={onClickPad} />
        </section>
    )
}

export default CalculatorPad
