import styled from "styled-components"
import contextApi from "../context/contextapi"
import { useContext, useState } from "react"
import axios from "axios"
import { RotateLoader } from "react-spinners"
import { useParams } from "react-router-dom"

export default function TransactionsPage() {
  const { tipo } = useParams()
  const { sendValue, setSendValue } = useContext(contextApi)
  const [valueAdd, setValueAdd] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)


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
        console.log(answer)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
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
