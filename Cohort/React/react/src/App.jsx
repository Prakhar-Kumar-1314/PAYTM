import { useState } from "react";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <Button count={count} setCount={setCount}/>
    </>
  );
}

function Button({count, setCount}) {
  function onButtonClick() {
    setCount(count + 1);
  }
  return <button onClick={onButtonClick}>Counter ---- {count}</button>
}

export default App;