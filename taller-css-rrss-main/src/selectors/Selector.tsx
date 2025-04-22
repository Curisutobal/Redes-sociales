import "./Selector.css";

export const Selector = () => {
  return (
    <div className="container">
      <div className="box-group">
        <div>1</div>
        <div className="box">2</div>
        <div>3</div>
      </div>
      <div className="box-group">
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
      <div className="box-group">
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </div>
  );
};

export const SelectorAdvanced = () => {
  return (
    <div className="selector-advanced">
      <h2 id="advanced-title">🎯 Zona de práctica avanzada</h2>

      <ul className="animal-list">
        <li className="animal" data-type="mammal">
          🦊 Zorro
        </li>
        <li className="animal special" data-type="bird">
          🦉 Búho
        </li>
        <li className="animal" data-type="reptile">
          🦎 Lagarto
        </li>
      </ul>

      <form
        className="adoption-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          Nombre: 
          <input type="text" name="name" placeholder="Ingresa tu nombre" />
        </label>
        <label>
          Tipo de animal:
          <select name="type">
            <option value="mammal">Mamífero</option>
            <option value="bird">Ave</option>
            <option value="reptile">Reptil</option>
          </select>
        </label>
        <label>
          <input type="checkbox" name="terms" /> Acepto los términos
        </label>
        <button type="submit">Adoptar</button>
      </form>

      <div className="cards">
        <div className="card first">
          <p>🃏 Carta 1</p>
        </div>
        <div className="card second">
          <p>🃏 Carta 2</p>
        </div>
        <div className="card third">
          <p>🃏 Carta 3</p>
        </div>
      </div>

      <footer>
        <p className="footer-text">© Selector Challenge</p>
      </footer>
    </div>
  );
};
