function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`));
}

function SerieList({ series, onEdit, onDelete }) {
  if (series.length === 0) {
    return <p>Nenhuma série encontrada.</p>;
  }

  return (
    <ul className="serie-list">
      {series.map((serie) => (
        <li key={serie.id} className="serie-card">
          <p>
            <strong>Título:</strong> {serie.titulo}
          </p>
          <p>
            <strong>Número de temporadas:</strong> {serie.temporadas}
          </p>
          <p>
            <strong>Data de lançamento:</strong>{' '}
            {formatDate(serie.dataLancamento)}
          </p>
          <p>
            <strong>Diretor:</strong> {serie.diretor}
          </p>
          <p>
            <strong>Produtora:</strong> {serie.produtora}
          </p>
          <p>
            <strong>Categoria:</strong> {serie.categoria}
          </p>
          <p>
            <strong>Data em que assistiu:</strong>{' '}
            {formatDate(serie.dataAssistiu)}
          </p>

          <div className="card-actions">
            <button type="button" onClick={() => onEdit(serie)}>
              Editar
            </button>
            <button type="button" onClick={() => onDelete(serie.id)}>
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SerieList;
