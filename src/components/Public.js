
import { Link } from 'react-router-dom'

const Public = () => {
    const content =(
        <section className="public">
                <header>
                    <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
                </header>
            <main className="public__main">
                <p> Located in Beatiful Downtown</p>
                <address className="public__addr">
                    Dan D. Rrekdkd <br />
                    888 Church way <br/>
                    Paradise, NY <br />
                    <a href="tel:+177777777">(777)777-7777</a>
                </address>
                <br/>
                <p>owner: Dan Davidson</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content 
}

export default Public