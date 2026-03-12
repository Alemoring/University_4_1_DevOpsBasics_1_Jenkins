import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [role, setRole] = useState("Роль")
  const [location, setLocation] = useState("Локация")
  const [friend, setFriend] = useState("Встречный")
  const [action, setAction] = useState("Действие")
  const [storyHint, setStoryHint] = useState("")

  // Состояния для отслеживания открытия/скрытия информации
  const [isRoleVisible, setIsRoleVisible] = useState(false)
  const [isLocationVisible, setIsLocationVisible] = useState(false)
  const [isFriendVisible, setIsFriendVisible] = useState(false)
  const [isActionVisible, setIsActionVisible] = useState(false)

  async function getRole() {
    const response = await axios.get("http://localhost:8000/get/role/");
    return response.data.role;
  }

  async function getLocation() {
    const response = await axios.get("http://localhost:8000/get/location/");
    return response.data.location;
  }

  async function getFriend() {
    const response = await axios.get("http://localhost:8000/get/friend/");
    return response.data.friend;
  }

  async function getAction() {
    const response = await axios.get("http://localhost:8000/get/action/");
    return response.data.action;
  }

  async function generateStory() {
    const response = await axios.get("http://localhost:8000/get/story/");
    const data = response.data;

    setRole(data.role);
    setLocation(data.location);
    setFriend(data.friend);
    setAction(data.action);
    setStoryHint(data.story);
  }

  async function loadData() {
    try {
      const [newRole, newLocation, newFriend, newAction] = await Promise.all([
        getRole(),
        getLocation(),
        getFriend(),
        getAction()
      ]);

      // Сохраняем данные в состоянии, но не показываем
      setRole(newRole);
      setLocation(newLocation);
      setFriend(newFriend);
      setAction(newAction);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  function updateHistory() {
    // Сбрасываем счетчик и скрываем все карточки
    setCount(0);
    setIsRoleVisible(false);
    setIsLocationVisible(false);
    setIsFriendVisible(false);
    setIsActionVisible(false);

    // Загружаем новые данные
    loadData();

    // Сбрасываем текст на заглушки
    setRole("Роль");
    setLocation("Локация");
    setFriend("Встречный");
    setAction("Действие");
  }

  async function show_next() {
    // Загружаем новые данные при первом нажатии
    if (count === 0) {
      await loadData();
    }

    // Показываем следующую карточку по порядку
    switch (count) {
      case 0:
        setIsRoleVisible(true);
        break;
      case 1:
        setIsLocationVisible(true);
        break;
      case 2:
        setIsFriendVisible(true);
        break;
      case 3:
        setIsActionVisible(true);
        break;
      default:
        break;
    }

    setCount(prevCount => prevCount + 1);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col align-self-center border border-black">
            {/* Показываем роль только если она видима */}
            {isRoleVisible ? role : "Роль"}
          </div>
        </div>
        <div className="row">
          <div className="col border border-black">
            {/* Показываем локацию только если она видима */}
            {isLocationVisible ? location : "Локация"}
          </div>
          <div className="col border border-black">
            {/* Показываем встречного только если он видим */}
            {isFriendVisible ? friend : "Встречный"}
          </div>
          <div className="col border border-black">
            {/* Показываем действие только если оно видимо */}
            {isActionVisible ? action : "Действие"}
          </div>
        </div>
        <div className="row">
          <div className="col border border-black">
            <button
              className="btn btn-primary"
              onClick={() => show_next()}
              disabled={count >= 4} // Отключаем кнопку после открытия всех карточек
            >
              Открыть следующую карточку ({count}/4)
            </button>
          </div>
          <div className="col border border-black">
            <button className="btn btn-primary" onClick={() => updateHistory()}>
              Пересобрать историю
            </button>
          </div>
          <div className="col border border-black">
            <button className="btn btn-success" onClick={() => generateStory()}>
              Сгенерировать основу истории
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col border border-black">
            {storyHint}
          </div>
        </div>
      </div>
    </>
  )
}

export default App