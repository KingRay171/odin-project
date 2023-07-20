import Personal from "./personal";
import Education from "./education";
import { Experience } from "./experience";
import '../styles/inputs.css'

function Inputs({onPersonalChange, personalInfoValues, onEducationChange, educationInfoValues, onEducationAdd, onEducationDelete, onExperienceChange, onExperienceAdd, onExperienceDelete, experienceInfoValues }){

    return (
        <div className="inputs">
        <Personal onChange={onPersonalChange} values={personalInfoValues} />
        {educationInfoValues.map((e, idx) => (
            <Education onChange={onEducationChange} values={e} onAdd={onEducationAdd} idx={idx} onDeleteClick={onEducationDelete}/>
        ))}
        <button onClick={onEducationAdd}>Add</button>
        {experienceInfoValues.map((e, idx) => (
            <Experience onChange={onExperienceChange} values={e} onAdd={onExperienceAdd} idx={idx} onDeleteClick={onExperienceDelete} />
        ))}
        <button onClick={onExperienceAdd}>Add</button>
        </div>
    )
}

export default Inputs