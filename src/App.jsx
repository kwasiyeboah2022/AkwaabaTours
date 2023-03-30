import { useEffect, useState } from 'react'
import Tours from './Tours'
import Loading from './Loading'
import Footer from './Footer'

const url = 'https://course-api.com/react-tours-project'

console.log(url)

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tours, setTours] = useState([])

  //console.log(tours)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const allTours = await response.json()
      setTours(allTours)
      //console.log(allTours)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button
            type="button"
            style={{ marginTop: '2rem' }}
            className="btn"
            onClick={() => fetchTours()}
          >
            Refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <>
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
      <Footer />
    </>
  )
}
export default App
