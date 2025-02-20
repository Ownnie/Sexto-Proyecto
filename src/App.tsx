import styles from './App.module.css'
import Form from './components/Form/Form'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import useWeather from './hooks/useWeather'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import Alert from './components/Alert/Alert'

function App() {

  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Climas</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather} />
        {loading && <LoadingSpinner />}
        {hasWeatherData &&
          <WeatherDetails
            weather={weather} />
        }
        {notFound && <Alert>Ciudad Ingresada no Encontrada</Alert>}
      </div>
    </>
  )
}

export default App
