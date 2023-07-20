import "../styles/personal.css"
import { v4 as uuid } from "uuid"

function Personal({onChange, values}) {
    const inputs = [
        {placeholder: "First Name", className: "firstName", value: values.firstName, id: 1},
        {placeholder: "Last Name", className: "lastName", value: values.lastName, id: 2},
        {placeholder: "Profession", className: "profession", value: values.profession, id: 3},
        {placeholder: "Phone Number", className: "phone", value: values.phone, id: 4},
        {placeholder: "Email", className: "email", value: values.email, id: 5},
        {placeholder: "Address", className: "address", value: values.address, id: 6}
    ]
    return (
        <div className="personal">
            <h2>Personal Details</h2>
            {inputs.map(e => (
                <input placeholder={e.placeholder} value={e.value} className={e.className} onChange={onChange} key={e.id}/>
            ))}
        </div>
    )
}

export default Personal