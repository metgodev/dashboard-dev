// local terms until remote config available
const demo_lexicon = {
    hello_world: 'hello world',
}

let active_lexicon = demo_lexicon;

export default function term(name, default_val) {
    return (name in active_lexicon ? active_lexicon[name]
        : (default_val === undefined ? name
            : default_val
        )
    )
}