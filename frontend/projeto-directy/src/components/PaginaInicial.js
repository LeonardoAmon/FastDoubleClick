import React, { useState } from 'react';
import axios from 'axios';

function PaginaInicial(props) {
    const [primeiroClick, setPrimeiroClick] = useState(null);
    const [segundoClick, setSegundoClick] = useState(null);
    const [tempo, setTempo] = useState(null);

    function handleClick() {
        if (!primeiroClick) {
            setPrimeiroClick(Date.now());
        } else {
            setSegundoClick(Date.now());
            setTempo(((Date.now() - primeiroClick) / 1000).toFixed(2));
            const data = {
                tempo: ((Date.now() - primeiroClick) / 1000).toFixed(2),
                tempoTotal: tempo
            };
            axios.post('/registros', data)
                .then(() => {
                    setPrimeiroClick(null);
                    setSegundoClick(null);
                })
                .catch(err => console.error(err));
        }
    }


    return (
        <div>
            <h1>Página Inicial</h1>
            <button onClick={handleClick}>
                {segundoClick ? `Clique para começar novamente` : (primeiroClick ? 'Clique novamente para parar o cronômetro' : 'Clique aqui para começar o cronômetro')}
            </button>
            {tempo !== null &&
                <div>
                    <p>Tempo total: {tempo}s</p>
                </div>
            }
            <button onClick={() => props.redirectTo('/historico')}>
                Ir para histórico
            </button>
        </div>
    );
}

export default PaginaInicial;
