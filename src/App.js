import { useState } from "react";

function Logo() {
    return (
        <h1>
            Pack up 😄
        </h1>
    );
}

function Form({onAddItems}) {

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


function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {

    const [sortBy, setSortBy] = useState('input');

    let sortedItems;

    if(sortBy === 'input')
        sortedItems = items;

    if(sortBy === 'description')
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if(sortBy === 'packed')
        sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className = "list">
            <ul>
                {sortedItems.map((item) => (
                    <Item item = {item} onDeleteItem = {onDeleteItem} onToggleItem = {onToggleItem} key = {item.id} />
                ))}
            </ul>
            <div className = "actions">
                <select value = {sortBy} onChange = {e => setSortBy(e.target.value)}>
                    <option value = 'input'> Sort by input order </option>
                    <option value = 'description'> Sort by description </option>
                    <option value = 'packed'> Sort by packed status </option>
                </select>
                <button onClick = {onClearList}> Clear list </button>
            </div>
        </div>
    );
}


function Item({item, onDeleteItem, onToggleItem}) {
    return (
        <li>
            <input type = "checkbox" value = {item.packed} onChange = {() => onToggleItem(item.id)} />
            <span style = {item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick = {() => onDeleteItem(item.id)}>❌</button>
        </li>
    )
}

function Stats({items}) {

    if(!items.length)
        return <p className = "stats"> <em> Start adding some items to your list </em> </p>

    const numItems = items.length;

    const numPacked = items.reduce((acc, cur) => (acc + (cur.packed === true ? 1 : 0)), 0);
    // echivalent la const numPacked = items.filter((item) => item.packed === true).length;

    const percentage = Math.round(numPacked / numItems * 100);

    return (
        <footer className = "stats">
            <em>
                {percentage === 100 ? 'Ready to go!' : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`} 
            </em>
        </footer>
    );  
}

function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) => items.map((item) => (item.id !== id ? item : {...item, packed: !item.packed})));
    }
    
    function handleClearList()
    {
        const confirmed = window.confirm('Are you sure you want to delete all items?');
        if(confirmed)
            setItems([]);
    }

    return (
        <div className = "app">
            <Logo />
            <Form onAddItems = {handleAddItems} />
            <PackingList items = {items} onDeleteItem = {handleDeleteItem} onToggleItem = {handleToggleItem} onClearList = {handleClearList}/>
            <Stats items = {items}/>
        </div>
    );
}

export default App;
