
export default function Form({onAddItems}) {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        /* e = eveniment, e.preventDefault() pentru a opri reload-ul automat la pagina cand se apasa submit */
        e.preventDefault();

        if(!description)
            return;
        const newItem = {description, quantity, packed: false, id: Date.now()};
        //console.log(newItem);

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className = "add-form" onSubmit = {handleSubmit}>
            <h3> What do you need for your trip? </h3>
            <select value = {quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                    <option value = {num} key = {num}> {num} </option>
                ))}
            </select>
            <input type="text" placeholder = "Item..." value = {description} onChange = {(e) => setDescription(e.target.value)}/>
            <button> Add </button>
            {/* De ce nu e nevoie sa pun tipul submit si la button? Pt ca butoanele sunt default de tip submit. Daca am mai multe butoane trebuie sa specific. */}
        </form>
    );
}