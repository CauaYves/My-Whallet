import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { RotateLoader } from "react-spinners"
import { useNavigate, useParams } from "react-router-dom"

export default function TransactionsPage() {
  const { tipo } = useParams()
  const [valueAdd, setValueAdd] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    haveToken()
  }, [])


  function haveToken() {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }

  function increaseCash(e) {
    e.preventDefault()
    setIsLoading(true)
    const token = localStorage.getItem("token")

    //deve enviar o token de autorização
    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`,
      { type: tipo, value: Number(valueAdd), description: description },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(answer => {
        setIsLoading(false)
      })
      .catch(error => {
        alert(error)
        setIsLoading(false)
      })
    navigate("/home")
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={increaseCash}>
        <input
          placeholder="Valor"
          type="text"
          value={valueAdd}
          onChange={(e) => setValueAdd(e.target.value)}
          required
        />

        <input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">
          {isLoading ?
            <RotateLoader color="white" />
            :
            "salva transação"
          }
        </button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
