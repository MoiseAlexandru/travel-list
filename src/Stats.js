
export default function Stats({ items }) {

    if (!items.length)
        return <p className="stats"> <em> Start adding some items to your list </em> </p>;

    const numItems = items.length;

    const numPacked = items.reduce((acc, cur) => (acc + (cur.packed === true ? 1 : 0)), 0);
    // echivalent la const numPacked = items.filter((item) => item.packed === true).length;
    const percentage = Math.round(numPacked / numItems * 100);

    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? 'Ready to go!' : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}
