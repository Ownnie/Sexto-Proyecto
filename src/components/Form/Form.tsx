import { ChangeEvent, FormEvent, useState } from 'react';
import { countries } from '../../data/countries.ts';
import type { Searchtype } from '../../types/index.ts';
import styles from './Form.module.css';
import Alert from '../Alert/Alert.tsx';

type FormProps = {
    fetchWeather: (search: Searchtype) => Promise<void>
}

export default function Form({ fetchWeather }: FormProps) {

    const [search, setSearch] = useState<Searchtype>({
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios');
        }
        fetchWeather(search);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}>

            {alert && <Alert>{alert}</Alert>}

            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Pais:</label>
                <select
                    id='country'
                    name='country'
                    value={search.country}
                    onChange={handleChange}
                >
                    <option>--- Seleccione un Pais ---</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type="submit"
                value="Consultar Clima"
                className={styles.submit} />
        </form>
    )
}
