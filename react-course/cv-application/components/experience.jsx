import '../styles/experience.css'

export function Experience({onChange, values, onDeleteClick, idx}){
    
    const inputs = [
        {placeholder: "Title", className: "title", value: values.title, id: 1},
        {placeholder: "Company", className: "company", value: values.company, id: 2},
        {placeholder: "Location", className: "location", value: values.location, id: 3},
        {placeholder: "Description", className: "description", value: values.description, id: 4},
        {placeholder: "Start Date", className: "from", value: values.from, id: 5},
        {placeholder: "End Date", className: "to", value: values.to, id: 6}
    ]
    return (
        <div className={`experience ${idx}`}>
            <h2>Experience #{idx + 1}</h2>
            {inputs.map(e => (
                <input placeholder={e.placeholder} value={e.value} className={e.className} onChange={onChange} key={e.id}/>
            ))}
            <button onClick={onDeleteClick}>Delete</button>
            
        </div>
    )
}