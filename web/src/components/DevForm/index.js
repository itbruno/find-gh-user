import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const  { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            }, {
                timeout: 30000
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithub_username('');
        setTechs('');
    }

    return(
        <form onSubmit={ handleSubmit }>
            <div className="input-block">
                <label htmlFor="github_username">Usuário de Github</label>
                <input value={github_username} onChange={ e => setGithub_username(e.target.value)} type="text" name="github_username" id="github_username" required/>
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input value={techs} onChange={ e => setTechs(e.target.value)} type="text" name="techs" id="techs" required />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input onChange={ e => setLatitude(e.target.value )} type="number" name="latitude" id="latitude" value={latitude} required/>
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input onChange={ e => setLongitude(e.target.value)} type="number" name="longitude" id="longitude" value={longitude} required/>
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;