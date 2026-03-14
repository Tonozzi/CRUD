import { useState } from 'react';

const emptyForm = {
  titulo: '',
  temporadas: '',
  dataLancamento: '',
  diretor: '',
  produtora: '',
  categoria: '',
  dataAssistiu: '',
};

function SerieForm({ onSave, editingSerie, onCancelEdit }) {
  const [formData, setFormData] = useState(editingSerie ?? emptyForm);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.titulo.trim()) {
      nextErrors.titulo = 'Informe o título da série.';
    }

    if (!formData.temporadas || Number(formData.temporadas) <= 0) {
      nextErrors.temporadas = 'Informe um número de temporadas.';
    }

    if (!formData.dataLancamento) {
      nextErrors.dataLancamento = 'Informe a data de lançamento.';
    }

    if (!formData.diretor.trim()) {
      nextErrors.diretor = 'Informe o diretor.';
    }

    if (!formData.produtora.trim()) {
      nextErrors.produtora = 'Informe a produtora.';
    }

    if (!formData.categoria.trim()) {
      nextErrors.categoria = 'Informe a categoria.';
    }

    if (!formData.dataAssistiu) {
      nextErrors.dataAssistiu = 'Informe a data em que assistiu.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setFeedback('Corrija os campos destacados antes de salvar.');
      return;
    }

    onSave(formData);
    setFeedback(
      editingSerie
        ? 'Série atualizada com sucesso.'
        : 'Série cadastrada com sucesso.'
    );
    setFormData(emptyForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{editingSerie ? 'Editar série' : 'Cadastrar série'}</h2>

      <div className="form-grid">
        <label>
          Título
          <input
            name="titulo"
            type="text"
            value={formData.titulo}
            onChange={handleChange}
            aria-invalid={Boolean(errors.titulo)}
          />
          {errors.titulo && <span className="error-text">{errors.titulo}</span>}
        </label>

        <label>
          Número de Temporadas
          <input
            name="temporadas"
            type="number"
            min="1"
            value={formData.temporadas}
            onChange={handleChange}
            aria-invalid={Boolean(errors.temporadas)}
          />
          {errors.temporadas && (
            <span className="error-text">{errors.temporadas}</span>
          )}
        </label>

        <label>
          Data de Lançamento da Temporada
          <input
            name="dataLancamento"
            type="date"
            value={formData.dataLancamento}
            onChange={handleChange}
            aria-invalid={Boolean(errors.dataLancamento)}
          />
          {errors.dataLancamento && (
            <span className="error-text">{errors.dataLancamento}</span>
          )}
        </label>

        <label>
          Diretor
          <input
            name="diretor"
            type="text"
            value={formData.diretor}
            onChange={handleChange}
            aria-invalid={Boolean(errors.diretor)}
          />
          {errors.diretor && (
            <span className="error-text">{errors.diretor}</span>
          )}
        </label>

        <label>
          Produtora
          <input
            name="produtora"
            type="text"
            value={formData.produtora}
            onChange={handleChange}
            aria-invalid={Boolean(errors.produtora)}
          />
          {errors.produtora && (
            <span className="error-text">{errors.produtora}</span>
          )}
        </label>

        <label>
          Categoria
          <input
            name="categoria"
            type="text"
            value={formData.categoria}
            onChange={handleChange}
            aria-invalid={Boolean(errors.categoria)}
          />
          {errors.categoria && (
            <span className="error-text">{errors.categoria}</span>
          )}
        </label>

        <label>
          Data em que assistiu
          <input
            name="dataAssistiu"
            type="date"
            value={formData.dataAssistiu}
            onChange={handleChange}
            aria-invalid={Boolean(errors.dataAssistiu)}
          />
          {errors.dataAssistiu && (
            <span className="error-text">{errors.dataAssistiu}</span>
          )}
        </label>
      </div>

      {feedback && <p className="feedback-text">{feedback}</p>}

      <div className="form-actions">
        <button type="submit">{editingSerie ? 'Atualizar' : 'Cadastrar'}</button>
        {editingSerie && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}

export default SerieForm;
