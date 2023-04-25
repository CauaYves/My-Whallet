import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import ListItem from "../components/ListItem"
import { CircleLoader } from "react-spinners"

export default function HomePage() {

  const token = localStorage.getItem("token")
  console.log(token)
  const navigate = useNavigate()
  const [operations, setOperations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [totalSum, setTotalSum] = useState("")
  const Navigate = useNavigate()

  useEffect(() => {

    haveToken()
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}/operations`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(answer => {
        console.log(answer)
        console.log(answer.data.userTransactions.sort((a,b) => a-b))
        setOperations(answer.data.userTransactions)
        setTotalSum(answer.data.result.toFixed(2))
        setIsLoading(false)
        setName(answer.data.name)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  function haveToken() {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }
  function logout() {

    localStorage.removeItem("token")
    Navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <LogoutBtn onClick={logout}>
          <BiExit />
        </LogoutBtn>
      </Header>
      <TransactionsContainer>
        <ul>
          {
            operations.length === 0 ? (<div>Não há registros de entrada ou saída.</div>) :
              isLoading ? (<SpinContainer>
                <CircleLoader color="purple" />
              </SpinContainer>) :
                (operations.map((data, index) => { return <ListItem key={index} data={data} />; }))
          }
        </ul>
        {/* soma de todos os valores */}
        <article>
          <strong>Saldo</strong>
          <Value color={ totalSum <= 0 ? "negativo" : "positivo"}>{totalSum}</Value>
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
const LogoutBtn = styled.button`
  width: 45px;
  height: 45px;
  background-color: transparent;
`
const SpinContainer = styled.div`
  width: 100%;
  height: calc(100vh - 330px);

  display: flex;
  align-items: center;
  justify-content: center;
`