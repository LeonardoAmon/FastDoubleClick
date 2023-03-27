import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaginaHistorico() {
  const [registros, setRegistros] = useState([]);
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');
  const [ordenacaoData, setOrdenacaoData] = useState('');
  const [ordenacaoTempo, setOrdenacaoTempo] = useState('');

  useEffect(() => {
    axios.get('/registros')
      .then(res => {
        setRegistros(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleFiltrar() {
    axios.get(`/registros/data/${filtroInicio}/${filtroFim}`)
      .then(res => {
        setRegistros(res.data);
      })
      .catch(err => console.log(err));
  }

  function handleOrdenarData() {
    const ordem = ordenacaoData === 'asc' ? 'desc' : 'asc';
    axios.get(`/registros/data/${ordem}`)
      .then(res => {
        setRegistros(res.data);
        setOrdenacaoData(ordem);
      })
      .catch(err => console.log(err));
  }

  function handleOrdenarTempo() {
    const ordem = ordenacaoTempo === 'asc' ? 'desc' : 'asc';
    axios.get(`/registros/tempo/${ordem}`)
      .then(res => {
        setRegistros(res.data);
        setOrdenacaoTempo(ordem);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Histórico de registros</h1>
      <div>
        <label htmlFor="filtroInicio">Início:</label>
        <input type="date" id="filtroInicio" value={filtroInicio} onChange={(e) => setFiltroInicio(e.target.value)} />
        <label htmlFor="filtroFim">Fim:</label>
        <input type="date" id="filtroFim" value={filtroFim} onChange={(e) => setFiltroFim(e.target.value)} />
        <button onClick={handleFiltrar}>Filtrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Data e hora</th>
            <th>Tempo (em segundos)</th>
            <th>Dados</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.timestamp}>
              <td>{new Date(registro.timestamp).toLocaleString()}</td>
              <td>{registro.tempo}</td>
              <td>{registro.dados}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleOrdenarData}>{`Ordenar por data ${ordenacaoData ? `(${ordenacaoData})` : ''}`}</button>
        <button onClick={handleOrdenarTempo}>{`Ordenar por tempo ${ordenacaoTempo ? `(${ordenacaoTempo})` : ''}`}</button>
      </div>
      <a href="/">Voltar para a página principal</a>
    </div>
  );
}

export default PaginaHistorico;
