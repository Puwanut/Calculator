import CalculatorPad from "@/components/CalculatorPad";
import ResultBar from "@/components/ResultBar";
import { useRef, useState } from "react";

export default function Home() {

  const [result, setResult] = useState<string>("0")
  const calculate = useRef({
    previousValue: 0,
    operation: ""
  })

  return (
    <main className="container max-w-lg bg-neutral-100">
      <ResultBar result={result} />
      <CalculatorPad result={result} setResult={setResult} calculate={calculate} />
    </main>
  )
}
