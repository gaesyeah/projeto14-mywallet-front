import dayjs from "dayjs";
import { ListItemContainer, Value } from "../../pages/HomePage";

const Transactions = ({ transaction }) => {
  const {description, value, type, timeStamp} = transaction;

  const deleteTransaction = async () => {
    if(confirm('Você realmente deseja deletar essa transação?')){

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