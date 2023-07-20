import '../styles/output.css'

function Output({personalInfo, educationInfo, experienceInfo}) {
    console.log(experienceInfo)
    return (
        <div className='output'>
            <div className='personal-output'>
                <div className='name'>
                    <h2>{personalInfo.firstName} {personalInfo.lastName}</h2>
                </div>
                <div className='other'>
                    {personalInfo.profession} | {personalInfo.phone} | {personalInfo.email} | {personalInfo.address}
                </div>
                
            </div>
            <div className='education-output'>
                <h2 className='education-title'>Education</h2>
                {educationInfo.map((e, idx) => (
                    <div className='education-content' key={idx}>
                        <div className='education-left'>
                            <h3>{e.instName}</h3>
                            <h5>{e.degree}, {e.field}</h5>
                        </div>
                        <div className='education-right'>
                            <h3>{e.instLoc}</h3>
                            <h5>{e.from} - {e.to}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <div className='experience-output'>
                <h2 className='experience-title'>Experience</h2>
                {experienceInfo.map((e, idx) => (
                    <div className='experience' key={idx}>
                        <div className='experience-content'>
                            <div className='experience-left'>
                                <h3>{e.title}</h3>
                                <h5>{e.company}</h5>
                            </div>
                            <div className='experience-right'>
                                <h3>{e.from} - {e.to}</h3>
                                <h5>{e.location}</h5>
                            </div>
                            
                        </div>
                        <div>{e.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Output