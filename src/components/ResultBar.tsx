interface ResultBarProps {
    result: string
}

const ResultBar = ({ result }: ResultBarProps) => {

    return (
        <section className="h-32">
            <h1 className="font-bold text-7xl text-right mr-4">{result}</h1>
        </section>
    )
}

export default ResultBar
