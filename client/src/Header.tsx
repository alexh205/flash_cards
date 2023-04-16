import './Header.css'

const Header = () => {
    return (
        <div className="Header">
            <div className='container'>
                <div>
                    <a href='/'>FlashCardStorage</a></div>
                <div>
                    <a href='/'>Decks</a></div>
                <div>
                    <a href='/login'>Login</a></div></div>
        </div>
    )
}

export default Header
