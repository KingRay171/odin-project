import '../styles/education.css'

function Education({onChange, values, onDeleteClick, idx}) {
    const inputs = [
        {placeholder: "Institution", className: "instName", value: values.instName, id: 1},
        {placeholder: "Institution Location", className: "instLoc", value: values.instLoc, id: 2},
        {placeholder: "Degree", className: "degree", value: values.degree, id: 3},
        {placeholder: "Field of Study", className: "field", value: values.field, id: 4},
        {placeholder: "Start Date", className: "from", value: values.from, id: 5},
        {placeholder: "End Date", className: "to", value: values.to, id: 6}
    ]
    return (
        <div className={`education ${idx}`}>
            <h2>Education #{idx + 1}</h2>
            {inputs.map(e => (
                <input placeholder={e.placeholder} value={e.value} className={e.className} onChange={onChange} key={e.id}/>
            ))}
            <button onClick={onDeleteClick}>Delete</button>
            
        </div>
    )
}

export default Education