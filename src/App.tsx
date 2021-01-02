import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIds, getItems } from "./selectors";
import { addItem, deleteItem } from "./slices";
import { validate } from "./utils";

const App: React.FC = () => {
  const [newItem, setNewItem] = useState("");
  const [errors, setErrors] = useState<string | undefined>("");
  const [history, setHistory] = useState<string | undefined>("");

  const ids = useSelector(getIds);
  const items = useSelector(getItems);

  const allItems = ids.map((id) => items[id]);

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));

    setHistory(`${items[id].description} deleted`);
  };

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      id: Date.now(),
      description: newItem,
    };

    if (newItem && /^[A-Z0-9]/i.test(newItem)) {
      dispatch(addItem(payload));

      setHistory(`${payload.description} added`);
    }

    setErrors(() => validate(newItem));

    setNewItem("");

    inputRef.current.focus();
  };

  return (
    <>
      <h1 tabIndex={-1}>An Accessible Todo List in Typescript</h1>
      <section aria-labelledby="todos-label">
        <h2 id="todos-label">My Todo List</h2>
        <ul>
          {allItems.map((item) => (
            <li key={item.id}>
              <label htmlFor={`todo-${item.id}`}>
                <input type="checkbox" className="vh" id={`todo-${item.id}`} />

                <span className="tick">
                  <svg
                    id="tick"
                    height="1.5rem"
                    width="1.5rem"
                    viewBox="0 0 10 10"
                    focusable="false"
                  >
                    <polyline
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      points="1,5 4,8 9,2"
                    ></polyline>
                  </svg>
                </span>

                <span className="text">{item.description}</span>
              </label>

              <button
                type="button"
                aria-label={`delete ${item.description}`}
                onClick={() => handleDelete(item.id)}
              >
                <svg
                  height="1.5rem"
                  width="1.5rem"
                  viewBox="0 0 50 50"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="m20.651 2.3339c-.73869 0-1.3312.59326-1.3312 1.3296v2.5177h-6.3634c-.73887 0-1.3314.59331-1.3314 1.3295v1.1888c0 .73639.59249 1.3289 1.3312 1.3289h7.6948 8.8798 7.6948c.73869 0 1.3312-.59249 1.3312-1.3289v-1.1888c0-.73639-.59249-1.3296-1.3312-1.3296h-6.3634v-2.5177c0-.73639-.59249-1.3296-1.3312-1.3296h-8.8798zm-5.6786 11.897c-1.7775 0-3.2704 1.4889-3.2704 3.274v27.647c0 1.7775 1.4928 3.2704 3.2704 3.2704h20.783c1.7775 0 3.2704-1.4928 3.2704-3.2704v-27.647c0-1.7852-1.4928-3.274-3.2704-3.274h-20.783zm1.839 3.4895h1.1696c.73869 0 1.3389.60018 1.3389 1.3466v24.247c0 .74638-.60018 1.3389-1.3389 1.3389h-1.1696c-.73869 0-1.3389-.59249-1.3389-1.3389v-24.247c0-.74638.60018-1.3466 1.3389-1.3466zm7.6948 0h1.1696c.73869 0 1.3389.60018 1.3389 1.3466v24.247c0 .74638-.60018 1.3389-1.3389 1.3389h-1.1696c-.73869 0-1.3389-.59249-1.3389-1.3389v-24.247c0-.74638.60018-1.3466 1.3389-1.3466zm7.6948 0h1.1696c.73869 0 1.3389.60018 1.3389 1.3466v24.247c0 .74638-.60018 1.3389-1.3389 1.3389h-1.1696c-.73869 0-1.3389-.59249-1.3389-1.3389v-24.247c0-.74638.60018-1.3466 1.3389-1.3466z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="empty-state">
          <p>
            Either you've done everything or there are still things to add to
            your list. <br />
            <strong>
              Add your todo <span aria-hidden="true">↓</span>
            </strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="add" className="vh">
            Write a new todo item
          </label>
          <div className="input-field">
            <input
              type="text"
              id="add"
              placeholder="E.g. Buy Gas"
              ref={inputRef}
              value={newItem}
              onChange={handleChange}
              //onBlur={() => setErrors(() => validate(newItem))} //If you choose validation on blur
              aria-invalid={!newItem || !/^[A-Z0-9]/i.test(newItem)}
            />
            <span className="errors" role="status" aria-live="polite">
              {errors}
            </span>
          </div>
          <button type="submit">Add</button>
        </form>
        <div role="status" aria-live="polite" className="vh">
          {history}
        </div>
      </section>
    </>
  );
};

export default App;
