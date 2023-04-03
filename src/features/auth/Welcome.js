import { Link } from 'react-router-dom'


const Welcome = () => {

    const data = new Date()
    const today = new Intl.DateTimeFormat('en-US', {dataStyle: 'full', 
    timeStyle: 'long'}).format(date)

    const content = (
        <section className = "welcome">
            <p>{today}</p>
            <h1>Welcome</h1>
            <p><link to="/dash/notes">View techNotes</link></p>
            <p><link to="/dash/users">View User Setting</link></p>
        </section>
    )

    return content
}

export default Welcome