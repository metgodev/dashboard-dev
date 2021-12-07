// local terms until remote config available
const active_lexicon = {
    hello_world: {
        en: 'hello world',
        he: 'שלום עולם',
        ar: 'مرحبا بالعالم',
    },
}


export default function term(name, default_val, lang = 'he') {
    return (name in active_lexicon ? active_lexicon[name][lang]
        : (default_val === undefined ? name
            : default_val
        )
    )
}
