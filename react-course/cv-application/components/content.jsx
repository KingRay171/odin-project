import Inputs from './inputs'
import Output from './output'
import { useState } from 'react'
import '../styles/content.css'

function Content(){
    const [personalInfo, setPersonalInfo] = useState(
        {
            firstName: "",
            lastName: "",
            profession: "",
            email: "",
            phone: "",
            address: ""
        }
    )
    const [education, setEducation] = useState([{
        degree: "",
        instName: "",
        instLoc: "",
        field: "",
        from: "",
        to: ""
    }])

    const [experience, setExperience] = useState([{
        title: "",
        company: "",
        location: "",
        description: "",
        from: "",
        to: ""
    }])

    function handlePersonalInfoChange(e) {
        const key = e.target.classList[0]
        setPersonalInfo({ ...personalInfo, [key]: e.target.value });
        e.target.focus()
    }

    function handleEducationAdd(e){
        setEducation(education.concat({
        degree: "",
        instName: "",
        instLoc: "",
        field: "",
        from: "",
        to: ""
    }) )
    }

    function handleEducationChange(e) {
        const key = parseInt(e.target.parentElement.classList[1])
        const elementChanged = e.target.classList[0]
        const newEducation = education.map((edu, idx) => idx === key ? {...edu, [elementChanged]: e.target.value} : edu)
        setEducation(newEducation)
        e.target.focus()
    }

    function handleEducationDelete(e){
        const key = parseInt( e.target.parentElement.classList[1])
        setEducation(education.filter((e, idx) => idx !== key))
    }

    function handleExperienceAdd(e){
        setExperience(experience.concat({
            experience: "",
            company: "",
            location: "",
            description: "",
            from: "",
            to: ""
        }))
    }

    function handleExperienceChange(e){
        const key = parseInt(e.target.parentElement.classList[1])
        const elementChanged = e.target.classList[0]
        const newExperience = experience.map((exp, idx) => idx === key ? {...exp, [elementChanged]: e.target.value} : exp)
        setExperience(newExperience)
        
        e.target.focus()
    }

    function handleExperienceDelete(e){
        const key = parseInt( e.target.parentElement.classList[1])
        setExperience(experience.filter((e, idx) => idx !== key))
    }


    return (
        <div className="content">
        <Inputs 
        onPersonalChange={handlePersonalInfoChange} 
        personalInfoValues={personalInfo} 
        onEducationChange={handleEducationChange} 
        educationInfoValues={education} 
        onEducationAdd={handleEducationAdd}
        onEducationDelete={handleEducationDelete}
        onExperienceChange={handleExperienceChange}
        experienceInfoValues={experience}
        onExperienceAdd={handleExperienceAdd}
        onExperienceDelete={handleExperienceDelete}
        />
        <Output personalInfo={personalInfo} educationInfo={education} experienceInfo={experience}/>
        </div>
    )
}

export default Content