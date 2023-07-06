import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { BiExit } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Transactions from "../components/transactions/Transactions"
import { UserContext } from "../context"

export default function HomePage() {

  const { config, name } = useContext(UserContext);
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config);
        setTransactions(data);
      } catch ({response: {status, statusText, data}}){
        console.log(`${status} ${statusText}\n${data}`);
        navigate('/');
      }
    }

    fetchData();
  }, []);

  const logOut = async () => {

    localStorage.removeItem('config');
    localStorage.removeItem('name');
    navigate('/');

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/log-out`, config);      
    } catch ({response: {status, statusText, data}}){
      console.log(`${status} ${statusText}\n${data}`);
    }
  }

  const calcTotal = () => {
    let total = 0;
    transactions.forEach(({ value, type }) => {
      if (type === 'exit') value = value * -1; 
      total = total + value;
    })
    return total;
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <Exit onClick={logOut}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction => <Transactions key={transaction._id} transaction={ transaction }/>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value calcTotal={calcTotal()} >
            {calcTotal().toFixed(2).replace('.', ',')}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entry')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/exit')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const Exit = styled(BiExit)`
  cursor: pointer;
`
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
  ul{
    overflow-y: auto;
  }
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 446px;
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
    width: 50%;
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
export const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${({type, calcTotal}) => {
    if (calcTotal){
      if (calcTotal > 0) return 'green';
      return 'red';
    }
    
    if (type === 'entry') return 'green';
    return 'red';
  }};
`
export const ListItemContainer = styled.li`
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