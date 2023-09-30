import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false }
];

function Logo() {
    return (
        <h1>
            Pack up 😄
        </h1>
    );
}

function Form() {

    const [description, setDescription] = useState("test");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        /* e = eveniment, e.preventDefault() pentru a opri reload-ul automat la pagina cand se apasa submit */
        e.preventDefault();

        if(!description)
            return;
        const newItem = {description, quantity, packed: false, id: Date.now()};
        console.log(newItem);

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

function Item({item}) {
    return (
        <li>
            <span style = {item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    )
}

function PackingList() {
    return (
        <div className = "list">
            <ul>
                {initialItems.map((item) => (
                    <Item item = {item} key = {item.id} />
                ))}
            </ul>
        </div>
    );
}

function Stats() {
    return (
        <footer className = "stats">
            <em> 💼 You have X items on your list, and you already packed X (X%) 💼 </em>
        </footer>
    );  
}

function App() {
  return (
    <div className = "app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
    </div>
  );
}

export default App;
