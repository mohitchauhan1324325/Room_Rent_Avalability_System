import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
        <Navbar />

        <main className='min-h-screen p-4'>
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default Layout;
