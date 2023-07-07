import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { UserContext } from "../../context";
import { ListItemContainer, Value } from "../../pages/HomePage";

const Transactions = ({ transaction , setTransactions}) => {
  const {_id, description, value, type, timeStamp} = transaction;

  const { config } = useContext(UserContext);

  const deleteTransaction = async () => {
    if(confirm('Você realmente deseja deletar essa transação?')){
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${_id}`, config);

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config);
        setTransactions(data);
        
      } catch ({response: {status, statusText, data}}){
        alert(`${status} ${statusText}\n${data}`);
      }
    }
  };

  return (
    <ListItemContainer>
      <div>
        <span>{dayjs(timeStamp).format('DD/MM')}</span>
        <strong>{description}</strong>
      </div>
      <div>
        <Value type={type}>{value.toFixed(2).replace('.', ',')}</Value>
        <p onClick={deleteTransaction}>x</p>
      </div>
    </ListItemContainer>
  );
}

export default Transactions;