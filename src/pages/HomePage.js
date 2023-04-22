import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import contextApi from "../context/contextapi"
import axios from "axios"
import ListItem from "../components/ListItem"

export default function HomePage() {
  const { username } = useContext(contextApi)
  const token = localStorage.getItem("token")

  const [operations, setOperations] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/operations`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(answer => {
        console.log(answer.data)
        setOperations(answer.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])



  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit />
      </Header>
      <TransactionsContainer>
        <ul>
          {operations.length === 0 ? (
            <div>Não há operações disponíveis.</div>
          ) : (
            operations.map((data, index) => {
              return <ListItem key={index} data={data} />;
            })
          )}
        </ul>
        {/* soma de todos os valores */}
        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to="/nova-transacao/+">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>

        <Link to="/nova-transacao/-">
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>

      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: calc(50vw - 32px);
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
